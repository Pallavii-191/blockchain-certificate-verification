const express = require("express");
const Web3 = require("web3");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const web3 = new Web3("http://127.0.0.1:7545");

let contractABI = [];
let contractAddress = "";

try {
  const contractData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "build/contracts/CertificateRegistry.json"))
  );
  contractABI = contractData.abi;
  const networkId = Object.keys(contractData.networks)[0];
  if (networkId) {
    contractAddress = contractData.networks[networkId].address;
    console.log("Connected to Contract Address:", contractAddress);
  } else {
    console.log("Contract not deployed. Run 'npx truffle migrate --reset'");
  }
} catch (e) {
  console.log("Run 'npx truffle compile' and 'npx truffle migrate' to build files.");
}

let certContract;
if (contractAddress) {
  certContract = new web3.eth.Contract(contractABI, contractAddress);
}

// 1. HOME ROUTE: Handles initial page load & GET verification query
app.get("/", async (req, res) => {
  const studentAddress = req.query.studentAddress;

  // If user searched for an address via GET form:
  if (studentAddress) {
    try {
      if (!certContract) throw new Error("Contract not connected. Migrate contracts first.");

      const cert = await certContract.methods.verifyCertificate(studentAddress).call();

      // Check if student name exists (valid certificate)
      if (!cert.studentName || cert.studentName === "") {
        return res.render("index", { 
          certificate: null, 
          studentAddress, 
          error: "No certificate found for this address on the blockchain.", 
          message: null 
        });
      }

      const timestamp = cert.issueDate || cert.timestamp || Math.floor(Date.now() / 1000);

      return res.render("index", {
        certificate: {
          studentName: cert.studentName,
          courseName: cert.courseName,
          grade: cert.grade,
          studentAddress: studentAddress,
          timestamp: timestamp
        },
        studentAddress,
        error: null,
        message: null
      });
    } catch (err) {
      return res.render("index", {
        certificate: null,
        studentAddress,
        error: "Invalid Certificate Address or Record Not Found on Blockchain.",
        message: null
      });
    }
  }

  // Initial clean load
  res.render("index", { certificate: null, studentAddress: "", error: null, message: null });
});

// 2. ISSUE ROUTE: Handles certificate issuance from Admin tab
app.post("/issue", async (req, res) => {
  const { studentAddress, studentName, courseName, grade } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    await certContract.methods
      .issueCertificate(studentAddress, studentName, courseName, grade)
      .send({ from: accounts[0], gas: 3000000 });

    res.render("index", { 
      certificate: null, 
      studentAddress: "", 
      error: null, 
      message: `Certificate issued successfully for ${studentName}!` 
    });
  } catch (err) {
    res.render("index", { 
      certificate: null, 
      studentAddress: "", 
      error: "Issuance failed: " + err.message, 
      message: null 
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
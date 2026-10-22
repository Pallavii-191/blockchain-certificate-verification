# Blockchain-Based Certificate Verification System

An immutable, decentralized web application built on Ethereum to issue and verify academic credentials for Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon.

---

## 📌 Project Overview

Academic degree forgery poses a major risk to educational institutions and employers. This project eliminates credential fraud by storing digital certificate data directly on an Ethereum smart contract.

- **Issuance (Admin Portal):** Authorized college authorities store student certificate records on the blockchain.
- **Instant Verification (Public Portal):** Employers or third parties instantly verify certificate authenticity using the student's Ethereum wallet address without manual institutional intervention.

---

## 🛠️ Technology Stack

- **Smart Contracts:** Solidity (`^0.8.20`, `paris` EVM target)
- **Local Blockchain:** Ganache GUI / CLI (Port `7545`, Network ID `5777`)
- **Development Framework:** Truffle (`v5.11.5`)
- **Backend Application:** Node.js, Express.js, Web3.js
- **Frontend Interface:** EJS, Custom SSGMCE Theme (HTML5, CSS3, JavaScript)

---

## 📂 Project Structure

```text
Certify-Custom/
├── build/
│   └── contracts/
│       └── CertificateRegistry.json   # Contract ABI & deployment info
├── contracts/
│   └── CertificateRegistry.sol        # Solidity smart contract
├── migrations/
│   └── 2_deploy_contracts.js          # Deployment script
├── views/
│   └── index.ejs                      # SSGMCE-branded frontend portal
├── app.js                             # Express server & Web3 integration
├── truffle-config.js                  # Truffle compiler & network settings
└── README.md                          # Project documentation
```

💻 Step-by-Step Instructions to Run the Project in VS CodeStep

1: PrerequisitesEnsure you have installed:
VS Code
Node.js (v18 or higher)
Ganache GUI Desktop App

Step 2: Launch & Configure Local Blockchain (Ganache)
Open the Ganache desktop application.
Click Quickstart (Ethereum).
Verify the RPC SERVER header shows HTTP://127.0.0.1:7545.
Note: If it shows port 8545, click Settings ⚙️ (top right) $\rightarrow$ Server tab $\rightarrow$ change Port Number to 7545 $\rightarrow$ click Save and Restart.Keep Ganache running in the background.

Step 3: Open the Project in VS CodeOpen VS Code.Go to File $\rightarrow$ Open Folder... (or press Ctrl + K, Ctrl + O).
Select and open the Certify-Custom directory (C:\Users\Pallavi\Downloads\Certify_M\Certify-Custom).

Step 4: Open Integrated Terminal in VS CodeIn VS Code, open the integrated terminal by pressing Ctrl + ~ (or go to Terminal $\rightarrow$ New Terminal from the top menu).
Ensure your terminal prompt points to Certify-Custom:PowerShellcd C:\Users\Pallavi\Downloads\Certify_M\Certify-Custom

Step 5: Install DependenciesIf running for the first time, install required Node.js modules:PowerShellnpm install

Step 6: Deploy Smart Contract to BlockchainIn the VS Code terminal, compile and migrate the Solidity smart contract to Ganache:PowerShellnpx truffle migrate --reset

Wait until Truffle confirms migration and outputs the deployed contract address.
Step 7: Start the Application ServerTo prevent port 3000 conflicts from previous runs, stop background Node processes and start app.js:PowerShellStop-Process -Name "node" -Force -ErrorAction SilentlyContinue
node app.js
You should see terminal output:PlaintextConnected to Contract Address: 0x...
Server running on http://localhost:3000
Step 8: Test the Application in BrowserOpen http://localhost:3000 in Google Chrome or any browser.
Issue a Certificate (Admin Tab):Click Issue Certificate (Admin).
Copy an account address from your running Ganache GUI (Accounts tab).
Enter Student Name, Course, and Grade, then click Write to Blockchain.
Verify a Certificate (Verification Tab):Click Verify Certificate.
Paste the student's wallet address into the input field.
Click Verify On Blockchain to fetch and display the official academic certificate directly from the Ethereum ledger.
👥 Academic Project Team
Shri Sant Gajanan Maharaj College of Engineering, ShegaonDepartment of Computer Science & Engineering |
Academic Year: 2026–2027
Project Guide: Prof. Kandoi
Team Members:Gayatri PathakPallavi PawarShrutika RodeVaishnavi Patil
'@ | Set-Content -Path "README.md" -Encoding utf8
After running this command, view your new file in VS Code by typing:

```powershell
code README.md
```

cd Certify-custom
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
npx truffle migrate --reset
node app.js

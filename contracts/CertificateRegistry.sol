// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    address public owner;

    struct Certificate {
        string studentName;
        string courseName;
        string grade;
        uint256 issueDate;
        bool isValid;
    }

    mapping(address => Certificate) public certificates;
    mapping(address => bool) public authorizedInstitutes;

    event CertificateIssued(address indexed student, string studentName, string courseName);
    event InstituteAdded(address indexed institute);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedInstitutes[msg.sender] || msg.sender == owner, "Not authorized to issue certificates");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedInstitutes[msg.sender] = true;
    }

    function addInstitute(address _institute) public onlyOwner {
        authorizedInstitutes[_institute] = true;
        emit InstituteAdded(_institute);
    }

    function issueCertificate(
        address _student,
        string memory _studentName,
        string memory _courseName,
        string memory _grade
    ) public onlyAuthorized {
        certificates[_student] = Certificate({
            studentName: _studentName,
            courseName: _courseName,
            grade: _grade,
            issueDate: block.timestamp,
            isValid: true
        });

        emit CertificateIssued(_student, _studentName, _courseName);
    }

    function verifyCertificate(address _student)
        public
        view
        returns (
            string memory studentName,
            string memory courseName,
            string memory grade,
            uint256 issueDate,
            bool isValid
        )
    {
        Certificate memory cert = certificates[_student];
        require(cert.isValid, "Certificate not found or revoked");
        return (cert.studentName, cert.courseName, cert.grade, cert.issueDate, cert.isValid);
    }
}

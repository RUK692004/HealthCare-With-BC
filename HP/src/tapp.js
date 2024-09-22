// Ensure to include web3.js in your HTML or install it via npm
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545'); // Adjust URL for your local blockchain

let contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Update this after deploying your contract
let contractABI = []; // Update this with your contract's ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const name = document.getElementById('name').value;
    const medicalHistory = document.getElementById('medicalHistory').value;
    const sugar = document.getElementById('sugar').value;
    const cholesterol = document.getElementById('cholesterol').value;
    const bloodPressure = document.getElementById('bloodPressure').value;

    try {
        await contract.methods.registerUser(name, medicalHistory, sugar, cholesterol, bloodPressure).send({ from: accounts[0] });
        document.getElementById('feedback').innerText = 'User registered successfully!';
        document.getElementById('feedback').style.color = 'green';
    } catch (error) {
        document.getElementById('feedback').innerText = 'Error registering user. Please try again.';
        document.getElementById('feedback').style.color = 'red';
    }
});


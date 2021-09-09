/*
The `TimeLogContract` is based on MetaMask E2E Test Dapp tutorial
https://github.com/BboyAkers/simple-dapp-tutorial  
compiled from:
  project folder (C:\TFM\solidity
    include 
    *  TimeLogContract.sol
    *  ContractAccountAddress.txt
    *  ABI.txt
*/

// * ES6 module: `import MetamaskOnboarding from '@metamask/onboarding'`
// * ES5 module: `const MetamaskOnboarding = require('@metamask/onboarding')`
// import MetaMaskOnboarding from '@metamask/onboarding'

/*
*********************************
     Const variables definition
*********************************
*/
// Address for web server (nodejs) that contains all packages 
const forwarderOrigin = 'http://localhost:9010';

//Instance of the file to connect Metamask
const onboarding = new MetamaskOnboarding({ forwarderOrigin });

// Basic Actions Section
const onboardButton = document.getElementById('connectButton');

//show account connected
//const accountsDiv = document.getElementById('accounts')

// Store Attendance Report Section
const company_cif_write = document.getElementById('company_cif_write');
const date_write = document.getElementById('date_write');
const addReportButton = document.getElementById('addReport');

// Read Attendance Section
const company_cif_read = document.getElementById('company_cif_read');
const date_read = document.getElementById('date_read');
const getReportButton = document.getElementById('get_log');

// Smart contract where is deployed TIMELOG contract
const ContractAccountAddress = '0x3Bb37250390a96f6dc99fEDD6386359C03CFABA4';

/*
*********************************
     Smart contract binary interface ABI
*********************************
*/
const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_company",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "year",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "month",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "day",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_log",
                "type": "string"
            }
        ],
        "name": "append_log",
        "outputs": [
            {
                "internalType": "bool",
                "name": "OK",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_company",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "year",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "month",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "get_log",
        "outputs": [
            {
                "internalType": "string",
                "name": "_log",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


/*
*********************************
     Connect to MetaMask
*********************************
*/

const initialize = () => {
    //You will start here

    //Check if the brower has the Metamask extension installed  
    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    // Show ether account in case of Metamask is connected
    let accounts
    const isMetaMaskConnected = () => accounts && accounts.length > 0

    //Start the onboarding proccess, new windows to MetaMask installation page
    const onClickInstall = () => {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
    };

    //Will open small windows: the MetaMask UI
    //You should disable this button while the request is pending!
    //Show new MetaMask windows to select account to be connected
    const onClickConnect = async () => {
        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            //onboardButton.disabled = true;            
            handleNewAccounts(newAccounts)
        } catch (error) {
            console.error(error)
        }
    }

    //Check if MetaMask is installed  
    const MetamaskClientCheck = async () => {
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to click to install it
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick = onClickInstall;
            onboardButton.disabled = false;
        } else if (isMetaMaskConnected()) {
            //If it is installed we change our button text
            onboardButton.innerText = 'Connected'
            //When the button is clicked we call this function to connect the users MetaMask Wallet
            onboardButton.disabled = true
            if (onboarding) {
                onboarding.stopOnboarding()
            }
        } else {
            onboardButton.innerText = 'Connect'
            onboardButton.onclick = onClickConnect
            onboardButton.disabled = false
        }
    };

    MetamaskClientCheck();

    function handleNewAccounts(newAccounts) {
        accounts = newAccounts
        accountsDiv.innerHTML = accounts
        if (isMetaMaskConnected()) {
            initializeAccountButtons()
        }
        updateButtons()
    }

};


/*
*********************************
     Document Object Model (DOM)
*********************************
*/
// Load HTML page 
// convert the structure and content of the HTML document into an object model that can be used by various programs.
window.addEventListener('DOMContentLoaded', initialize);

//The provider and the "signer" are instantiated to be able to work with the contract
//window.ethereum refers to the Metamask wallet which is a browser extension
const provider = new ethers.providers.Web3Provider(window.ethereum);

// The signer is obtained to be able to do state alteration methods (or transfers)
const signer = provider.getSigner();

// An object of the contract is instantiated and signed with signer
const myContract = new ethers.Contract(ContractAccountAddress, ABI, provider);
const myContractWithSignature = myContract.connect(signer);

/*
*********************************
     Define IPFS server and metadata
*********************************
*/
// User file metadata information
var fileData = '';

//On click element in file explorer, process file
const fileSelector = document.getElementById('daily_log_file');
fileSelector.addEventListener('change', (evento) => {
    fileData = evento.target.files[0];
    console.log(fileData);
});

//Instanciated IPFS external node, named Infura
//check IpfsHttpClient library is defined on html scripts section
//check IpfsHttpClient was previously imported in html file
const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001 })

/*
*********************************
     Save Daily log report on IPFS
*********************************
*/
addReportButton.onclick = async () => {
    try {
        let company = company_cif_write.value;
        console.log(company);
        let date_write = date_write.value;
        console.log(date_write);
        //Insert daily report file on IPFS
        let result = await ipfs.add(fileData);
        //Get the hash for uploaded file into blockchain
        let _url = "http://ipfs.io/ipfs/" + result.cid.string;
        console.log(_url);
        //Upload the event to Ethereum
        console.log(await myContractWithSignature.addnewevent(company, date_write, _url));
    } catch (error) {
        console.error(error);
    }
}

/*
*********************************
     Get Daily log registry
*********************************
*/
getReportButton.onclick = async () => {
    try {
        let company = company_cif_read.value;
        let date_read = date_read.value;
        let result = await myContract.append_log(company, date_read);
        //Se muestran en una pequeña tabla con su respectivo hipervículo a la dirección en IPFS donde se encuentren alojados
        //En JS se puede "inyectar" código HTML en cualquier elemento teniendo únicamente su id
        document.getElementById("contenedor").innerHTML = '<table>'
            + '<tr><td> Primer archivo: </td><td><a href="' + result[1] + '">' + result[0] + '</a>'
            + '</table>';
    } catch (error) {
        console.error(error);
    }
}


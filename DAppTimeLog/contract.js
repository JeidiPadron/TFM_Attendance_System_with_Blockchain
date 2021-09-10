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
const accountsDiv = document.getElementById('accounts')

// Store Attendance Report Section
const company_cif_write = document.getElementById('company_cif_write');
const date_write = document.getElementById('date_write');
const appendLogButton = document.getElementById('append_log');
const urlDiv = document.getElementById('url_result');
url_result

// Read Attendance Section
const company_cif_read = document.getElementById('company_cif_read');
const date_read = document.getElementById('date_read');
const getLogButton = document.getElementById('get_log');

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

    const accountButtons = [
        appendLogButton,
        getLogButton,
    ]

    // Show ether account in case of Metamask is connected
    let accounts
    let accountButtonsInitialized = false
    const isMetaMaskConnected = () => accounts && accounts.length > 0


    const onClickInstall = () => {
        //Start the onboarding proccess, new windows to MetaMask installation page
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
    };


    const onClickConnect = async () => {
        //Will open small windows: the MetaMask UI
        //You should disable this button while the request is pending!
        //Show new MetaMask windows to select account to be connected    
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

    const updateButtons = () => {
        const accountButtonsDisabled = !isMetaMaskInstalled() || !isMetaMaskConnected()
        if (accountButtonsDisabled) {
            for (const button of accountButtons) {
                button.disabled = true
            }
        } else {
            appendLogButton.disabled = false
            getLogButton.disabled = false
        }



    }

    const initializeAccountButtons = () => {
        if (accountButtonsInitialized) {
            return
        }
        accountButtonsInitialized = true

    }

    function handleNewAccounts(newAccounts) {
        accounts = newAccounts
        accountsDiv.innerHTML = accounts
        if (isMetaMaskConnected()) {
            initializeAccountButtons()
        }
        updateButtons()
    }

    const MetamaskClientCheck = async () => {
        //Check if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to click to install it
            onboardButton.innerText = 'Click here to install MetaMask!'; onboardButton.onclick = onClickInstall;
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
    }


    updateButtons()

    MetamaskClientCheck();
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
const fileSelector = document.getElementById('fileToUpload');
fileSelector.addEventListener('change', (evento) => {
    fileData = evento.target.files[0];
    console.log(fileData);
});

//Instanciated IPFS external node, named Infura
//check IpfsHttpClient library is defined on html scripts section
//check IpfsHttpClient was previously imported in html file
//const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001 })
const ipfs = window.IpfsHttpClient.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

/*
*********************************
     Save Daily log report on IPFS
*********************************
*/
appendLogButton.onclick = async () => {
    try {
        let company = company_cif_write.value;
        let date = date_write.value;
        newDate = date.split(" ")[0]
        format = newDate.split("-");
        let year = format[0];
        let month = format[1];
        let day = format[2];

        //Insert daily report file on IPFS
        let result = await ipfs.add(fileData);
        console.log(ContractAccountAddress)
        console.log("RESULT")
        console.log(result)    //it is an object
        //Get the hash for uploaded file into blockchain
        let _url = "http://ipfs.io/ipfs/" + result.cid.string;
        console.log(_url);
        handleNewUrl(_url);
        //Upload the daily report to Ethereum
        //the variables must be identical as defined on Smart Contract
        console.log(await myContractWithSignature.append_log(company, year, month, day, _url));
    } catch (error) {
        console.error(error);
    }

    function handleNewUrl(_url) {
        url_result = _url
        urlDiv.innerHTML = url_result
    }


}

/*
*********************************
     Get Daily log registry
*********************************
*/
getLogButton.onclick = async () => {
    try {
        let company = company_cif_read.value;
        let date = date_read.value;
        newDate = date.split(" ")[0]
        format = newDate.split("-");
        let year = format[0];
        let month = format[1];
        let day = format[2];
        let result = await myContract.get_log(company, year, month, day);
        //Se muestran en una pequeña tabla con su respectivo hipervículo a la dirección en IPFS donde se encuentren alojados
        //En JS se puede "inyectar" código HTML en cualquier elemento teniendo únicamente su id
        document.getElementById("contenedor").innerHTML = '<table>'
            + '<tr><td> Daily Report: </td><td><a href="' + result[1] + '">' + result[0] + '</a>'
            + '</table>';
    } catch (error) {
        console.error(error);
    }
}


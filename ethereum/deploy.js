/**
 * This files let us deploy our contract using Truffle as an Wallet Provider
 * We use infura.io to connect to the rinkeby network
 * We use web3 to make deploy the contract afterwards
 */

//We need the HDWallet
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//We need the ABI and the Bytecode of the compile contract
const compiledFactory = require('./build/CampaignFactory.json');

/**
 * To get the wallet which is going to create the contract
 * We need the nemonic
 * 
 */
const neumonic = 'spare scatter fashion object direct poet beyond say trigger flight teach frame';
/**
 * To connect to the network we need infura
 */
const rinkeby = 'wss://rinkeby.infura.io/ws/v3/c0938b91a0b7408e85499f849f6b14de'

/**
 * To create the provider HDWallet needs
 *  1) Neumonic of the account 
 *  2) Network to connect to connect
 */
const provider = new HDWalletProvider(neumonic, rinkeby);

/**
 * We need web3 to deploy the rest
 */
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('\n\n\n\n\n\nAttempting to deploy from account', accounts[0]);

    
    // let actualBalance = await web3.eth.getBalance(accounts[0]);
    
    // console.log('\n\n\n\n\n\nBalance', actualBalance);

    
    
    //result = instance of the adrres
   
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ 
            data: '0x' + compiledFactory.bytecode 
        })
        .send(
            {
            from: accounts[0],
            }
        );
        
   
    // We are going to print the adress of the contract
    console.log('\n\n\n\n\nContract deployd to', result.options.address);
};

deploy();

import Web3 from 'web3';
let web3;

//We are in the browser and metamask is running
if( typeof window !== 'undefined' && typeof web3 !== 'undefined')
{
    console.log("Aqui: " + web3.currentProvider)
    web3 = new Web3(web3.currentProvider);
}
else
{
    //We are on the server OR the user is not running metamask
    //We make our provider with the infura node
    const rinkeby = 'https://rinkeby.infura.io/v3/c0938b91a0b7408e85499f849f6b14de';

    const provider = new Web3.providers.HttpProvider(rinkeby);

    web3 = new Web3(provider);
}


export default web3;
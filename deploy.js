const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    // Token,
    'https://rinkeby.infura.io/v3/71ea9b4668504654bbae01672c63f757'
);

const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'INBOX SMART CONTRACT';

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    let inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });

    console.log("Contract Deployed To: ", inbox.options.address);
}
deploy();
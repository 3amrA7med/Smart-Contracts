const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'INBOX SMART CONTRACT';
beforeEach(async () => {
    // Get a list of all accounts
    /* One way to do it
    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        })
    */
    // Another way
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });
    inbox.setProvider(provider);
    // Use one of those accounts to deploy the contract
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(accounts);
        assert.ok(inbox.options.address);
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('Changed')
            .send({ from: accounts[0], gas: '1000000' });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Changed');
    })
})







// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }
// // Make the car variable global
// let car;
// // This function will run before each test
// beforeEach(()=>{
//     car = new Car();
// })
// describe('CAR', ()=>{
//     it('Park Function', ()=>{
//         assert.equal(car.park(), 'stopped');
//     });
//     it('Drive Function', ()=>{
//         assert.equal(car.drive(), 'vroom');
//     });
// });
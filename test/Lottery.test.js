const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

// Web3 can be a considered as a class 
// whereas  web3  can be considered as an 
// instance

const provider = ganache.provider()

const web3 = new Web3(provider);
// ganache provider is like a sort of a  
// communication layer between the web3 and 
// ethereum network. 

let accounts, lottery;

beforeEach(async () => {
	// get list of all accounts 
	accounts = await web3.eth.getAccounts()
	// use one of those accounts to 
	// deploy the contract.
	lottery = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ from: accounts[0], gas:'1000000' })
});

describe('Lottery Contract', () => {
	it('deploys a contract', () => {
		assert.ok(lottery.options.address);
	})
})

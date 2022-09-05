import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import * as dotenv from 'dotenv'
import { MyEpicGame } from '../typechain/MyEpicGame'

dotenv.config()

const contract = require('../artifacts/contracts/MyEpicGame.sol/MyEpicGame.json')
const contractInterface = contract.abi

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider

const privateKey = `0x${process.env.PRIVATE_KEY}`
const wallet = new ethers.Wallet(privateKey, provider)
const signer = wallet.connect(provider)

// https://docs.ethers.io/v5/api/contract/contract
const nft: any = new ethers.Contract(
	process.env.CONTRACT_ADDRESS || '',
	contractInterface,
	signer
)

async function main() {
	console.log('Waiting 5 blocks for confirmation...')
	const gameContract: MyEpicGame = nft
	let txn
	txn = await gameContract.mintCharacterNFT(0)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(1)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(2)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(3)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(4)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(5)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(6)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(7)
	await txn.wait()
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

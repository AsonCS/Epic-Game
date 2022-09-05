import { ethers } from 'hardhat'
import { MyEpicGame } from '../typechain/MyEpicGame'

async function main() {
	const gameContractFactory = await ethers.getContractFactory('MyEpicGame')
	const gameContract: MyEpicGame = await gameContractFactory.deploy(
		[
			'Capybara',
			'Cat',
			'Dog',
			'Rabbit',
			'Buffalo',
			'Boar',
			'Deer',
			'Iguana',
		],
		[
			'https://asoncs.github.io/epic-game/images/capybara.jpg',
			'https://asoncs.github.io/epic-game/images/cat.jpg',
			'https://asoncs.github.io/epic-game/images/dog.jpg',
			'https://asoncs.github.io/epic-game/images/rabbit.jpg',
			'https://asoncs.github.io/epic-game/images/buffalo.jpg',
			'https://asoncs.github.io/epic-game/images/boar.jpg',
			'https://asoncs.github.io/epic-game/images/deer.jpg',
			'https://asoncs.github.io/epic-game/images/iguana.jpg',
		],
		[500, 400, 700, 100, 1000, 800, 200, 300],
		[700, 900, 500, 1000, 300, 400, 800, 600],
		'Jaguar',
		'https://asoncs.github.io/epic-game/images/jaguar.jpg',
		100
		// { gasLimit: 30000000 }
	)

	await gameContract.deployed()

	console.log('Contrato implantado no endereço:', gameContract.address)

	const allCharacterAttributes = await gameContract.getCharacterAttributes()
	allCharacterAttributes.forEach((char) => {
		// console.log(
		// 	`{\n  Nome: ${char.name},  Vida: ${char.hp},  Habilidade de Esquiva: ${char.dodgeSkill},  Img: ${char.imageURI}\n}`
		// )
	})

	let txn
	// Só temos três personagens.
	// Uma NFT com personagem no index 2 da nossa array.
	txn = await gameContract.mintCharacterNFT(2)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(0)
	await txn.wait()

	// (Pega o valor da URI da NFT
	let returnedTokenUri = await gameContract.tokenURI(1)
	// console.log('Token URI:', returnedTokenUri)
	returnedTokenUri = await gameContract.tokenURI(2)
	// console.log('Token URI:', returnedTokenUri)

	const allNfts = await gameContract.getNfts()
	allNfts.forEach((nft) => {
		// console.log(nft)
	})

	// console.log(await gameContract.bigBoss())

	txn = await gameContract.getAttack()
	await txn.wait()
	await sleep(2456)
	txn = await gameContract.getAttack()
	await txn.wait()
	await sleep(2541)
	txn = await gameContract.getAttack()
	await txn.wait()
	await sleep(3987)
	txn = await gameContract.getAttack()
	await txn.wait()
	await sleep(4587)
	txn = await gameContract.getAttack()
	await txn.wait()
	await sleep(1987)
	txn = await gameContract.getAttack()
	await txn.wait()
}

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

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
		[70, 90, 50, 100, 30, 40, 80, 60],
		'Jaguar',
		'https://asoncs.github.io/epic-game/images/jaguar.jpg',
		{ gasLimit: 30000000 }
	)

	await gameContract.deployed()

	console.log('Contrato implantado no endereço:', gameContract.address)

	console.log('\n\n getUserNfts')
	await gameContract.getUserNfts().then((nfts) => {
		nfts.forEach((nft) => {
			console.log(
				`nft.name: ${nft.name} | `,
				`nft.hp: ${nft.hp} | `,
				`nft.hp: ${nft.points}`
			)
		})
	})

	console.log('\n\n getCharacterAttributes')
	const allCharacterAttributes = await gameContract.getDefaultCharacters()
	allCharacterAttributes.forEach((char) => {
		// console.log(
		// 	`{\n  Nome: ${char.name},  Vida: ${char.hp},  Habilidade de Esquiva: ${char.dodgeSkill},  Img: ${char.imageURI}\n}`
		// )
	})

	console.log('\n\n mintCharacterNFT')
	let txn
	// Só temos três personagens.
	// Uma NFT com personagem no index 2 da nossa array.
	txn = await gameContract.mintCharacterNFT(2)
	await txn.wait()
	txn = await gameContract.mintCharacterNFT(0)
	await txn.wait()

	console.log('\n\n tokenURI')
	// (Pega o valor da URI da NFT
	let returnedTokenUri = await gameContract.tokenURI(0)
	// console.log('Token URI:', returnedTokenUri)
	returnedTokenUri = await gameContract.tokenURI(1)
	// console.log('Token URI:', returnedTokenUri)
	await gameContract.tokenURI(2).catch((error) => {
		console.error(error)
	})

	console.log('\n\n getNfts')
	// await gameContract.getNfts().then((nfts) => {
	// 	nfts.forEach((nft) => {
	// 		console.log(
	// 			`nft.name: ${nft.name} | `,
	// 			`nft.hp: ${nft.hp} | `,
	// 			`nft.hp: ${nft.points}`
	// 		)
	// 	})
	// })

	// console.log(await gameContract.bigBoss())

	console.log('\n\n NFT 0')
	txn = await gameContract.getAttack(0)
	await txn.wait()
	txn = await gameContract.getAttack(0)
	await txn.wait()
	// txn = await gameContract.getAttack(0)
	// await txn.wait()
	// txn = await gameContract.getAttack(0)
	// await txn.wait()

	console.log('\n\n NFT 1')
	txn = await gameContract.getAttack(1)
	await txn.wait()
	txn = await gameContract.getAttack(1)
	await txn.wait()
	// txn = await gameContract.getAttack(1)
	// await txn.wait()
	// txn = await gameContract.getAttack(1)
	// await txn.wait()

	await gameContract.getAttack(2).catch((error) => {
		console.error(error)
	})

	console.log('\n\n getUserNfts')
	await gameContract.getUserNfts().then((nfts) => {
		nfts.forEach((nft) => {
			console.log(
				`nft.name: ${nft.name} | `,
				`nft.hp: ${nft.hp} | `,
				`nft.hp: ${nft.points}`
			)
		})
	})

	console.log('\n\n bigBoss')
	await gameContract.getBigBoss().then((bigBoss) => {
		console.log(`bigBoss: ${bigBoss.name} | ${bigBoss.imageURI}`)
	})
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

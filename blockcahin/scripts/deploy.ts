import { ethers } from 'hardhat'

async function main() {
	const gameContractFactory = await ethers.getContractFactory('MyEpicGame')
	const gameContract = await gameContractFactory.deploy(
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

	let txn = await gameContract.mintCharacterNFT(0)
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

	console.log('Fim do deploy e mint!')
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

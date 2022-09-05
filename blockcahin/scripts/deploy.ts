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
		[700, 900, 500, 1000, 300, 400, 800, 600]
	)

	await gameContract.deployed()

	console.log('Contrato implantado no endereço:', gameContract.address)

	console.log('Fim do deploy e mint!')
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

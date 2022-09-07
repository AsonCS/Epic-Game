import React from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import './App.css'

import * as images from './ui/images'

// Constants
const TWITTER_HANDLE = 'web3dev_'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
	return (
		<div className='App'>
			<div className='container'>
				<div className='header-container'>
					<p className='header gradient-text'>
						⚔️ Sobrevivendo no Metaverso ⚔️
					</p>
					<p className='sub-text'>
						Tente sobreviver as onças do Metaverso!
					</p>
					<div className='connect-wallet-container'>
						<img src={images.jaguar} alt='Foto de uma onça' />
					</div>
				</div>
				<div className='footer-container'>
					<img
						alt='Twitter Logo'
						className='twitter-logo'
						src={twitterLogo}
					/>
					<a
						className='footer-text'
						href={TWITTER_LINK}
						target='_blank'
						rel='noreferrer'
					>{`construído por @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	)
}

export default App

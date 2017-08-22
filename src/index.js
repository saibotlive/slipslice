import 'pixi'
import Phaser from 'phaser'

import BootState from './states/Boot'
import PreloadState from './states/Preload'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const width = config.gameWidth
    const height = config.gameHeight

    super(width, height, Phaser.CANVAS)

    this.state.add('Boot', BootState, false)
    this.state.add('Preload', PreloadState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()

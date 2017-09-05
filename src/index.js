import 'pixi'
import Phaser from 'phaser'

import BootState from './states/Boot'
import PreloadState from './states/Preload'
import StartState from './states/Start'
import ObjectivesState from './states/Objectives'
import DifficultyState from './states/Difficulty'
import GameState from './states/Game'
import GameOverState from './states/GameOver'
import PartyState from './states/Party'
import NoPartyState from './states/NoParty'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const width = config.gameWidth
    const height = config.gameHeight

    super(width, height, Phaser.CANVAS)

    this.state.add('Boot', BootState, false)
    this.state.add('Preload', PreloadState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Objectives', ObjectivesState, false)
    this.state.add('Difficulty', DifficultyState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.add('Party', PartyState, false)
    this.state.add('NoParty', NoPartyState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()

import Phaser from 'phaser'
import config from '../config'
import Button from '../sprites/Button'

export default class extends Phaser.State {
  init () {}
  create () {
    this.add.image(0, 0, 'game-over-bg')
    this.exitBtn = new Button(this.game, 170, 490, this.exit, 'EXIT', 36, new Phaser.Point(0, 1))
    this.replayBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.replay,
      'REPLAY',
      36,
      new Phaser.Point(1, 1)
    )
  }

  exit = () => {
    config.totalScore = 0
    config.levelCount = 1
    this.state.start('Start')
  }
  replay = () => {
    this.state.start('Game')
  }
}

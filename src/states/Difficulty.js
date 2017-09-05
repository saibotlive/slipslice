import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init () {}

  create () {
    this.sfx = this.add.audioSprite('sfx')
    this.add.image(0, 0, 'difficulty-bg')
    this.addButton(219, 140, 'easy')
    this.addButton(505, 140, 'pro')
  }

  addButton = (x, y, difficulty) => {
    const btn = this.game.add.graphics(x, y)
    btn.beginFill('#ffffff', 0)
    btn.drawRect(0, 0, 255, 274)
    btn.endFill()
    btn.inputEnabled = true
    btn.useHandCursor = true
    btn.events.onInputDown.add(this.play(difficulty), this)
  }

  play = difficulty => () => {
    config.introMusic.stop('claps')
    this.sfx.play('click')
    config.difficulty = difficulty
    this.state.start(
      'Game',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
}

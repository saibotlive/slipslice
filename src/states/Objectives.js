import Phaser from 'phaser'
import config from '../config'
import Button from '../sprites/Button'

export default class extends Phaser.State {
  init () {}

  create () {
    this.add.image(0, 0, 'objectives-bg')
    let charCopy = ''
    for (let c = 0; c < config.json.objectives.length; c++) {
      charCopy += config.json.objectives.charAt(c) + ' '
    }
    this.txt = this.game.add.text(this.game.width / 2, this.game.height / 2 + 30, charCopy, {
      font: `24px Futura-Condensed-Medium`,
      fill: config.teal,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 475
    })
    this.txt.anchor.set(0.5)

    this.PLAYBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.play,
      'PLAY',
      36,
      new Phaser.Point(1, 1)
    )
  }
  play = () => {
    this.state.start(
      'Difficulty',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
}

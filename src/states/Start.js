import Phaser from 'phaser'
import config from '../config'
import HowTo from '../sprites/HowTo'
import Button from '../sprites/Button'

export default class extends Phaser.State {
  init () {}
  create () {
    this.sfx = this.add.audioSprite('sfx')
    this.sfx.allowMultiple = true
    // this.sfx.onStop.add(this.soundComplete, this)
    // this.sfx.play('party', 0.8)
    this.add.image(0, 0, 'bg')
    this.logo = this.add.image(
      this.game.width / 2,
      this.game.height / 2 + 20,
      'screen_assets',
      'logo_big'
    )
    this.logo.anchor.set(0.5)
    this.add.tween(this.logo.scale).from({ x: 0, y: 0 }, 500, Phaser.Easing.Back.Out, true)
    this.gshakers = this.add.image(10, 10, 'screen_assets', 'gameshakers_logo')

    this.nick = this.add
      .image(this.game.width - 10, 10, 'screen_assets', 'nick_logo')
      .anchor.set(1, 0)

    this.howToBtn = new Button(
      this.game,
      170,
      490,
      this.showHowTo,
      'HOW TO',
      36,
      new Phaser.Point(0, 1)
    )
    this.startBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.start,
      'START',
      36,
      new Phaser.Point(1, 1)
    )
    this.howTo = new HowTo(this.game, 0, -this.game.height, 'howto1')
  }

  showHowTo = () => {
    this.howTo.show()
  }

  start = () => {
    this.state.start(
      'Objectives',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
}

import Phaser from 'phaser'
import config from '../config'
import { createText } from '../utils'
import Button from '../sprites/Button'

export default class extends Phaser.State {
  init () {}
  create () {
    // this.sfx = this.add.audioSprite('sfx')
    this.add.image(0, 0, `fail-${config.levelCount}`)
    this.txt = createText(
      this.game,
      this.game.width / 2,
      370,
      config.json.noParty[config.levelCount].title,
      60,
      { x: 0.5, y: 0 },
      '#ffffff',
      'center',
      { fill: config.dullred, width: 3 },
      { x: -3, y: 3, fill: config.dullred }
    )

    this.scoreTxt = createText(
      this.game,
      this.game.width / 2,
      78,
      `${config.score}!`,
      62,
      { x: 0, y: 0.5 },
      config.red,
      'left'
    )

    /* this.logo = this.add.image(0, 0, 'screen_assets', 'logo')
    this.gs = this.add
      .image(10, this.game.height - 10, 'screen_assets', 'gameshakers_logo')
      .anchor.set(0, 1)

    this.nick = this.add
      .image(this.game.width - 10, this.game.height - 10, 'screen_assets', 'nick_logo')
      .anchor.set(1, 1) */

    this.quitBtn = new Button(this.game, 372, 490, this.quit, 'QUIT', 36)
    this.retryBtn = new Button(this.game, 597, 490, this.retry, 'RETRY', 36)
  }

  retry = () => {
    this.state.start(
      'Game',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
  quit = () => {
    config.totalScore = 0
    config.levelCount = 1
    this.state.start(
      'Start',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
}

import Phaser from 'phaser'
import config from '../config'
import { createText } from '../utils'
import Button from '../sprites/Button'
import PartyPenguin from '../sprites/PartyPenguin'

export default class extends Phaser.State {
  init () {}
  create () {
    this.sfx = this.add.audioSprite('sfx')
    this.sfx.allowMultiple = true
    // this.sfx.onStop.add(this.soundComplete, this)
    this.sfx.play('party', 0.8)
    this.add.image(0, 0, `party-${config.levelCount}`)
    const partyData = config.json.party[`${config.levelCount}`].penguins
    partyData.forEach(penguin => {
      const pp = new PartyPenguin(this.game, penguin.x, penguin.y, penguin.type, penguin)
    })
    this.txt = createText(
      this.game,
      this.game.width / 2,
      370,
      config.json.party[config.levelCount].title,
      60,
      { x: 0.5, y: 0 },
      '#ffffff',
      'center',
      { fill: '#194cf3', width: 3 },
      { x: -3, y: 3, fill: '#194cf3' }
    )

    this.scoreTxt = createText(
      this.game,
      config.levelCount < 4 ? this.game.width / 2 : 350,
      78,
      `${config.score}!`,
      62,
      { x: 0, y: 0.5 },
      config.red,
      'left'
    )

    if (config.levelCount === 4) config.totalScore += config.score

    this.totalTxt = createText(
      this.game,
      600,
      78,
      `${config.totalScore}/${config.allTotal}`,
      36,
      { x: 0, y: 0.5 },
      config.red,
      'left'
    )

    /* this.logo = this.add.image(0, 0, 'screen_assets', 'logo')
    this.gameshakers = this.add
      .image(10, this.game.height - 10, 'screen_assets', 'gameshakers_logo')
      .anchor.set(0, 1)

    this.nick = this.add
      .image(this.game.width - 10, this.game.height - 10, 'screen_assets', 'nick_logo')
      .anchor.set(1, 1) */

    this.retryBtn = new Button(this.game, 372, 490, this.retry, 'RETRY', 36)
    if (config.levelCount < 4) {
      this.continueBtn = new Button(this.game, 597, 490, this.continue, 'CONTINUE', 36)
    } else this.homeBtn = new Button(this.game, 597, 490, this.home, 'HOME', 36)
  }

  retry = () => {
    this.sfx.stop('party')
    this.state.start(
      'Game',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
  home = () => {
    this.sfx.stop('party')
    config.totalScore = 0
    config.levelCount = 1
    this.state.start(
      'Start',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
  continue = () => {
    this.sfx.stop('party')
    config.totalScore += config.score
    config.levelCount++
    this.state.start(
      'Game',
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft
    )
  }
}

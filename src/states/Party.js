import Phaser from 'phaser'
import config from '../config'
import { FadeIn, FadeOut } from '../utils'
import Button from '../sprites/Button'
import PartyPenguin from '../sprites/PartyPenguin'

export default class extends Phaser.State {
  init () {}
  create () {
    this.sfx = this.add.audioSprite('sfx')
    this.sfx.allowMultiple = true
    // this.sfx.onStop.add(this.soundComplete, this)
    this.sfx.play('party', 0.3)
    this.add.image(0, 0, 'party-bg')
    const partyData = config.json.party[`${config.levelCount}`].penguins
    partyData.forEach(penguin => {
      const pp = new PartyPenguin(this.game, penguin.x, penguin.y, penguin.type, penguin)
    })
    this.txt = this.add.text(this.game.width / 2, 370, config.json.party[config.levelCount].title, {
      font: '60px Municipal',
      fill: '#ffffff',
      stroke: '#194cf3',
      strokeThickness: 3,
      align: 'center'
    })
    this.txt.setShadow(-3, 3, '#194cf3')
    this.txt.anchor.set(0.5, 0)

    this.retryBtn = new Button(this.game, 372, 500, this.retry, 'RETRY', 36)
    if (config.levelCount < 4) {
      this.continueBtn = new Button(this.game, 597, 500, this.continue, 'CONTINUE', 36)
    }
  }

  retry = () => {
    this.sfx.stop('party')
    this.state.start('Game')
  }
  continue = () => {
    this.sfx.stop('party')
    config.levelCount++
    this.state.start('Game')
  }
}

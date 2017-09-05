import Phaser from 'phaser'
import Button from '../sprites/Button'

import { TweenLite, Back, Linear } from 'gsap'

export default class extends Phaser.Image {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game.add.existing(this)
    this.sfx = this.game.add.audioSprite('sfx')
    const key = this.game.device.desktop ? 'howto3' : 'howto2'
    this.howto2 = this.addChild(this.game.add.image(960, 0, key))

    this.nextBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.next,
      'NEXT',
      36,
      new Phaser.Point(1, 1)
    )
    this.addChild(this.nextBtn)

    this.okBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.ok,
      'OK',
      36,
      new Phaser.Point(1, 1)
    )
    this.howto2.addChild(this.okBtn)
  }
  show = () => {
    TweenLite.to(this, 0.5, { y: 0, ease: Back.easeOut })
  }

  next = () => {
    if (this.game.paused) this.sfx.play('click')
    TweenLite.to(this, 0.3, { x: -this.game.width, ease: Linear.easeNone })
  }

  ok = () => {
    if (this.game.paused) this.sfx.play('click')
    TweenLite.to(this, 0.5, { y: -this.game.height, ease: Back.easeInOut, onComplete: this.reset })
  }

  reset = () => {
    this.x = 0
  }
}

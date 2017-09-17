import Phaser from 'phaser'
import Button from '../sprites/Button'

import { TweenLite, Back, Linear } from 'gsap'

export default class extends Phaser.Image {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game.add.existing(this)
    this.sfx = this.game.add.audioSprite('sfx')
    const key = this.game.device.desktop ? 'howto5' : 'howto4'
    this.howto2 = this.addChild(this.game.add.image(960, 0, 'howto2'))
    this.howto3 = this.addChild(this.game.add.image(1920, 0, 'howto3'))
    this.howto4 = this.addChild(this.game.add.image(2880, 0, key))
    this.inputEnabled = true
    /* this.nextBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.next,
      'NEXT',
      36,
      new Phaser.Point(1, 1)
    ) */
    this.nextBtn1 = this.addButton(770, 1, this.next)
    this.prevBtn1 = this.addButton(200, -1, this.ok)
    this.nextBtn2 = this.addButton(770, 1, this.next)
    this.prevBtn2 = this.addButton(200, -1, this.prev)
    this.nextBtn3 = this.addButton(770, 1, this.next)
    this.prevBtn3 = this.addButton(200, -1, this.prev)
    this.prevBtn4 = this.addButton(60, -1, this.prev)
    this.addChild(this.nextBtn1)
    this.addChild(this.prevBtn1)
    this.howto2.addChild(this.nextBtn2)
    this.howto2.addChild(this.prevBtn2)
    this.howto3.addChild(this.nextBtn3)
    this.howto3.addChild(this.prevBtn3)

    this.okBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.ok,
      'OK',
      36,
      new Phaser.Point(1, 1)
    )
    this.howto4.addChild(this.prevBtn4)
    this.howto4.addChild(this.okBtn)
  }
  show = () => {
    TweenLite.to(this, 0.5, { y: 0, ease: Back.easeOut })
  }

  next = () => {
    if (this.game.paused) this.sfx.play('click')
    TweenLite.to(this, 0.3, { x: this.x - this.game.width, ease: Linear.easeNone })
  }
  prev = () => {
    if (this.game.paused) this.sfx.play('click')
    TweenLite.to(this, 0.3, { x: this.x + this.game.width, ease: Linear.easeNone })
  }

  ok = () => {
    if (this.game.paused) this.sfx.play('click')
    TweenLite.to(this, 0.5, { y: -this.game.height, ease: Back.easeInOut, onComplete: this.reset })
  }

  addButton = (x, scale, fn) => {
    const btn = this.game.add.button(
      x,
      this.game.height / 2,
      'screen_assets',
      fn,
      null,
      'nextprev',
      'nextprev'
    )
    btn.anchor.set(0.5)
    btn.scale.set(scale, 1)
    return btn
  }

  reset = () => {
    this.x = 0
  }
}

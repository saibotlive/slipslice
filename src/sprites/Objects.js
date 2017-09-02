import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, sfx) {
    super(game, x, y, 'assets', asset !== 'cube' ? `${asset}0000` : asset)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = this.width
    this.hitHeight = 75
    this.type = asset
    this.points = config.json.items[asset].points
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, 0, 0)
    this.game.add.existing(this)
    if (asset === 'cube') {
      this.game.add
        .tween(this)
        .to(
          { y: this.y + 7 },
          1000,
          Phaser.Easing.Quadratic.InOut,
          true,
          game.rnd.integerInRange(0, 1000),
          10000,
          true
        )
    }
    /* this.txt = this.game.add.bitmapText(
      this.x,
      this.y - 50,
      'municipal-points',
      `+${this.points}`,
      50
    )
    this.txt.alpha = 0
    this.txt.tint = 0xffff00 */

    this.txt = this.game.add.text(this.x - 20, this.y - 100, `+${this.points}`, {
      font: '50px Municipal',
      stroke: '#000000',
      strokeThickness: 3,
      fill: '#ffff00',
      align: 'center'
    })
    this.txt.alpha = 0
    this.sfx = sfx
    this.touched = false
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }

  hit () {
    if (!this.touched) {
      this.txt.alpha = 1
      this.playSound(this.type)
      this.tween = this.game.add
        .tween(this.txt)
        .to({ y: this.txt.y - 100 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true)
      this.tween.onComplete.add((obj, tw) => {
        this.txt.destroy()
      }, this)
      this.type === 'cube' ? this.destroy() : (this.frameName = `${this.type}0001`)
    }
  }

  playSound (type) {
    switch (type) {
      case 'cube':
        return this.sfx.play('pickup')
      case 'radiator':
        return this.sfx.play('ice')
    }
  }
}

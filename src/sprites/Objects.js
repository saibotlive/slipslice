import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, sfx) {
    super(game, x, y, 'assets', asset)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = 75
    this.hitHeight = 75
    this.type = asset
    this.points = config.json.items[asset].points
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, 0, this.height - this.hitHeight)
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
    this.txt = this.game.add.bitmapText(this.x, this.y - 50, 'municipal-points', `+${this.points}`, 50)
    this.txt.alpha = 0
    this.txt.tint = 0xffff00
    this.sfx = sfx
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }

  hit () {
    this.txt.alpha = 1
    this.playSound(this.type)
    this.tween = this.game.add
      .tween(this.txt)
      .to({ y: this.txt.y - 100 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true)
    this.tween.onComplete.add((obj, tw) => {
      this.txt.destroy()
    }, this)
    this.destroy()
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

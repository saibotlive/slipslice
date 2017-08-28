import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, 'assets', asset)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = 75
    this.hitHeight = 75
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, 0, this.height - this.hitHeight)
    this.hit = false
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
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }
}

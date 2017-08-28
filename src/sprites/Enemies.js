import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, flipped) {
    super(game, x, y, 'assets', asset)
    this.anchor.setTo(0.5, 1)
    console.log('flipped', flipped)
    flipped ? this.scale.setTo(-1, 1) : this.scale.setTo(1)
    this.hitWidth = 75
    this.hitHeight = 75
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(
      this.hitWidth,
      this.hitHeight,
      this.width / 2 * this.scale.x,
      this.height - this.hitHeight
    )
    this.hit = false
    this.game.add.existing(this)
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }
}

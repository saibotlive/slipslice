import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, flipped, sfx) {
    super(game, x, y, 'assets', asset)
    this.anchor.setTo(0.5, 1)
    flipped ? this.scale.setTo(-1, 1) : this.scale.setTo(1)
    this.hitWidth = 50
    this.hitHeight = 50
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.body.setSize(
      this.hitWidth,
      this.hitHeight,
      config.json.enemies[asset].hitX,
      this.height - this.hitHeight
    )
    this.hit = false
    this.game.add.existing(this)
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }
}

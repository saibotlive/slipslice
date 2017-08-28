import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, 'assets', asset)
    this.anchor.setTo(1.5, 1)
    this.hitWidth = 60
    this.hitHeight = 60
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, this.width / 3, this.height - this.hitHeight)
    this.body.velocity.x = 400
    this.hit = false
    this.game.add.existing(this)
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
    console.log('cc', config.json.debug)
  }
}

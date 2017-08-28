import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.TileMap {
  constructor (key) {
    super(key)
    this.anchor.setTo(0, 1)

    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.velocity.x = 400
    this.hit = false
    this.game.add.existing(this)
    //stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
    console.log('cc', config)
  }
}

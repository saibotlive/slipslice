import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, sfx, reverse) {
    super(game, x, y, 'assets', asset, sfx)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = this.width
    this.hitHeight = this.height
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, 0, 0)
    this.body.immovable = true
    this.body.checkCollision.down = false
    this.body.checkCollision.left = false
    this.reverse = reverse
    this.game.add.existing(this)
  }
}

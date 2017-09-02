import Phaser from 'phaser'
import config from '../config'
import Objects from '../sprites/Objects'

export default class extends Objects {
  constructor (game, x, y, asset, sfx) {
    super(game, x, y, asset, sfx)
    this.hitWidth = this.width
    this.hitHeight = 10
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, 0, 0)
    this.body.immovable = true
    this.body.checkCollision.down = false
    this.body.checkCollision.left = false
    this.game.add.existing(this)
  }
}

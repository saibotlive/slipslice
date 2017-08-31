import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, flipped, sfx) {
    //console.log(Object.keys(game.cache.getFrameData('assets')._frameNames))
    const totalFrames = Object.keys(game.cache.getFrameData('assets')._frameNames)
      .toString()
      .split(asset).length
    super(game, x, y, 'assets', totalFrames > 2 ? `${asset}0000` : asset)
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
    if (totalFrames > 2) {
      this.animations.add(
        'move',
        Phaser.Animation.generateFrameNames(asset, 0, totalFrames - 1, '', 4),
        30,
        true
      )
      this.animations.play('move')
    }
    //
  }
}

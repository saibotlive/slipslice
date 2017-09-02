import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, data) {
    const totalFrames = Object.keys(game.cache.getFrameData('party_assets')._frameNames)
      .toString()
      .split(asset).length
    super(game, x, y, 'party_assets', totalFrames > 2 ? `${asset}0000` : asset)
    this.anchor.setTo(0.5, 1)
    data.flipped ? this.scale.setTo(-1, 1) : this.scale.setTo(1)
    this.game.add.existing(this)
    if (totalFrames > 2) {
      this.animations.add(
        'move',
        Phaser.Animation.generateFrameNames(asset, 0, totalFrames - 1, '', 4),
        data.fps,
        true
      )
      this.animations.play('move')
    }
    //
  }
}

import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    // console.log(Object.keys(game.cache.getFrameData('assets')._frameNames))

    super(game, x, y, 'screen_assets', `${asset}0049`)
    this.anchor.setTo(0.5, 0)
    this.fixedToCamera = true
    this.game.add.existing(this)
    this.totalFrames = 29
    this.allFrames = Phaser.Animation.generateFrameNames(asset, 0, 99, '', 4)
    this.timer = game.time.create(false)
    this.timer.loop(config.json.difficulty[config.difficulty].tempRise, this.tempRise, this)
    this.currentFrame = 50
    // this.game.time.events.add(2000, this.timer.start, this);
    // this.animations.add('move', [0, 29], 30, true)
    // this.animations.play('move')
  }

  tempRise () {
    if (this.currentFrame < 99) {
      this.currentFrame++
      this.currentFrame = this.currentFrame > 99 ? 99 : this.currentFrame
    }
    this.frameName = this.allFrames[this.currentFrame]
  }

  tempDrop (frame) {
    if (this.currentFrame > 0) {
      this.currentFrame -= frame
      this.currentFrame = this.currentFrame < 0 ? 0 : this.currentFrame
    }
    this.frameName = this.allFrames[this.currentFrame]
  }
  stop () {
    this.timer.stop()
  }
}

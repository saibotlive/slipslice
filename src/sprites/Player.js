import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, sfx) {
    super(game, x, y, 'assets', `${asset}0000`)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = 70
    this.hitHeight = 70
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(
      this.hitWidth,
      this.hitHeight,
      this.width / 2,
      this.height - this.hitHeight + 10
    )
    this.speed = config.json.difficulty[config.difficulty].speed
    this.body.gravity.y = config.json.difficulty[config.difficulty].gravity
    this.body.velocity.x = this.speed
    this.hit = false
    this.onStairs = false
    this.canJump = true
    this.game.add.existing(this)

    const hitArea = this.game.state.states.Game.hitArea

    hitArea.events.onInputDown.add(this.handleJump, this)
    this.sfx = sfx

    // this.animations.add('move', Phaser.Animation.generateFrameNames(asset, 0, 39, '', 4), 30, true);
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }

  handleJump () {
    if (this.canJump) {
      this.sfx.play('jump')
      this.body.velocity.y = config.json.difficulty[config.difficulty].jump
      this.canJump = false
    }
  }
}

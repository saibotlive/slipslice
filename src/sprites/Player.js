import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, sfx) {
    super(game, x, y, 'assets', `${asset}0000`)
    this.anchor.setTo(0.5, 1)
    this.hitWidth = 70
    this.hitHeight = 70
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(this.hitWidth, this.hitHeight, this.width / 2, 50)
    this.speed = config.json.difficulty[config.difficulty].speed
    this.speedY = config.json.difficulty[config.difficulty].speed
    this.gravity = config.json.difficulty[config.difficulty].gravity
    this.hit = false
    this.flipped = false
    this.onStairs = false
    this.canJump = true
    this.dir = 'right'
    this.dirPressed = false
    this.game.add.existing(this)

    const hitArea = this.game.state.states.Game.hitArea

    hitArea.events.onInputDown.add(this.handleJump, this)
    this.jumpBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.upBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.leftBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.sfx = sfx
    const totalFrames = Object.keys(game.cache.getFrameData('assets')._frameNames)
      .toString()
      .split(asset).length

    this.animations.add('move', Phaser.Animation.generateFrameNames(asset, 0, 11, '', 4), 30, true)

    this.animations.add(
      'dizzy',
      Phaser.Animation.generateFrameNames(asset, 12, totalFrames - 1, '', 4),
      30,
      true
    )
    this.animations.play('move')
    // stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
  }

  update () {
    if (this.jumpBtn.isDown) {
      this.handleJump()
    }
    if (this.upBtn.isDown) {
      this.handleJump()
    }
    if (this.leftBtn.isDown) {
      this.dir = 'left'
      const gearStick = this.game.state.states.Game.gearStick
      this.scale.x = -1
      this.flipped = true
      this.speed = -config.json.difficulty[config.difficulty].speed
      this.body.velocity.x = this.speed
      if (gearStick.frameName === 'gearStick0000') gearStick.animations.play('right')
      this.leftBtn.isDown = false
    }
    if (this.rightBtn.isDown) {
      this.dir = 'right'
      const gearStick = this.game.state.states.Game.gearStick
      this.scale.x = 1
      this.flipped = false
      this.speed = config.json.difficulty[config.difficulty].speed
      this.body.velocity.x = this.speed
      if (gearStick.frameName === 'gearStick0002') gearStick.animations.play('left')
      this.rightBtn.isDown = false
    }
  }

  handleJump () {
    if (this.canJump && this.game.state.states.Game.started) {
      this.sfx.play('jump')
      this.body.velocity.y = config.json.difficulty[config.difficulty].jump
      this.canJump = false
    }
  }
}

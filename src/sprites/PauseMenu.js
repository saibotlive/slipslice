import Phaser from 'phaser'
import config from '../config'
import Button from '../sprites/Button'

export default class extends Phaser.Image {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.fixedToCamera = true
    this.game.add.existing(this)
    this.visible = false
    this.soundOff = this.game.add.sprite(
      585,
      170,
      'screen_assets',
      config.muted ? 'sound_off0001' : 'sound_off0000'
    )
    this.soundOn = this.game.add.sprite(
      585,
      250,
      'screen_assets',
      config.muted ? 'sound_on0000' : 'sound_on0001'
    )
    this.soundOff.inputEnabled = true
    this.soundOn.inputEnabled = true
    this.soundOff.useHandCursor = true
    this.soundOn.useHandCursor = true
    this.soundOn.events.onInputDown.add(this.unmute, this)
    this.soundOff.events.onInputDown.add(this.mute, this)
    this.continueBtn = new Button(
      this.game,
      this.game.width - 170,
      490,
      this.continue,
      'CONTINUE',
      36
    )
    this.addChild(this.soundOff)
    this.addChild(this.soundOn)
    this.addChild(this.continueBtn)
    this.game.input.onDown.add(this.unPause, this)
  }
  update () {}

  unPause = () => {
    if (
      this.game.input.hitTest(
        this.continueBtn,
        this.game.input.activePointer,
        new Phaser.Point(this.game.input.x, this.game.input.y)
      )
    ) {
      this.continue()
    } /* else if (
      this.game.input.hitTest(
        this.mutebutton,
        this.game.input.activePointer,
        new Phaser.Point(this.game.input.x, this.game.input.y)
      )
    ) {
      this.onMute()
    } */
  }

  pauseGame () {
    this.game.paused = true
    this.visible = true
  }

  mute = () => {
    this.soundOn.frameName = 'sound_on0000'
    this.soundOff.frameName = 'sound_off0001'
    config.muted = true
    const localData = JSON.parse(localStorage.getItem(config.localStorageName))
    localStorage.setItem(
      config.localStorageName,
      JSON.stringify({ ...localData, muted: config.muted })
    )
  }

  unmute = () => {
    this.soundOn.frameName = 'sound_on0001'
    this.soundOff.frameName = 'sound_off0000'
    config.muted = false
    const localData = JSON.parse(localStorage.getItem(config.localStorageName))
    localStorage.setItem(
      config.localStorageName,
      JSON.stringify({ ...localData, muted: config.muted })
    )
  }

  continue = () => {
    this.game.paused = false
    this.visible = false
    this.game.sound.mute = config.muted
    // this.sfx.stop('party')
  }
}

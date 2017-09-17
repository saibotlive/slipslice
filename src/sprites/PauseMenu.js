import Phaser from 'phaser'
import config from '../config'
import { createText } from '../utils'
import { TweenLite, Back } from 'gsap'
import Button from '../sprites/Button'
import HowTo from '../sprites/HowTo'

export default class extends Phaser.Image {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.fixedToCamera = true
    this.inputEnabled = true
    this.game.add.existing(this)
    this.visible = false
    this.pauseGrp = this.game.add.group()
    this.quitGrp = this.game.add.group()
    this.titleTxt = createText(
      this.game,
      this.game.width / 2,
      80,
      'II  G A M E  F R O Z E N',
      30,
      { x: 0.5, y: 0 },
      '#ffffff',
      'center',
      { fill: '#194cf3', width: 3 },
      null
    )
    this.howToBtn = this.game.add.button(
      140,
      140,
      'screen_assets',
      this.showHowTo,
      this,
      'howto',
      'howto'
    )
    this.soundBg = this.game.add.image(430, 140, 'screen_assets', 'sound-pause')

    this.soundOff = this.game.add.sprite(
      515,
      170,
      'screen_assets',
      config.muted ? 'sound_off0001' : 'sound_off0000'
    )
    this.soundOn = this.game.add.sprite(
      515,
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
    this.resumeBtn = new Button(this.game, this.game.width - 140, 370, this.resume, 'RESUME', 36)
    this.quitBtn = new Button(this.game, this.game.width - 140, 250, this.showQuit, 'QUIT', 36)
    this.howTo = new HowTo(this.game, 0, -this.game.height, 'howto1')
    this.addChild(this.pauseGrp)
    this.addChild(this.quitGrp)
    this.addChild(this.titleTxt)
    this.addChild(this.howToBtn)
    this.addChild(this.soundBg)
    this.addChild(this.soundOff)
    this.addChild(this.soundOn)
    this.addChild(this.resumeBtn)
    this.addChild(this.quitBtn)
    this.addChild(this.howTo)
    this.pauseGrp.addMultiple([
      this.titleTxt,
      this.howToBtn,
      this.soundBg,
      this.soundOff,
      this.soundOn,
      this.resumeBtn,
      this.quitBtn,
      this.howTo
    ])
    this.addQuit()
  }

  addQuit () {
    this.sureTxt = createText(
      this.game,
      this.game.width / 2,
      180,
      'ARE YOU SURE YOU WANT TO QUIT?',
      30,
      { x: 0.5, y: 0 },
      '#ffffff',
      'center',
      { fill: '#194cf3', width: 3 }
    )
    this.yesBtn = new Button(this.game, 350, 300, this.yes, 'YES', 36)
    this.noBtn = new Button(this.game, 600, 300, this.no, 'NO', 36)
    this.addChild(this.yesBtn)
    this.addChild(this.noBtn)
    this.quitGrp.addMultiple([this.sureTxt, this.yesBtn, this.noBtn])
    this.quitGrp.y = -this.game.height
  }

  pauseGame () {
    this.game.paused = true
    this.visible = true
  }

  showHowTo = () => {
    this.howTo.show()
  }

  showQuit = () => {
    TweenLite.to(this.quitGrp, 0.3, { y: 0, ease: Back.easeOut })
    TweenLite.to(this.pauseGrp, 0.3, { y: -this.game.height, ease: Back.easeIn })
  }

  yes = () => {
    this.game.paused = false
    this.game.state.start('Start')
  }

  no = () => {
    TweenLite.to(this.quitGrp, 0.3, { y: -this.game.height, ease: Back.easeIn })
    TweenLite.to(this.pauseGrp, 0.3, { y: 0, ease: Back.easeOut })
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

  resume = () => {
    this.game.paused = false
    this.visible = false
    this.game.sound.mute = config.muted
    // this.sfx.stop('party')
  }
}

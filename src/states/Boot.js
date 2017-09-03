import Phaser from 'phaser'
import config from '../config'
import 'phaser-state-transition'
import 'script-loader!phaser-arcade-slopes'
// import 'script-loader!phaser-camera-offset'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
  }

  preload () {
    WebFont.load({
      custom: {
        families: ['Municipal', 'Futura-Condensed-Medium']
      },
      active: this.fontsLoaded
    })

    this.load.json('config', 'config.json')
    /* this.load.bitmapFont('municipal', 'assets/fonts/municipal.png', 'assets/fonts/municipal.xml')
    this.load.bitmapFont(
      'municipal-points',
      'assets/fonts/municipal-points.png',
      'assets/fonts/municipal-points.xml'
    ) */

    this.load.image('preloaderBg', './assets/images/preloader-bg.png')
  }

  create () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    const localData = localStorage.getItem(config.localStorageName)

    localData
      ? (config.muted = JSON.parse(localData).muted)
      : localStorage.setItem(config.localStorageName, JSON.stringify({ muted: config.muted }))
    config.muted = localData && JSON.parse(localData).muted
    this.game.sound.mute = config.muted

    config.json = this.cache.getJSON('config')
  }
  render () {
    if (this.fontsReady) {
      this.state.start('Preload')
    }
  }

  fontsLoaded = () => {
    this.fontsReady = true
  }
}

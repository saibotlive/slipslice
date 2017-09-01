import Phaser from 'phaser'
import config from '../config'
import 'script-loader!phaser-arcade-slopes' // eslint-disable-line no-webpack-loader-syntax

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
  }

  preload () {
    this.load.json('config', 'config.json')
    this.load.bitmapFont('municipal', 'assets/fonts/municipal.png', 'assets/fonts/municipal.xml')
    this.load.bitmapFont('municipal-points', 'assets/fonts/municipal-points.png', 'assets/fonts/municipal-points.xml')

    this.load.image('preloaderBg', './assets/images/preloader-bg.png')
  }

  create () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.state.start('Preload')
    config.json = this.cache.getJSON('config')
  }
}

import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    this.load.tilemap('map', './assets/map/slipslice.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('layout', './assets/map/layout.png')
    this.load.image('cube', 'assets/map/cube.png')
    this.load.image('tile', 'assets/map/tile.png')
    this.load.image('penguin', 'assets/images/penguin.png')
    this.game.load.spritesheet('slopes', 'assets/map/slopes-32.png', 32, 32)
  }

  render () {
    this.state.start('Game')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

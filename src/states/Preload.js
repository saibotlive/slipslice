import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    this.load.tilemap('map', './assets/map/slipslice.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level1', './assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('layout', './assets/map/layout.png')
    this.load.atlas(
      'assets',
      'assets/images/assets.png',
      'assets/images/assets.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    )

    this.load.image('cube', 'assets/map/cube.png')
    this.load.image('tile', 'assets/map/tile.png')
    this.game.load.spritesheet('slopes', 'assets/map/slopes-32.png', 32, 32)
    console.log('pp')
  }

  render () {
    this.state.start('Game')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

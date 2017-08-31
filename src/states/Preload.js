import Phaser from 'phaser'
import config from '../config'
import audioData from '../audio/audioData'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    this.load.tilemap('map', './assets/map/slipslice.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level1', './assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level2', './assets/map/level2.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level3', './assets/map/level3.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level4', './assets/map/level4.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.image('layout', './assets/map/layout.png')
    this.load.atlas(
      'assets',
      'assets/images/gameplay_assets.png',
      'assets/images/gameplay_assets.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    )

    this.load.image('cube', 'assets/map/cube.png')
    this.load.image('tile', 'assets/map/tile.png')
    this.game.load.spritesheet('slopes', 'assets/map/slopes-32.png', 32, 32)
    this.load.atlas(
      'screen_assets',
      'assets/images/screen_assets.png',
      'assets/images/screen_assets.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    )

    this.load.audiosprite(
      'sfx',
      [
        'assets/audio/output.mp3',
        'assets/audio/output.ogg',
        'assets/audio/output.m4a',
        'assets/audio/output.ac3'
      ],
      null,
      audioData
    )
  }

  render () {
    this.state.start('Game')
  }
}

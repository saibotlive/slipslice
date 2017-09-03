import Phaser from 'phaser'
import config from '../config'
import audioData from '../audio/audioData'

export default class extends Phaser.State {
  init () {}

  preload () {
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
    this.load.atlas(
      'party_assets',
      'assets/images/party_assets.png',
      'assets/images/party_assets.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    )

    this.load.image('tile', 'assets/map/tile.png')
    this.load.image('bg', 'assets/images/bg.png')
    this.load.image('pause-bg', 'assets/images/pause-bg.png')
    this.load.image('party-bg', 'assets/images/party-bg.png')
    this.load.image('game-over-bg', 'assets/images/game-over-bg.png')
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
    this.add.image(0, 0, 'preloaderBg')
    /* this.txt = this.game.add.bitmapText(this.game.width / 2, 370, 'municipal', `${0}%`, 30)
    this.txt.anchor.set(0.5, 0)
    this.txt.align = 'center'
    this.txt.tint = 0xff6680 */

    this.txt = this.add.text(this.world.centerX, 370, '', {
      font: '30px Municipal',
      fill: '#ff6680',
      align: 'center'
    })
  }

  loadUpdate () {
    if (this.load.progress < 100) this.txt.text = `${this.load.progress}%`
  }

  render () {
    // this.txt.text = ''
    this.state.start('Start')
    // this.state.start('Game')
    //this.state.start('Party')
    // this.state.start('GameOver')
  }
}

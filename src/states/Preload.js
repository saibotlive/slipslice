import Phaser from 'phaser'
import config from '../config'
import audioData from '../audio/audioData'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.tilemap('level1', './assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level2', './assets/map/level2.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level3', './assets/map/level3.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('level4', './assets/map/level4.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.image('layout', './assets/map/layout.png')
    this.load.image('layout-close', './assets/map/layout-close.png')
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
    this.load.image('objectives-bg', 'assets/images/objectives-bg.png')
    this.load.image('howto1', 'assets/images/howto1.png')
    const key = this.game.device.desktop ? 'howto3' : 'howto2'
    this.load.image(key, `assets/images/${key}.png`)
    this.load.image('difficulty-bg', 'assets/images/difficulty-bg.png')
    this.load.image('ready1', 'assets/images/ready1.png')
    this.load.image('ready2', 'assets/images/ready2.png')
    this.load.image('ready3', 'assets/images/ready3.png')
    this.load.image('ready4', 'assets/images/ready4.png')
    this.load.image('pause-bg', 'assets/images/pause-bg.png')
    this.load.image('party-1', 'assets/images/party-1.png')
    this.load.image('party-2', 'assets/images/party-2.png')
    this.load.image('party-3', 'assets/images/party-3.png')
    this.load.image('party-4', 'assets/images/party-4.png')
    this.load.image('complete-1', 'assets/images/complete-1.png')
    this.load.image('complete-2', 'assets/images/complete-2.png')
    this.load.image('complete-3', 'assets/images/complete-3.png')
    this.load.image('complete-4', 'assets/images/complete-4.png')
    this.load.image('fail-1', 'assets/images/fail-1.png')
    this.load.image('fail-2', 'assets/images/fail-2.png')
    this.load.image('fail-3', 'assets/images/fail-3.png')
    this.load.image('fail-4', 'assets/images/fail-4.png')
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
    // this.state.start('Party')
    // this.state.start('GameOver')
  }
}

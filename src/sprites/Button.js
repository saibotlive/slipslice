import Phaser from 'phaser'

export default class extends Phaser.Button {
  constructor (game, x, y, fn, text, textSize = 36) {
    var oy = y
    super(game, x, oy, 'screen_assets', fn, null, 'button', 'button')
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.txt = this.game.add.text(10, -5, text, {
      font: `${textSize}px Municipal`,
      fill: '#ff6680',
      align: 'center'
    })
    this.onDownSound = this.game.add.audioSprite('sfx')
    this.onDownSoundMarker = 'click'
    this.txt.anchor.set(0.5)
    this.addChild(this.txt)
  }
}

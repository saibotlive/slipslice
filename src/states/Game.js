/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import { FadeIn, FadeOut, createText } from '../utils'
import Player from '../sprites/Player'
import Objects from '../sprites/Objects'
import Enemies from '../sprites/Enemies'
import TempGuage from '../sprites/TempGuage'
import HeatSource from '../sprites/HeatSource'
import PauseMenu from '../sprites/PauseMenu'

export default class extends Phaser.State {
  init () {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.worldWidth = 11364
    this.worldHeight = 1680
    this.offsetHeight = 1696
    this.diff = this.offsetHeight - this.worldHeight
    this.enemies = []
    this.objects = []
    this.cubes = []
    this.finishlines = []
    this.playRate = 150
    this.nextPlay = 0
    this.started = false
    this.cameraPos = new Phaser.Point(0, 0)
    this.camX = 350
    this.camY = -200
    this.lerp = 0.1
    this.score = 0
    config.allTotal = 0
  }
  preload () {}

  create () {
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes)
    this.sfx = this.add.audioSprite('sfx')
    this.sfx.allowMultiple = true
    // this.sfx.onStop.add(this.soundComplete, this)

    this.game.time.advancedTiming = true

    this.map = this.add.tilemap(`level${config.levelCount}`)
    this.map.addTilesetImage('slopes', 'slopes')
    this.world.setBounds(0, 0, this.worldWidth, this.worldHeight)
    this.layers = {}
    this.map.layers.forEach(function (layer) {
      this.layers[layer.name] = this.map.createLayer(layer.name)

      if (layer.properties.collision) {
        // collision layer
        const collisionTiles = []
        layer.data.forEach(function (dataRow) {
          // find tiles used in the layer
          // console.log('datarow', dataRow)
          dataRow.forEach(function (tile) {
            // check if it's a valid tile index and isn't already in the list
            if (tile.index > 0 && collisionTiles.indexOf(tile.index) === -1) {
              collisionTiles.push(tile.index)
            }
          }, this)
        }, this)
        console.log(collisionTiles)
        this.map.setCollision(collisionTiles, true, layer.name)
        this.mapped = config.level[config.levelCount]
        this.game.slopes.convertTilemapLayer(this.layers[layer.name], {
          [this.mapped[0]]: 'FULL',
          [this.mapped[1]]: 'HALF_BOTTOM_RIGHT',
          [this.mapped[2]]: 'HALF_BOTTOM_LEFT'
        })
      }
    }, this)
    const bgObj = this.map.objects['background'][0]

    this.bg = this.add.image(
      bgObj.x,
      bgObj.y - this.offsetHeight,
      config.levelCount > 1 ? 'layout' : 'layout-close'
    )

    const finishlines = this.map.objects['finishline']
    finishlines.forEach(obj => {
      const finishline = this.add.image(obj.x, obj.y - this.diff, 'assets', 'finishline')
      finishline.anchor.set(0, 1)
    })

    const cubes = this.map.objects['cube']
    cubes.forEach(obj => {
      this.cubes.push(new Objects(this.game, obj.x, obj.y - this.diff, 'cube', this.sfx))
    })

    const radiators = this.map.objects['radiator']
    radiators.forEach(obj => {
      this.objects.push(new HeatSource(this.game, obj.x, obj.y - this.diff, 'radiator', this.sfx))
    })

    const bbq = this.map.objects['bbq']
    bbq &&
      bbq.forEach(obj => {
        this.objects.push(new HeatSource(this.game, obj.x, obj.y - this.diff, 'bbq', this.sfx))
      })

    const enemies = this.map.objects['enemies']
    enemies.forEach(obj => {
      this.enemies.push(
        new Enemies(this.game, obj.x, obj.y - this.diff, obj.name, obj.properties.flipped, this.sfx)
      )
    })

    this.hitArea = this.add.graphics(0, 0)
    this.hitArea.beginFill('#ffffff', 0)
    this.hitArea.drawRect(0, 0, this.game.width, this.game.height)
    this.hitArea.endFill()
    this.hitArea.fixedToCamera = true
    this.hitArea.inputEnabled = true

    const playerObj = this.map.objects['player'][0]
    this.player = new Player(this.game, playerObj.x, playerObj.y - this.diff, 'penguin', this.sfx)
    /* this.camY = -200
    this.cameraPos.setTo(
      (this.player.x + this.camX - this.cameraPos.x) * this.lerp,
      (this.player.y + this.camY - this.cameraPos.y) * this.lerp
    ) */
    // this.player.body.velocity.y = -100
    this.game.slopes.enable(this.player)

    // this.game.camera.follow(this.player, null, 0.1, 0.1, this.camX, -200)
    this.header = this.add.image(this.game.width / 2, -20, 'screen_assets', 'header')
    this.header.anchor.set(0.5, 0)
    this.header.fixedToCamera = true

    this.tempguage = new TempGuage(this.game, this.game.width / 2, 20, 'tempguage')
    this.pausebtn = this.add.button(
      this.game.width - 150,
      20,
      'screen_assets',
      this.onPause,
      this,
      'pausebtn',
      'pausebtn'
    )
    this.pausebtn.anchor.set(1, 0)
    this.pausebtn.fixedToCamera = true

    this.cube = this.add.image(this.game.width - 80, 20, 'assets', 'cube')
    this.cube.fixedToCamera = true
    this.cube.anchor.set(1, 0)
    this.cube.scale.set(0.45)

    /* this.scoreTxt = this.game.add.bitmapText(
      this.game.width - 20,
      20,
      'municipal-points',
      `${this.score}`,
      36
    )
    this.scoreTxt.align = 'right'
    this.scoreTxt.anchor.set(1, 0)
    this.scoreTxt.fixedToCamera = true
    this.scoreTxt.tint = 0x194cf3 */
    this.scoreTxt = this.add.text(this.game.width - 20, 20, `${this.score}`, {
      font: '36px Municipal',
      fill: '#194cf3',
      align: 'right'
    })
    this.scoreTxt.anchor.set(1, 0)
    this.scoreTxt.fixedToCamera = true
    this.fpsText = this.game.add.text(50, 50, '', { font: '16px Arial', fill: '#ff0000' })
    this.fpsText.fixedToCamera = true

    this.gameshakers = this.add.image(
      10,
      this.game.height - 10,
      'screen_assets',
      'gameshakers_logo'
    )
    this.gameshakers.anchor.set(0, 1)
    this.gameshakers.fixedToCamera = true

    this.nick = this.add.image(
      this.game.width - 10,
      this.game.height - 10,
      'screen_assets',
      'nick_logo'
    )
    this.nick.anchor.set(1, 1)
    this.nick.fixedToCamera = true

    this.pausebg = new PauseMenu(this.game, 0, 0, 'pause-bg')
    this.ready = this.add.image(0, 0, `ready${config.levelCount}`)
    this.ready.fixedToCamera = true
    this.complete = this.add.image(0, 0, `complete-${config.levelCount}`)
    this.complete.fixedToCamera = true
    this.complete.alpha = 0
    this.complete.visible = false
    this.finalScoreTxt = createText(
      this.game,
      this.game.width / 2,
      148,
      `${config.score}!`,
      62,
      { x: 0, y: 0.5 },
      config.red,
      'left'
    )
    this.complete.addChild(this.finalScoreTxt)
    this.game.time.events.add(config.json.readyTime, this.startGame, this)
  }

  update () {
    this.physics.arcade.collide(this.player, this.layers['collision'], this.collide, null, this)
    this.cameraPos.x += (this.player.x + this.camX - this.cameraPos.x) * this.lerp
    this.cameraPos.y += (this.player.y + this.camY - this.cameraPos.y) * this.lerp

    this.game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y)

    if (this.started) {
      this.physics.arcade.overlap(this.player, this.cubes, this.cubeCollide, null, this)
      this.physics.arcade.collide(this.player, this.objects, this.objectCollide, null, this)
      this.physics.arcade.collide(this.player, this.enemies, this.enemyCollide, null, this)
      if (this.player.x > this.worldWidth - 300) {
        this.tempguage.stop()
        this.sfx.stop('claps')
        config.score = this.score
        if (this.tempguage.currentFrame <= 49) {
          this.started = false
          this.finalScoreTxt.text = config.score
          this.complete.visible = true
          this.add
            .tween(this.complete)
            .to({ alpha: 1}, 500, Phaser.Easing.Linear.None, true)
          this.game.time.events.add(config.json.readyTime, this.endGame, this)
        } else this.state.start('NoParty', FadeOut, FadeIn)
      }
    }

    this.fpsText.setText(this.game.time.fps + ' FPS')
  }

  startGame () {
    this.sfx.play('claps', 0.3)
    this.player.body.velocity.x = this.player.speed
    this.player.body.gravity.y = this.player.gravity
    this.tempguage.timer.start()
    this.add
      .tween(this.ready)
      .to({ alpha: 0, visible: false }, 500, Phaser.Easing.Linear.None, true)
    this.started = true
  }

  endGame () {
    this.state.start('Party', FadeOut, FadeIn)
  }

  onPause () {
    this.pausebg.pauseGame()
  }

  collide (player, obj) {
    const slopeSpeed = player.speed / 10
    if (obj.index === this.mapped[1]) {
      player.onStairs = true
      this.playLoop('upstairs')
      player.body.velocity.x += slopeSpeed
      player.angle = -10
    } else if (obj.index === this.mapped[2]) {
      player.onStairs = true
      this.playLoop('downstairs')
      player.angle = 10
    } else {
      if (player.onStairs) {
        player.angle = 0
        player.body.velocity.x = player.speed
        player.onStairs = false
      }
    }
    player.body.bounce.set(0)
    player.canJump = player.body.touching.down
  }

  playLoop (key) {
    if (this.game.time.now > this.nextPlay) {
      this.nextPlay = this.game.time.now + this.playRate
      this.sfx.play(key)
    }
  }

  cubeCollide (player, obj) {
    this.tempguage.tempDrop(obj.points)
    this.score += obj.points
    this.scoreTxt.text = this.score
    obj.hit()
  }

  objectCollide (player, obj) {
    if (obj.body.touching.up) {
      this.tempguage.tempDrop(obj.points)
      this.score += obj.points
      this.scoreTxt.text = this.score
      player.body.velocity.y = -player.speed * 1.5
      player.body.velocity.x += player.speed / 10
      obj.hit()
    }
  }

  enemyCollide (player, enm) {
    this.sfx.stop('claps')
    this.started = false
    this.player.body.velocity.x = 0
    this.player.animations.play('dizzy')
    this.sfx.play('growl')
    this.tempguage.stop()
    this.game.time.events.add(
      2000,
      () => {
        this.state.start('GameOver', FadeOut, FadeIn)
      },
      this
    )
  }

  addPauseMenu () {}

  render () {
    if (config.json.debug === true) {
      this.game.debug.body(this.player)
      this.enemies.forEach(obj => {
        this.game.debug.body(obj)
      })
      this.objects.forEach(obj => {
        this.game.debug.body(obj)
      })
    }
  }
}

/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Player from '../sprites/Player'
import Objects from '../sprites/Objects'
import Enemies from '../sprites/Enemies'

export default class extends Phaser.State {
  init () {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.worldWidth = 11364
    this.worldHeight = 1680
    this.offsetHeight = 1696
    this.diff = this.offsetHeight - this.worldHeight
    this.enemies = []
    this.objects = []
    this.playRate = 150
    this.nextPlay = 0
    this.started = false
  }
  preload () {}

  create () {
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes)
    this.sfx = this.add.audioSprite('sfx')
    this.sfx.allowMultiple = true
    // this.sfx.onStop.add(this.soundComplete, this)
    this.sfx.play('claps', 0.3)
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
        this.map.setCollision(collisionTiles, true, layer.name)
        console.log('tiles', collisionTiles)
        this.game.slopes.convertTilemapLayer(this.layers[layer.name], {
          14: 'FULL',
          20: 'HALF_BOTTOM_RIGHT',
          19: 'HALF_BOTTOM_LEFT'
        })
      }
    }, this)
    const bgObj = this.map.objects['background'][0]
    this.bg = this.add.image(bgObj.x, bgObj.y - this.offsetHeight, 'layout')

    const cubes = this.map.objects['cube']
    cubes.forEach(obj => {
      this.objects.push(new Objects(this.game, obj.x, obj.y - this.diff, 'cube', this.sfx))
    })

    const radiators = this.map.objects['radiator']
    radiators.forEach(obj => {
      this.objects.push(new Objects(this.game, obj.x, obj.y - this.diff, 'radiator', this.sfx))
    })

    const fire = this.map.objects['fire']
    fire &&
      fire.forEach(obj => {
        this.objects.push(new Objects(this.game, obj.x, obj.y - this.diff, 'fire', this.sfx))
      })

    const enemies = this.map.objects['enemies']
    enemies.forEach(obj => {
      this.enemies.push(
        new Enemies(this.game, obj.x, obj.y - this.diff, obj.name, obj.properties.flipped, this.sfx)
      )
    })

    const playerObj = this.map.objects['player'][0]
    this.player = new Player(this.game, playerObj.x, playerObj.y - this.diff, 'penguin', this.sfx)

    // this.player.body.velocity.y = -100
    this.game.slopes.enable(this.player)
    this.game.camera.follow(this.player)
    this.fpsText = this.game.add.text(50, 50, '', { font: '16px Arial', fill: '#ff0000' })
    this.fpsText.fixedToCamera = true
    this.started = true
  }

  update () {
    this.physics.arcade.collide(this.player, this.layers['collision'], this.collide, null, this)
    if (this.started) {
      this.physics.arcade.overlap(this.player, this.objects, this.objectCollide, null, this)
      this.physics.arcade.collide(this.player, this.enemies, this.enemyCollide, null, this)
      if (config.levelCount < 4) {
        if (this.player.x > this.worldWidth) {
          this.started = false
          config.levelCount++
          this.sfx.stop('claps')
          this.state.start('Game')
        }
      }
    }

    this.fpsText.setText(this.game.time.fps + ' FPS')
  }

  collide (player, obj) {
    if (obj.index === 20) {
      player.onStairs = true
      this.playLoop('upstairs')
      player.body.velocity.x += 20
      player.angle = -10
    } else if (obj.index === 19) {
      player.onStairs = true
      this.playLoop('downstairs')
      player.angle = 10
    } else {
      if (player.onStairs) {
        player.angle = 0
        player.body.velocity.x = config.json.difficulty[config.difficulty].speed
        player.onStairs = false
      }
    }
    player.canJump = player.body.touching.down
  }

  playLoop (key) {
    if (this.game.time.now > this.nextPlay) {
      this.nextPlay = this.game.time.now + this.playRate
      this.sfx.play(key)
    }
  }

  objectCollide (player, obj) {
    obj.hit()
  }

  enemyCollide (player, enm) {
    this.started = false
    this.sfx.stop('claps')
    this.player.body.velocity.x = 0
    this.sfx.play('growl')
    this.game.time.events.add(
      2000,
      () => {
        this.state.start('Game')
      },
      this
    )
  }

  soundComplete (snd) {
    console.log('snd', snd)
  }

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

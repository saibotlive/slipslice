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
  }
  preload () {}

  create () {
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes)
    this.game.time.advancedTiming = true
    this.map = this.add.tilemap('level1')
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
        this.game.slopes.convertTilemapLayer(this.layers[layer.name], {
          6: 'HALF_BOTTOM',
          11: 'HALF_BOTTOM_RIGHT',
          10: 'HALF_BOTTOM_LEFT'
        })
      }
    }, this)
    const bgObj = this.map.objects['background'][0]
    this.bg = this.add.image(bgObj.x, bgObj.y - this.offsetHeight, 'layout')

    const cubes = this.map.objects['cube']
    cubes.forEach(obj => {
      const cb = new Objects(this.game, obj.x, obj.y - this.diff, 'cube')
      this.objects.push(cb)
    })

    const radiators = this.map.objects['radiator']
    radiators.forEach(obj => {
      const cb = new Objects(this.game, obj.x, obj.y - this.diff, 'radiator')
      this.objects.push(cb)
    })

    const yetis = this.map.objects['yeti']
    yetis.forEach(obj => {
      const cb = new Enemies(this.game, obj.x, obj.y - this.diff, 'yeti', obj.properties.flipped)
      this.enemies.push(cb)
    })

    const playerObj = this.map.objects['player'][0]

    this.player = new Player(this.game, playerObj.x, playerObj.y - this.diff, 'penguin')

    // this.player.body.velocity.y = -100
    this.game.slopes.enable(this.player)
    this.game.camera.follow(this.player)
    this.fpsText = this.game.add.text(50, 50, '', { font: '16px Arial', fill: '#ff0000' })
    this.fpsText.fixedToCamera = true
  }

  update () {
    this.physics.arcade.collide(this.player, this.layers['collision'], this.collide)
    this.fpsText.setText(this.game.time.fps + ' FPS')
  }

  collide (player, obj) {
    if (obj.index === 11) {
      player.body.velocity.x += 20
      player.angle = -10
    } else if (obj.index === 10) {
      player.angle = 10
    } else {
      player.angle = 0
      player.body.velocity.x = 400
    }
    player.hit = true
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

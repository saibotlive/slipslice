/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.worldWidth = 11364
    this.worldHeight = 1680
    this.offsetHeight = 1696
    this.diff = this.offsetHeight - this.worldHeight
  }
  preload () {}

  create () {
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes)
    const map = this.add.tilemap('map')
    map.addTilesetImage('slopes', 'slopes')
    this.world.setBounds(0, 0, this.worldWidth, this.worldHeight)
    this.layers = {}
    map.layers.forEach(function (layer) {
      this.layers[layer.name] = map.createLayer(layer.name)
      // this.game.slopes.convertTilemapLayer(this.layers[layer.name], 'arcadeslopes')
      // this.layers[layer.name].fixedToCamera = false
      // console.log(this.layers[layer.name].height)
      if (layer.properties.collision) {
        // collision layer
        const collisionTiles = []
        console.log('layers', layer)
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
        console.log('coll', collisionTiles, layer.name)
        map.setCollision(collisionTiles, true, layer.name)
        this.game.slopes.convertTilemapLayer(this.layers[layer.name], {
          6: 'HALF_BOTTOM',
          11: 'HALF_BOTTOM_RIGHT',
          10: 'HALF_BOTTOM_LEFT'
        })
      }
    }, this)
    const bgObj = map.objects['background'][0]
    this.bg = this.add.image(bgObj.x, bgObj.y - this.offsetHeight, 'layout')

    const cubes = map.objects['cubes']

    cubes.forEach(cube => {
      const cb = this.add.image(cube.x, cube.y - this.diff, 'cube')
      cb.anchor.set(0, 1)
    })
    this.player = this.add.sprite(0, this.worldHeight - 300, 'penguin')
    this.player.anchor.set(0, 0)

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
    this.player.body.gravity.y = 1000
    this.player.body.velocity.x = 400
    this.player.hit = false
    // this.player.body.velocity.y = -100
    this.game.slopes.enable(this.player)
    this.game.camera.follow(this.player)

    /* map.objects.forEach(object => {
      8console.log('object', object)
    }) */

    /* let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom) */
  }

  update () {
    this.physics.arcade.collide(this.player, this.layers['collision'], this.collide)
    // console.log(this.game.camera.x)
    /* this.bg.tilePosition.x = -this.game.camera.x
    this.bg.tilePosition.y = -this.game.camera.y */
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
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}

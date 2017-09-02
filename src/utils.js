import Phaser from 'phaser'
export const centerGameObjects = objects => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}
console.log('d', Phaser)
export const FadeIn = {
  intro: true,
  props: {
    alpha: 0
  }
}

export const FadeOut = {
  intro: true,
  props: {
    alpha: 1
  }
}

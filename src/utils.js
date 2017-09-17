import Phaser from 'phaser'
export const centerGameObjects = objects => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}
export const FadeIn = {
  intro: true,
  duration: 300,
  props: {
    alpha: 0
  }
}

export const FadeOut = {
  intro: true,
  duration: 300,
  props: {
    alpha: 1
  }
}

export const createText = (game, x, y, body, size, anchor, fill, align, stroke, shadow) => {
  const txt = game.add.text(x, y, body, {
    font: `${size}px Municipal`,
    fill,
    stroke: stroke && stroke.fill,
    strokeThickness: stroke && stroke.width,
    align
  })
  txt.anchor.set(anchor && anchor.x, anchor && anchor.y)
  if (shadow) txt.setShadow(shadow && shadow.x, shadow && shadow.y, shadow && shadow.fill)
  return txt
}

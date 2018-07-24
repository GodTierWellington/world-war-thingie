//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js

function setup() {

  var width = 800
  var height = 600



  createCanvas (width, height)
  var img = loadImage("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ahmed.jpg")

  console.log (img.width)

  background(230, 230, 230)

  pasha = createSprite (0,0,100,100)
  pasha.addImage (img)

}

function tick(){

}

function draw() {
  tick()
  drawSprites();
}

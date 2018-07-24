//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js

function setup() {

  var width = 800
  var height = 600



  createCanvas (width, height)
  var img = loadImage("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/ahmed.jpg")

  background (230, 230, 230)
  // Displays the image at its actual size at point (0,0)
  image (img, 0, 0);

  drawTitle ()

}

function drawTitle () {
  textSize (40)
  stroke (255,0,0)
  textAlign (RIGHT)
  text("Triangle", width/2, 40)
}

function tick(){

}

function draw() {
  tick()
  drawSprites();
}

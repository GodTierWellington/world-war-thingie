//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js
currentLevel = 0

displayUI = true

function setup() {

  var w = 1200
  var h = 768


  createCanvas (w, h)
  loadAssets()
  //background (230, 230, 230)
  // Displays the image at its actual size at point (0,0)

  drawLevel(0)


}

function drawLevel(lvl){
  switch(lvl){
    case 0:
      image(tower0, 0, 0, width, height)
      break;
    case 1:
      image(tower1, 0, 0, width, height)
      break;
    default:
      console.log("Unkown level");
  }
}

function tick(){

}

function displayWaifu (img, position) {

  var x

  if (position == "CENTER") {
    x = width/2
  } else if (position == "LEFT") {
    x = width/4
  } else if (position == "RIGHT") {
    x = width*3/4
  } else {
    console.log ("ERROR: Please use CENTER, LEFT, or RIGHT")
    return (0)
  }
  image (img, x - img.width/2, height - img.height)
}

function displayBackground (bkg) {
  image (bkg, 0, 0)
}

function speak (colour, name, words) {

  image (textBox, width/2 - width*9/20, height - textBox.height, width*9/10, textBox.height)


  strokeWeight (5)
  textAlign (LEFT)

  textSize (30)
  stroke (0, 0, 0)
  fill (colour[0], colour[1], colour[2])
  text (name, width/10, height*8/10)

  strokeWeight (3)
  textSize (20)
  fill (255, 255, 255)
  text (words, width/8, height*6/7)
}

function keyPressed () {
  if (keyCode == 32) {
    displayUI = !displayUI
  }
}

function draw() {
  tick()
  drawLevel(currentLevel)
  story()
}

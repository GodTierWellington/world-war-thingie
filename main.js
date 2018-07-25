//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js
currentLevel = 0

displayUI = true
leftDown = false
rightDown = false

function setup () {

  var w = 1200
  var h = 768


  createCanvas (w, h)
  loadAssets()
  // Displays the image at its actual size at point (0,0)

  drawLevel(0)


}

function drawLevel (lvl){
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

function tick (){

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

function displayButton () {
  image (button_ui, width/2 - button_ui.width/2, height/2 - button_ui.height/2)
}

function speak (colour, name, words) {

  if (displayUI == true) {
    image (textbox_ui, width/2 - textbox_ui.width/2, height - textbox_ui.height)
    displayButton ()

    textFont('Georgia')
    stroke (0, 0, 0)

    textAlign (CENTER)
    strokeWeight (5)
    textSize (35)
    fill (colour[0], colour[1], colour[2])
    text (name, width/2 - textbox_ui.width/3, height - textbox_ui.height*5/6 + 15)

    textAlign (LEFT)
    strokeWeight (4)
    textSize (30)
    fill (255, 255, 255)
    text (words, width/8, height - textbox_ui.height/2 + 15)
  }
}

function keyPressed () {
  if (keyCode == 32) {
    displayUI = !displayUI
  }
  if (keyCode == 37) {
    leftDown = true
  }
  if (keyCode == 39) {
    rightDown = true
  }
}

function draw () {
  tick()
  drawLevel(currentLevel)
  story()

  //console.log (eventIndex)
}

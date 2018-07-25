//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js
currentLevel = 0

displayUI = true
mouseDown = false
leftDown = false
rightDown = false

function setup () {

  var w = 1200
  var h = 768


  background (255, 255, 255)
  createCanvas (w, h)
  loadAssets()
  // Displays the image at its actual size at point (0,0)

  drawLevel(0)


}

function mouseCollisionDetection (object) {

  object.forEach (function (obj) {
    if (mouseX >= obj.posX && mouseX <= obj.posX+obj.width && mouseY >= obj.posY && mouseY <= obj.posY+obj.height) {
      eval (obj.action)
    }
  })
}


function mousePressed () {
  mouseDown = true
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

function displayButton (words, posX, posY, action) {
  
  this.posX = width/2 - button_ui.width/2 + posX
  this.posY = height/2 - button_ui.height/2 - posY
  this.width = button_ui.width
  this.height = button_ui.height
  this.action = action

  //make it turn a different colour when pressed and add this code to the "action" string so that it turns a different colour when clicked

  image (button_ui, width/2 - button_ui.width/2 + posX, height/2 - button_ui.height/2 - posY)

  textFont('Georgia')
  stroke (0, 0, 0)
  textAlign (CENTER)
  strokeWeight (4)
  textSize (30)
  fill (255, 255, 255)
  text (words, width/2 + posX, height/2 + 10 - posY)
}



function speak (colour, name, words) {

  if (displayUI == true) {

    image (textbox_ui, width/2 - textbox_ui.width/2, height - textbox_ui.height)

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

    makeChoice ([["Click this!", "console.log ('I have been clicked!')"]])
  }
}

//options is an array that contains a string and then an eval statement
function makeChoice (options) {

  for (i = 0; i < options.length; i++) {
    b1 = new displayButton (options[i][0], 0, (button_ui.height+30)*(options.length/2-0.5-i), options[i][1])
    //console.log (b1.posX + ", " + b1.posY)
    //console.log (mouseX + ", " + mouseY)
    if (mouseDown) {
      mouseCollisionDetection ([b1])
      mouseDown = false
    }
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

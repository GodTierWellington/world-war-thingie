//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js
currentLevel = 0

displayUI = true
mouseClick = false
leftDown = false
rightDown = false
upDown = false
downDown = false

scene = "map"

function setup () {

  var w = 1200
  var h = 768

  loadAssets ()
  createCanvas (w, h)
  background ('white')
  drawLevel(0)
}

function draw () {
  battleMode (5000)
  //setScene ()
}

function setScene () {
  if (scene == "map") {
    mapMode ()
  } else {
    //event
    eval (scene)
  }
}



function mouseCollisionDetection (object) {
  //this array meme is pretty unneeded to be honest!
  object.forEach (function (obj) {
    if (obj.type.startsWith ('b')) {
      if (mouseX >= obj.posX && mouseX <= obj.posX+obj.width && mouseY >= obj.posY && mouseY <= obj.posY+obj.height) {
        if (mouseClick) {
          clicked = new displayButton (obj.words, obj.posX_, obj.posY_, obj.type+"_c", obj.action)
          eval (obj.action)
          console.log (choices)
          mouseClick = false
        } else {
          button_selected = new displayButton (obj.words, obj.posX_, obj.posY_, obj.type+"_s", obj.action)
        }
      }
    } else if (obj.type.startsWith ('i')) {
      if (Math.sqrt(Math.pow(mouseX-(obj.posX+obj.radius), 2) + Math.pow(mouseY-(obj.posY+obj.radius), 2)) <= obj.radius) {
        if (mouseClick) {
          displayElement (obj, 'c')
          eval (obj.action)
          mouseClick = false
        } else {
          displayElement (obj, 's')
        }
      }
    }
  })
}



function mousePressed () {
  mouseClick = true
}

function mouseReleased () {
  mouseClick = false
}

function keyPressed () {
  if (keyCode == 32) {
    displayUI = !displayUI
  }
  if (keyCode == 37) {
    leftDown = true
  } else if (keyCode == 39) {
    rightDown = true
  }
  if (keyCode == 38) {
    upDown = true
  } else if (keyCode == 40) {
    downDown = true
  }
}

function keyReleased () {
  if (keyCode == 37) {
    leftDown = false
  } else if (keyCode == 39) {
    rightDown = false
  }
  if (keyCode == 38) {
    upDown = false
  } else if (keyCode == 40) {
    downDown = false
  }
}



function drawLevel (lvl) {
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

function displayButton (words, posX, posY, type, action) {

  this.posX_ = posX
  this.posY_ = posY
  this.posX = width/2 - button_ui.width/2 + posX
  this.posY = height/2 - button_ui.height/2 - posY
  this.width = button_ui.width
  this.height = button_ui.height
  this.action = action
  this.words = words
  this.type = type

  if (type == "b") {
    img = button_ui
  } else if (type == "b_s") {
    img = button_ui_s
  } else if (type == "b_c") {
    img = button_ui_c
  }

  image (img, width/2-img.width/2+posX, height/2-img.height/2-posY)

  textFont('Georgia')
  stroke (0, 0, 0)
  textAlign (CENTER)
  strokeWeight (4)
  textSize (30)
  fill (255, 255, 255)
  text (words, width/2 + posX, height/2 + 10 - posY)
}
//maybe change?


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
  }
}
//options [words on button, next event]
function makeChoice (options, currentEvent) {
  if (displayUI == true) {
    for (i = 0; i < options.length; i++) {
      _action = "eventIndex = " + options[i][1] + "\n choices.push([" + currentEvent + "," + options[i][1] + "])"
      button = new displayButton (options[i][0], 0, (button_ui.height+30)*(options.length/2-0.5-i), 'b', _action)
      mouseCollisionDetection ([button])
    }
  }
}

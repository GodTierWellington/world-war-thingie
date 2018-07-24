//http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite2.js

currentLevel = 0

colourArray = [[0, 0, 0], [255, 255, 255]]

function setup() {

  var w = 800
  var h = 600


  createCanvas (w, h)
  loadAssets()
  //background (230, 230, 230)
  // Displays the image at its actual size at point (0,0)

  drawLevel(0)


}

function loadAssets(){
  //images
  pasha = loadImage ("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/pasha.jpg")
  tower0 = loadImage("https://raw.githubusercontent.com/GodTierWellington/world-war-waifu/master/assets/level0.png")
}

function drawLevel(lvl){
  switch(lvl){
    case 0:
      image(tower0, 0, 0, width, height)
      break;
    default:
      console.log("Unkown level");
  }
}

function drawTitle () {
  textSize (40)
  stroke (255,0,0)
  textAlign (RIGHT)
  text("Triangle", width/2, 40)
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

function speak (colour, words) {

  textSize (20)
  strokeWeight (2)
  stroke (0, 0, 0)
  fill (colour[0], colour[1], colour[2])
  textAlign (RIGHT)
  text (words, width/2, height)
}

function draw() {
  tick()
  background (200, 200, 200)
  drawLevel(currentLevel)
  displayWaifu (pasha, "RIGHT")
  speak (colourArray[0], "I like to eat big kebab I like to eat big kebab" +
  "I like to eat big kebab I like to eat big kebab" +
  "I like to eat big kebab I like to eat big kebab" +
  "I like to eat big kebab I like to eat big kebab")

  drawTitle ()
}

mapMovementSpeed = 20
mapPosX = 3000
mapPosY = 300

function loadMapElements () {
  elementList = [new mapElement (ussr_i, 4000, 500, "i", "console.log ('Yeet')")]
}

function drawMap (elementList) {
  image (map, -mapPosX, -mapPosY)
  drawElements ()
}

function drawElements () {
  elementList.forEach (function (element) {
    element.posX = element.posX_ - mapPosX
    element.posY = element.posY_ - mapPosY
    image (element.img, element.posX, element.posY)
    mouseCollisionDetection ([element])
  })
}

function moveAroundMap () {

  if (leftDown && mapPosX > 0) {
    mapPosX -= mapMovementSpeed
  } else if (rightDown && mapPosX < map.width - width) {
    mapPosX += mapMovementSpeed
  }
  if (upDown && mapPosY > 0) {
    mapPosY -= mapMovementSpeed
  } else if (downDown && mapPosY < map.height - height - 100) {
    mapPosY += mapMovementSpeed
  }

  drawMap ()
}

function mapElement (img, posX, posY, type, action) {
  this.img = img
  this.posX_ = posX
  this.posY_ = posY
  this.posX = posX
  this.posY = posY
  this.action = action
  this.type = type
  this.radius = img.width/2
}

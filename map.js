mapMovementSpeed = 5
mapPosX = 0
mapPosY = 0

function drawMap (elementList) {
  image (map, mapPosX, mapPosY)
  drawElements ()
}

function drawElements () {
  elementList.forEach (function (element) {
    image (element.img, element.posX + mapPosX, element.posY + mapPosY)
  })
}

function moveAroundMap () {

  if (leftDown ) {
    mapPosX -= mapMovementSpeed
  } else if (rightDown) {
    mapPosX += mapMovementSpeed
  }
  if (upDown) {
    mapPosY -= mapMovementSpeed
  } else if (downDown) {
    mapPosY += mapMovementSpeed
  }

  drawMap ()
}

function mapElement (img, posX, posY) {
  this.img = img
  this.posX = posX
  this.posY = posY
}

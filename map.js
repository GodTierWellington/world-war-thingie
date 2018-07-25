mapMovementSpeed = 5
mapPosX = 0
mapPosY = 0

function drawMap () {
  image (map, mapPosX, mapPosY)
}

function moveAroundMap () {

  if (leftDown) {
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

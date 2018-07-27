battleMovementSpeed = 20
battlePosX = 0

function battleMode (sizeOfField) {

  if (leftDown && battlePosX > 0) {
    battlePosX -= battleMovementSpeed
  } else if (rightDown && battlePosX < sizeOfField - width) {
    battlePosX += battleMovementSpeed
  }

  drawBattleField (sizeOfField)
}

function loadBattleElements () {
  light_tank = new TankClass (3, "light")
  t = undefined
}

function TankClass (movementSpeed, name) {
  this.movementSpeed = movementSpeed
  this.name = name
}

function tank (faction, type, posX, posY, side) {
  this.faction = faction
  this.type = type
  this.posX = posX
  this.posY = posY+height - grass_texture.height - sov_light.height
  this.posX_ = posX
  this.posY_ = posY
  this.side = side
  this.move = function () {
    this.posX_ += this.type.movementSpeed
  }
  this.display = function () {
    this.posX = this.posX_ - battlePosX
    this.posY = this.posY_ + height - grass_texture.height - sov_light.height
    img = eval(this.faction+"_"+this.type.name)
    if (this.side == "r") {
      img = img.r
    }
    image (img, this.posX, this.posY)
  }
}

function drawBattleField (sizeOfField) {

  background (230, 230, 255)
  for (i = 0; i < Math.ceil(sizeOfField/grass_texture.width); i++) {
    image (grass_texture, i*grass_texture.width-battlePosX, height-grass_texture.height)
  }

  button = new displayButton ("button!", 0, 0, 'sb', "t = new tank ('sov', light_tank, -300, 0, 'r')")
  if (t != undefined) {
    t.display()
    t.move()
  }
  mouseCollisionDetection ([button])
}

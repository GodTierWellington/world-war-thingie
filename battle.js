battleMovementSpeed = 20
battlePosX = 0
fieldLength = 0
ally = ""
enemy = ""
canCreateAlly = false
canCreateEnemy = false

function battleMode (sizeOfField, _ally, _enemy) {

  fieldLength = sizeOfField
  ally = _ally
  enemy = _enemy

  if (leftDown && battlePosX > 0) {
    battlePosX -= battleMovementSpeed
  } else if (rightDown && battlePosX < fieldLength - width) {
    battlePosX += battleMovementSpeed
  }
  drawBattleField ()
}

function loadBattleElements () {
  light_tank = new TankClass (3, "light")
  allyTanks = []
  enemyTanks = []
  allyTanksOnHold = []
  enemyTanksOnHold = []
}


function TankClass (movementSpeed, name) {
  this.movementSpeed = movementSpeed
  this.name = name
}

function Tank (faction, type, posX, posY, side) {
  this.faction = faction
  this.type = type
  this.posX = posX
  this.posY = posY+height - grass_texture.height - sov_light.height
  this.posX_ = posX
  this.posY_ = posY
  this.side = side
  this.move = function () {
    if (this.side == "r") {
      this.posX_ += this.type.movementSpeed
    } else if (this.side == "l") {
      this.posX_ -= this.type.movementSpeed
    }
  }
  this.display = function () {
    f = 1
    img = eval(this.faction+"_"+this.type.name)
    this.posX = this.posX_ - battlePosX
    this.posY = this.posY_ + height - grass_texture.height - img.height
    if (this.side == "r") {
      img = img.r
    } else if (this.side == "l") {
      f = -1
    }
    image (img, this.posX, this.posY, img.width*f, img.height)
  }
}



function createTank (side, type) {

  if (side == "ally") {
    if (allyTanks.length == 0 || canCreateAlly) {
      console.log ("Creating: " + ally + "_" + type.name)
      allyTanks.push (new Tank (ally, type, -300, 0, 'r'))
    } else if (!canCreateAlly) {
      allyTanksOnHold.push (type)
    }
  } else if (side == "enemy") {
    if (enemyTanks.length == 0 || canCreateEnemy) {
      console.log ("Creating: " + enemy + "_" + type.name)
      enemyTanks.push (new Tank (enemy, type, fieldLength+300, 0, 'l'))
    } else if (!canCreateEnemy) {
      enemyTanksOnHold.push (type)
    } else {
      console.log ("error")
    }
  } else {
    console.log ("error")
  }
}

function moveTanks () {

  allyTanks.forEach (function (tank) {
    tank.display ()
    tank.move ()
    if (tank.posX_> fieldLength+300) {
      allyTanks.splice (tank, 1)
    }
  })
  enemyTanks.forEach (function (tank) {
    tank.display ()
    tank.move ()
    if (tank.posX_<-300) {
      enemyTanks.splice (tank, 1)
    }
  })

  if (allyTanks.length == 0 || allyTanks[allyTanks.length-1].posX_ >= 0) {
    canCreateAlly = true
  } else {
    canCreateAlly = false
  }

  allyTanksOnHold.forEach (function (tankType) {
    if (canCreateAlly) {
      createTank ("ally", tankType)
      allyTanksOnHold.splice (tankType, 1)
      canCreateAlly = false
    }
  })

  if (enemyTanks.length == 0 || enemyTanks[enemyTanks.length-1].posX_ <= fieldLength) {
    canCreateEnemy = true
  } else {
    canCreateEnemy = false
  }

  enemyTanksOnHold.forEach (function (tankType) {
    if (canCreateEnemy) {
      createTank ("enemy", tankType)
      enemyTanksOnHold.splice (tankType, 1)
      canCreateEnemy = false
    }
  })
}



function drawBattleField () {

  background (230, 230, 255)
  for (i = 0; i < Math.ceil(fieldLength/grass_texture.width); i++) {
    image (grass_texture, i*grass_texture.width-battlePosX, height-grass_texture.height)
  }

  button1 = new displayButton ("Light Tank", -450, 300, 'sb', "createTank ('ally', light_tank)")
  button2 = new displayButton ("Light Tank", 450, 300, 'sb', "createTank ('enemy', light_tank)")
  mouseCollisionDetection ([button1, button2])
  moveTanks ()
}

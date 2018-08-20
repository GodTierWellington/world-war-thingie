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
  //Reminder that the "name" parameter must be what is declared in "assets.js"
  sov_light_tank = new TankClass (3, "light", 5, 15, 20)
  ger_light_tank = new TankClass (5, "light", 7, 15, 22)

  allyTanks = []
  enemyTanks = []
  allyTanksOnHold = []
  enemyTanksOnHold = []
  rounds = []
}


function TankClass (movementSpeed, name, reloadTime, roundSpeed, health) {

  this.movementSpeed = movementSpeed
  this.name = name
  this.reloadTime = reloadTime*1000
  this.roundSpeed = roundSpeed
  this.health = health
}
//we need to have cool stuff happen!
function Round (faction, posX, posY, speed, groundPosY) {

  this.faction = faction
  this.groundPosY = groundPosY
  this.posX = posX
  this.posY = height - grass_texture.height - posY
  this.posX_ = posX
  this.posY_ = posY
  this.speed = speed
  this.gravity = 0

  this.move = function () {
    if (this.faction == ally) {
      this.posX_ += this.speed
      this.posY_ -= this.gravity
      this.gravity += this.speed/1000
      for (i = 0; i < enemyTanks.length; i++) {
        //Only works if tanks can't turn around
        if (Math.abs(this.posX_-(enemyTanks[i].posX_-enemyTanks[i].img.width/2)) <= enemyTanks[i].img.width/2
            && this.posY_ <= enemyTanks[i].posY_+enemyTanks[i].img.height) {
          //Damage stats
          damage = Math.floor(Math.random()*this.speed+1)
          //The p means piercing, so perhaps we can have explosive damage that
          //does stuff and then maybe fire damage that continues even after the initial hit
          typeName = enemyTanks[i].type.name.charAt(0).toUpperCase() + enemyTanks[i].type.name.slice(1)
          console.log ("Enemy " + typeName + " Hit For: " + damage + "p")
          enemyTanks[i].health -= damage
          console.log ("New Enemy Health: " + enemyTanks[i].health)
          rounds.splice (this, 1)
          return
        }
      }
    } else if (this.faction == enemy) {
      this.posX_ -= this.speed
      this.posY_ -= this.gravity
      this.gravity += this.speed/1000
      for (i = 0; i < allyTanks.length; i++) {
        //Only works if tanks can't turn around
        if (Math.abs(this.posX_-(allyTanks[i].posX_+allyTanks[i].img.width/2)) <= allyTanks[i].img.width/2
            && this.posY_ <= allyTanks[i].posY_+allyTanks[i].img.height) {
          //Damage stats
          damage = Math.floor(Math.random()*this.speed+1)
          allyTanks[i].health -= damage
          rounds.splice (this, 1)
          return
        }
      }
    }
  }

  this.display = function () {
    f = 1
    if (this.faction == enemy) {
      f = -1
    }
    this.move ()
    this.posX = this.posX_ - battlePosX
    this.posY = -this.posY_ + height - grass_texture.height
    if (this.posX >= -15 && this.posX <= width+15) {
      image (bullet, this.posX, this.posY, bullet.width*f)
    }
  }
}
//we need them to move along the y-axis
function Tank (faction, type, posX, posY) {

  this.faction = faction
  this.type = type
  this.posX = posX
  this.posY = height - grass_texture.height - posY
  this.posX_ = posX
  this.posY_ = posY
  this.reload = false
  this.fire = true
  this.img = eval(this.faction+"_"+this.type.name)
  this.health = this.type.health

  this.move = function () {
    if (this.faction == ally) {
      this.posX_ += this.type.movementSpeed
    } else if (this.faction == enemy) {
      this.posX_ -= this.type.movementSpeed
    }
  }

  this.combat = function (img, f) {
    if (this.fire) {
      rounds.push(new Round (this.faction, this.posX_+img.barrelPosX*f, this.posY_+img.barrelPosY, this.type.roundSpeed, this.posY_))
      this.reload = true
      this.fire = false
    }
  }

  this.display = function () {

    f = 1
    this.posX = this.posX_ - battlePosX
    this.posY = -this.posY_ + height - grass_texture.height

    //Allied Tanks
    if (this.faction == ally) {
      //Check if dead
      if (this.health <= 0) {
        typeName = this.type.name.charAt(0).toUpperCase() + this.type.name.slice(1)
        console.log ("Ally " + typeName + " Destroyed!")
        allyTanks.splice (this, 1)
        return
      }

      //Else move
      _img = this.img.r
      if (enemyTanks.length == 0) {
        this.move()
      } else {
        for (i = 0; i < enemyTanks.length; i++) {
          if (Math.abs(enemyTanks[i].posX_ - this.posX_) < 1000) {
            this.combat(this.img, f)
            break
          } else {
            this.move()
            break
          }
        }
      }
    //Enemy Tanks
    } else if (this.faction == enemy) {
      //Check if dead
      if (this.health <= 0) {
        typeName = this.type.name.charAt(0).toUpperCase() + this.type.name.slice(1)
        console.log ("Enemy " + typeName + " Destroyed!")
        enemyTanks.splice (this, 1)
        return
      }

      //Else move
      f = -1
      _img = this.img
      if (allyTanks.length == 0) {
        this.move()
      } else {
        for (i = 0; i < allyTanks.length; i++) {
          if (Math.abs(allyTanks[i].posX_ - this.posX_) < 1000) {
            this.combat(this.img, f)
             break
          } else {
            this.move()
            break
          }
        }
      }
    }

    //Display Tank
    if (this.posX >= -this.img.width && this.posX <= width+this.img.width) {
      image (_img, this.posX, this.posY, this.img.width*f, -this.img.height)
    }
  }
}


function createTank (faction, type) {

  if (faction == "ally") {
    if (allyTanks.length == 0 || canCreateAlly) {
      console.log ("Creating: " + ally + "_" + type.name)
      allyTanks.push (new Tank (ally, type, -300, 0))
    } else if (!canCreateAlly) {
      allyTanksOnHold.push (type)
    }
  } else if (faction == "enemy") {
    if (enemyTanks.length == 0 || canCreateEnemy) {
      console.log ("Creating: " + enemy + "_" + type.name)
      enemyTanks.push (new Tank (enemy, type, fieldLength+300, 0))
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

  rounds.forEach (function (round) {

    round.display()

    if (round.posY_ <= round.groundPosY) {
      rounds.splice (round, 1)
    }
  })
  allyTanks.forEach (function (tank) {

    tank.display ()

    if (tank.reload) {
      tank.reload = false
      setTimeout (function () {
        tank.fire = true
      }, tank.type.reloadTime)
    }

    if (tank.posX_> fieldLength+300) {
      allyTanks.splice (tank, 1)
    }
  })
  enemyTanks.forEach (function (tank) {

    tank.display ()

    if (tank.reload) {
      tank.reload = false
      setTimeout (function () {
        tank.fire = true
      }, tank.type.reloadTime)
    }

    if (tank.posX_<-300) {
      enemyTanks.splice (tank, 1)
    }
  })

  createTanksOnHold ()
}

function createTanksOnHold () {

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
  for (j = 0; j < 4; j++) {
    for (i = 0; i < Math.ceil(fieldLength/grass_texture.width); i++) {
      if (i*grass_texture.width-battlePosX >= -grass_texture.width && i*grass_texture.width-battlePosX <= width) {
        image (grass_texture, i*grass_texture.width-battlePosX, height-grass_texture.height*(j+1))
      }
    }
  }

  button1 = new displayButton ("Light Tank", -450, 300, 'sb', "createTank ('ally', sov_light_tank)")
  button2 = new displayButton ("Light Tank", 450, 300, 'sb', "createTank ('enemy', ger_light_tank)")
  mouseCollisionDetection ([button1, button2])
  moveTanks ()
}

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
  sov_light_tank = new TankClass (3, "light", 5, 15, 5, 1, 13, 20)
  ger_light_tank = new TankClass (5, "light", 7, 15, 5, 4, 10, 22)

  allyTanks = []
  enemyTanks = []
  allyTanksOnHold = []
  enemyTanksOnHold = []
  rounds = []
}


function calculateDamage (_medDamage, _maxDamage, _minDamage) {
  rand = Math.random();
  if (rand >= 0.5) {
    return (Math.floor(Math.pow((rand-0.5)/(0.5), 3) * (_maxDamage - _medDamage) + _medDamage))
  } else {
    return (Math.floor(Math.pow((rand-0.5)/(-0.5), 3) * (_minDamage - _medDamage) + _medDamage))
  }
}

function organizeByHeight (tanks) {
  partition = Math.floor(tanks.length/2)
  lower = []
  higher = []
  for (i = 0; i < tanks.length; i++) {
    if (tanks[i].posY_ > partition.posY_) {
      higher.push(tanks[i])
    } else {
      lower.push(tanks[i])
    }
  }
  for (i = 0; i < lower.length; i++) {
    if (i != 0) {
      currPos = i
      for (j = i; j >= 0; j--) {
        if (lower[currPos].posY_  > lower[j].posY_ ) {
          tH = lower[currPos]
          tL = lower[j]
          lower[j] = tH
          lower[currPos] = tL
          currPos = j
        }
      }
    }
  }
  for (i = 0; i < higher.length; i++) {
    if (i != 0) {
      currPos = i
      for (j = i; j >= 0; j--) {
        if (higher[currPos].posY_  > higher[j].posY_ ) {
          tH = higher[currPos]
          tL = higher[j]
          higher[j] = tH
          higher[currPos] = tL
          currPos = j
        }
      }
    }
  }
  return higher.concat(lower)
}



function TankClass (movementSpeed, name, reloadTime, roundSpeed, medDamage, maxDamage, minDamage, health) {

  this.movementSpeed = movementSpeed
  this.name = name
  this.reloadTime = reloadTime*1000
  this.roundSpeed = roundSpeed
  this.medDamage = medDamage
  this.minDamage = minDamage
  this.maxDamage = maxDamage
  this.health = health
}
//we need to have cool stuff happen!
function Round (tank, posX, posY, groundPosY) {

  this.tank = tank
  this.faction = tank.faction
  this.groundPosY = groundPosY
  this.posX = posX
  this.posY = height - posY
  this.posX_ = posX
  this.posY_ = posY
  this.speed = tank.roundSpeed
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
          damage = calculateDamage(this.tank.medDamage, this.tank.maxDamage, this.tank.minDamage)
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
          damage = calculateDamage(this.tank.medDamage, this.tank.maxDamage, this.tank.minDamage)
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
    this.posY = height - this.posY_
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
  this.posY = height - posY
  this.posX_ = posX
  this.posY_ = posY
  this.reload = false
  this.fire = true
  this.img = eval(this.faction+"_"+type.name)

  this.movementSpeed = type.movementSpeed
  this.reloadTime = type.reloadTime
  this.roundSpeed = type.roundSpeed
  this.medDamage = type.medDamage
  this.maxDamage = type.maxDamage
  this.minDamage = type.minDamage
  this.health = type.health

  this.target = null

  //the allyRight should be like if there is a tank in front of the tank which includes both x and y cords
  //so like the tank in front is taking up a block of space
  //the allyup should be like if a tank is literally directly above
  targetDown = false
  targetRight = false
  targetUp = false
  targetLeft = false
  allyDown = false
  allyRight = false
  allyUp = false
  allyLeft = false


  this.moveX = function () {
    if (this.faction == ally) {
      this.posX_ += this.movementSpeed
    } else if (this.faction == enemy) {
      this.posX_ -= this.movementSpeed
    }
  }

  this.moveY = function () {
    this.posY_ += this.movementSpeed
  }

  this.getTarget = function () {
    if (this.target == null) {
      if (this.faction == ally) {
        for (i = 0; i < enemyTanks.length; i++) {
          if (this.target == null || Math.abs(this.posX_ - enemyTanks[i].posX_) < Math.abs(this.posX_ - this.target.posX_)) {
            this.target = enemyTanks[i]
          }
        }
      }
      if (this.faction == enemy) {
        for (i = 0; i < allyTanks.length; i++) {
          if (this.target == null || Math.abs(this.posX_ - allyTanks[i].posX_) < Math.abs(this.posX_ - this.target.posX_)) {
            this.target = allyTanks[i]
          }
        }
      }
    }
  }

  this.attack = function () {
    if (this.faction == ally) {
      for (i = 0; i < allyTanks.length; i++) {
        if (allyTanks[i] == this) {
          continue
        }
        if (allyTanks[i].posX_ - this.posX_ - this.img.width < 100
          && allyTanks[i].posX_ - this.posX_ - this.img.width > 0) {
          allyRight = true
        } else if (allyTanks[i].posX_ + allyTanks[i].img.width - this.posX_ > -100
          && allyTanks[i].posX_ + allyTanks[i].img.width - this.posX_ < 0) {
          allyLeft = true
        }
        if (allyTanks[i].posY_ - this.posY_ < 40
          && allyTanks[i].posY_ - this.posY_ > 0
          && Math.abs(allyTanks[i].posX_ - this.posX_) < 100 + this.img.width) {
          allyUp = true
        } else if (allyTanks[i].posY_ - this.posY_ > -40
          && allyTanks[i].posY_ - this.posY_ <= 0
          && Math.abs(allyTanks[i].posX_ - this.posX_) < 100 + this.img.width) {
          allyDown = true
        }
      }
    } else if (this.faction == enemy) {
      for (i = 0; i < enemyTanks.length; i++) {
        if (enemyTanks[i] == this) {
          continue
        }
        if (enemyTanks[i].posX_ - this.posX_ - this.img.width < 100
          && enemyTanks[i].posX_ - this.posX_ - this.img.width > 0) {
          allyRight = true
        } else if (enemyTanks[i].posX_ + enemyTanks[i].img.width - this.posX_ > -100
          && enemyTanks[i].posX_ + enemyTanks[i].img.width - this.posX_ < 0) {
          allyLeft = true
        }
        if (enemyTanks[i].posY_ - this.posY_ < 40
          && enemyTanks[i].posY_ - this.posY_ > 0
          && Math.abs(enemyTanks[i].posX_ - this.posX_) < 100 + this.img.width) {
          allyUp = true
        } else if (enemyTanks[i].posY_ - this.posY_ > -40
          && enemyTanks[i].posY_ - this.posY_ <= 0
          && Math.abs(enemyTanks[i].posX_ - this.posX_) < 100 + this.img.width) {
          allyDown = true
        }
      }
    }
    if (this.posX_ < this.target.posX_) {
      targetRight = true
    } else if (this.posX_ > this.target.posX_) {
      targetLeft = true
    }
    if (this.target.posY_ - this.posY_ < 100
      && this.target.posY_ - this.posY_ > 10) {
      targetUp = true
    } else if (this.target.posY_ - this.posY_ > -100
      && this.target.posY_ - this.posY_ < -10) {
      targetDown = true
    }
    this.pathFinding()
  }

  this.pathFinding = function () {
    if (targetRight) {
      if (allyRight) {
        if (allyDown) {
          this.posY_ += this.movementSpeed
        }
      } else {
        if (!allyDown && targetDown) {
          this.posY_ -= this.movementSpeed
        }
      }
      this.posX_ += this.movementSpeed
    } else if (targetLeft) {
      if (allyLeft) {
        if (allyDown) {
          this.posY_ += this.movementSpeed
        }
      } else {
        if (!allyDown && targetDown) {
          this.posY_ -= this.movementSpeed
        }
      }
      this.posX_ -= this.movementSpeed
    }
    targetDown = false
    targetRight = false
    targetUp = false
    targetLeft = false
    allyDown = false
    allyRight = false
    allyUp = false
    allyLeft = false
  }

  this.combat = function (img, f) {
    if (this.reload) {
      this.reload = false
      setTimeout(() => {
        this.fire = true
      }, this.reloadTime)
    } else if (this.fire) {
      this.fire = false
      this.reload = true
      rounds.push(new Round (this, this.posX_+img.barrelPosX*f, this.posY_+img.barrelPosY, this.roundSpeed, this.posY_))
    }
  }

  this.display = function () {
    f = 1
    this.posX = this.posX_ - battlePosX
    this.posY = height - this.posY_

    if (this.target == null) {
      this.getTarget ()
    }

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
        this.moveX()
      } else {
        /*for (i = 0; i < enemyTanks.length; i++) {
          if (Math.abs(enemyTanks[i].posX_ - this.posX_) < 1000) {
            this.combat(this.img, f)
            break
          } else {
            this.attack()
          }
        }*/
        if (Math.abs(this.target.posX_ - this.posX_) < 1000) {
          this.combat(this.img, f)
        } else {
          this.attack()
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
        this.moveX()
      } else {
        if (Math.abs(this.target.posX_ - this.posX_) < 1000) {
          this.combat(this.img, f)
        } else {
          this.attack()
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

  canCreateAlly = true
  canCreateEnemy = true
  rounds.forEach (function (round) {

    round.display()

    if (round.posY_ <= round.groundPosY) {
      rounds.splice (round, 1)
    }
  })
  allyTanks.forEach (function (tank) {
    if (tank.posX_ < 0) {
      canCreateAlly = false
    }
    tank.display ()
    if (tank.posX_> fieldLength+300) {
      allyTanks.splice (tank, 1)
    }
  })
  enemyTanks.forEach (function (tank) {
    if (enemyTanks[enemyTanks.length-1].posX_ > fieldLength) {
      canCreateEnemy = false
    }
    tank.display ()
    if (tank.posX_<-300) {
      enemyTanks.splice (tank, 1)
    }
  })

  createTanksOnHold ()

  allyTanks = organizeByHeight(allyTanks)
  enemyTanks = organizeByHeight(enemyTanks)
}

function createTanksOnHold () {

  allyTanksOnHold.forEach (function (tankType) {
    if (canCreateAlly) {
      createTank ("ally", tankType)
      allyTanksOnHold.splice (tankType, 1)
      canCreateAlly = false
    }
  })

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

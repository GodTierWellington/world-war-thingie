var myPaddle,
    myBall,
    brickCount = 50,
    bricks = []

function setup(){
  createCanvas(500, 600)
  background(240)
  myPaddle = new paddle()
  myBall = new ball()
  for (i=0;i<brickCount;i++){
    bricks[i]= new brick(width/i*4, height/i*3, 60, 20, (0,0,0), (255,255,255), 1)
  }
}

function drawTitle(){
  textSize(40)
  stroke(87, 136, 249)
  textAlign(CENTER)
  text("Brickbreaker at DEEP 2018", width /2, 40)
}

function paddle(){
  this.x = width/2
  this.y = height -30
  this.xSize = 100
  this.ySize = 20
  this.colour = (255,0,0)
  this.speed = 10

  this.draw = function(){
    fill(this.colour)
    rect(this.x, this.y, this.xSize, this.ySize)
  }

  this.move= function(){
    if (keyIsDown(LEFT_ARROW)){
      this.x-= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x+= this.speed;
    }

    if(this.x < 0){
      this.x=0
    } else if (this.x>(width-this.xSize)) {
      this.x=width-this.xSize
    }
  }
}

function ball(){
  this.x=width/2
  this.y= height/2
  this.radius = 15
  this.colour = (12,72,201)
  this.xSpeed =(7*Math.random())+1
  this.ySpeed =(7*Math.random())+1

  this.draw = function(){
    fill(this.colour)
    ellipse(this.x,this.y,this.radius,this.radius)
  }
  this.move = function(){
    this.x+=this.xSpeed
    this.y+=this.ySpeed

    if (this.x + this.radius >=width){
      this.xSpeed = -this.xSpeed
    }else if (this.x - this.radius <=0) {
      this.xSpeed = -this.xSpeed
    }else if (this.y - this.radius <=0) {
      this.ySpeed = -this.ySpeed
    }
  }
}

function brick(x,y,xSize,ySize, innerColor, outerColor, hitCount){
  this.x = x
  this.y = y
  this.xSize = xSize
  this.ySize = ySize
  this.innerColor = innerColor
  this.outerColor = outerColor
  this.hitCount = hitCount

  this.draw = function(){
    stroke(this.outerColor)
    fill(this.innerColor)
    if(this.hitCount>0){
      rect(this.x, this.y, this.xSize, this.ySize)
    }
  }

  this.ballCollision = function(aBall){
    if ((aBall.x>this.x)&&(aBall.x<this.x+this.xSize)&&(aBall.y> this.y)&&(aBall.y<this.y+this.ySize)&&(this.hitCount>0)){
      aBall.xSpeed *= -1
      aBall.ySpeed *= -1
      this.hitCount -= 1
    }
  }
}

function ballPaddleCollision(aBall, aPaddle){
  if((aPaddle.y-aBall.y <= aBall.radius) && (aBall.x>aPaddle.x) && (aBall.x < (aPaddle.x+aPaddle.xSize))){
    aBall.ySpeed = -aBall.ySpeed
  }else if (aBall.y>height) {
    //death of ball
    aBall.xSpeed = 0
    aBall.ySpeed = 0
  }
}

function draw(){
  frameRate(60)
  background(240)
  drawTitle()
  myBall.move()
  myPaddle.move()
  myBall.draw()
  myPaddle.draw()
  for (i=0;i<brickCount; i++){
    bricks[i].draw()
    bricks[i].ballCollision(myBall)
  }
  ballPaddleCollision(myBall,myPaddle)

}

function main(){
  initialize()
  while (running){
    tick()
    running()
  }
}

function initialize(){
  createCanvas (800, 600)
  img = loadImage ("assets/ahmed.jpg")
}

function tick(){
  //logic
  image(img, 0, 0)

}


function render(){
  //graphics

}


//calling main
main()

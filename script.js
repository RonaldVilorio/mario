let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let x = 10;
let y = 200;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawMario() {
  ctx.beginPath();
  ctx.rect(x, y, 20, 20);
  ctx.fillStyle = `#0095DD`;
  ctx.fill();
  ctx.closePath();
  
}
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  move()
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
function move() {
  if (rightPressed) {
    x += 10;
  } else if (leftPressed) {
    x -=10;
  }else if(upPressed){

  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMario()
}


drawMario();

// move up functionality
// use setInterval to make the sprite go up by 1 every 10milisecond
// when the up keydown
// on keyup will reverse sprite down by 1 every milisecond


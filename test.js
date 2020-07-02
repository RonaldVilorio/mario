let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
// organize
let mario = {
  width: 20,
  height: 20,
  coordX: 10,
  coordY: 280,
  gravity: -0.5,
};
let block = {
  coordX: 100,
  coordY: 250,
  width: 100,
  height: 50,
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawMario() {
  ctx.beginPath();
  ctx.rect(mario.coordX, mario.coordY, mario.width, mario.height);
  ctx.fillStyle = `#0095DD`;
  ctx.fill();
  ctx.closePath();
}
function drawBlock() {
  ctx.beginPath();
  ctx.rect(block.coordX, block.coordY, block.width, block.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}
function drawFloor() {
  ctx.beginPath();
  ctx.rect(0, 300, canvas.width, canvas.height);
  ctx.fillStyle = "brown";
  ctx.fill();
  ctx.closePath();
}
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
  } else {
    null;
  }
  move();
}
function keyUpHandler(e) {
  if (e.key == "ArrowRight" && e.key == "ArrowUp") {
    console.log("hey");
  } else if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else {
    null;
  }
}
function move() {
  if (block.coordX - mario.coordX == 20 && rightPressed) {
    mario.coordX = mario.coordX - 10;
  }
  if (rightPressed && upPressed) {
    mario.coordY -= 55;
    mario.coordX += 20;
  } else if (rightPressed) {
    mario.coordX += 10;
  } else if (leftPressed) {
    mario.coordX -= 10;
  } else if (upPressed) {
    mario.coordY -= 55;
  } else if (downPressed) {
    null;
  } else {
    null;
  }

  drawMario();
}
function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height - 100);
  drawMario();
  drawFloor();
  drawBlock();
  if (
    mario.coordY == block.coordY - mario.height &&
    mario.coordX + mario.width >= block.coordX &&
    mario.coordX <= block.width + block.coordX
  ) {
    null;
  } else if (mario.coordY < 300 - mario.height) {
    mario.coordY -= mario.gravity;
  }
 
}
setInterval(drawAll, 1);
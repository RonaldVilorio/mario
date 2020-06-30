let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
// organize
let mario = {
  coordX: 10,
  coordY: 280,
};
let block = {
  coordX: 100,
  coordY: 250,
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawMario() {
  ctx.beginPath();
  ctx.rect(mario.coordX, mario.coordY, 20, 20);
  ctx.fillStyle = `#0095DD`;
  ctx.fill();
  ctx.closePath();
}
function drawBlock() {
  ctx.beginPath();
  ctx.rect(block.coordX, block.coordY, 50, 50);
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
  console.log(e.key);
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
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    mario.coordY += 50;
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else {
    null;
  }
}
function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height - 100);

  if (rightPressed) {
    mario.coordX += 10;
    console.log(mario.coordX, block.coordX);
  } else if (leftPressed) {
    mario.coordX -= 10;
  } else if (upPressed) {
    mario.coordY -= 50;
  } else if (downPressed) {
    null;
  } else {
    null;
  }
  drawMario();
}
if (mario.coordX + 20 === block.coordX) {
  null;
}

setInterval(drawBlock, 1);
drawMario();
drawFloor();

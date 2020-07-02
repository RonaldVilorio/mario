let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// questions?
// do I want a floor obj(block)
// --> a total of 8 blocks that make up the floor?
// The flying block the same way?
// test the flying block obj
// test the minions obj
// organize
let arrOfObjs = [];

let mario = {
  width: 20,
  height: 20,
  coordX: 10,
  coordY: 280,
  gravity: -0.5,
};
mario.img = new Image();
mario.img.src = "./assets/mario.png";

let floorBlock = {
  coordX: 0,
  coordY: 300,
  width: 100,
  height: canvas.height,
  id: 0,
};
floorBlock.img = new Image();
floorBlock.img.src = "./assets/floorBlock2.png";

let block = {
  coordX: 100,
  coordY: 240,
  width: 100,
  height: 60,
  danger: false,
};
let breakableBlock = {
  coordX: 300,
  coordY: 240,
  width: 100,
  height: 30,
  danger: false,
};
let minion = {
  width: 20,
  height: 20,
  coordX: 10,
  coordY: 280,
  gravity: -0.5,
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawMario() {
  ctx.beginPath();

  ctx.drawImage(
    mario.img,
    mario.coordX,
    mario.coordY,
    mario.width,
    mario.height
  );
  ctx.closePath();
}
function drawBreakableBlock() {
  ctx.beginPath();
  ctx.rect(
    breakableBlock.coordX,
    breakableBlock.coordY,
    breakableBlock.width,
    breakableBlock.height
  );
  ctx.fillStyle = "darkblue";
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
function drawFloorBlock() {
  ctx.beginPath();
  //   ctx.drawImage(
  //     floorBlock.img,
  //     floorBlock.coordX,
  //     floorBlock.coordY,
  //     floorBlock.width,
  //     floorBlock.height
  //   );
  ctx.rect(
    floorBlock.coordX,
    floorBlock.coordY,
    floorBlock.width,
    floorBlock.height
  );
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
  // handles the green block interaction
  if (block.coordX - mario.coordX == 20) {
    mario.coordX = mario.coordX - 10;
  }
  if (block.coordX + block.width == mario.coordX && leftPressed) {
    mario.coordX = mario.coordX + 10;
  }

  if (rightPressed && upPressed) {
    mario.coordY -= 50;
    mario.coordX += 20;
  } else if (leftPressed && upPressed) {
    mario.coordY -= 50;
    mario.coordX -= 20;
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
}
function drawAll() {
  // clears everything above the floor
  ctx.clearRect(0, 0, canvas.width, canvas.height - 100);
  // clears mario when falling
  ctx.clearRect(500, 200, 100, canvas.height);
  drawMario();
  drawBlock();
  drawBreakableBlock();
  console.log(mario.coordX, mario.coordY);

  if (mario.coordY >= 400) {
    mario.coordX = 20;
    mario.coordY = 220;
  }
  if (
    mario.coordY == block.coordY - mario.height &&
    mario.coordX + mario.width >= block.coordX &&
    mario.coordX <= block.width + block.coordX
  ) {
    null;
  } else if (mario.coordY < floorBlock.coordY - mario.height) {
    mario.coordY -= mario.gravity;
  } else if (mario.coordX >= 500 && mario.coordX <= 580) {
    mario.coordY -= mario.gravity;
  }
}

function displayFloorBs() {
  for (let i = 0; i < 8; i++) {
    if (floorBlock.coordX != 500) {
      drawFloorBlock();
    }
    floorBlock.coordX = floorBlock.coordX + 100;
  }
}
displayFloorBs();
// setInterval(drawAll, 10);

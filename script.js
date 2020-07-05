let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let score = 0;
let time = 50;

let mario = {
  width: 20,
  height: 20,
  coordX: 10,
  coordY: 260,
  gravity: -1.0,
};
mario.img = new Image();
mario.img.src = "./assets/mario.png";

// extra obstacle for mario

// let minion = {
//   coordX: 10,
//   coordY: 280,
//   width: 20,
//   height: 20,
//   gravity: -9.5,
// };

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let blocks = [
  createBlock(100, 270, 50, 50, "green", false, false),
  createBlock(200, 270, 50, 50, "green", false, false),
  createBlock(300, 270, 50, 50, "green", false, false),
  createBlock(0, 300, 400, 20, "brown", false, true),
  createBlock(400, 350, 400, 20, "brown", false, true),
  createBlock(400, 200, 80, 20, "brown", false, true),
  createBlock(20, 200, 10, 10, "darkblue", false, false),
  createBlock(50, 200, 10, 10, "darkblue", false, false),
];

let numOfTargets = blocks.filter((el) => el.color === "darkblue").length;
// once you have collected 20/20 you win, track the best times

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + score + "/" + numOfTargets, 100, 20);
}

//Timer
function drawTimer() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Timer: " + time + "s", 8, 20);
}
function decrementTime() {
  time = time - 1;
}
function stopTimer() {
  time = 0;
}
// Timer

function createBlock(x, y, w, h, c, d, f) {
  return {
    coordX: x,
    coordY: y,
    width: w,
    height: h,
    danger: d,
    color: c,
    floor: f,
  };
}
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
function drawBlocks() {
  for (let i = 0; i <= blocks.length - 1; i++) {
    ctx.beginPath();
    ctx.rect(
      blocks[i].coordX,
      blocks[i].coordY,
      blocks[i].width,
      blocks[i].height
    );
    ctx.fillStyle = blocks[i].color;
    ctx.fill();
    ctx.closePath();
  }
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
  if (e.key == "Right" || e.key == "ArrowRight") {
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
    mario.coordY -= 50;
  } else if (downPressed) {
    mario.coordY += 5;
  } else {
    null;
  }
}

// let blocks = [
//   createBlock(320, 240, 20, 20, "darkblue", false, false),
//   createBlock(340, 240, 20, 20, "darkblue", false, false),
//   createBlock(100, 270, 50, 50, "green", false, false),
//   createBlock(200, 270, 50, 50, "green", false, false),
//   createBlock(0, 300, 400, 20, "brown", false, true),
// ];

function dontFall() {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].floor) {
      if (
        blocks[i].coordY === mario.coordY + mario.height &&
        mario.coordX < blocks[i].coordX + blocks[i].width &&
        mario.coordX + mario.width > blocks[i].coordX
      ) {
        mario.gravity = 0;
        break;
      } else {
        mario.gravity = -1.0;
      }
    } else if (blocks[i].color === "green") {
      if (
        mario.coordX + mario.width <= blocks[i].coordX ||
        mario.coordX >= blocks[i].coordX + blocks[i].width
      ) {
        console.log("dedede");
        mario.gravity = -1.0;
      } else if (mario.coordY + mario.height === blocks[i].coordY) {
        console.log("hey");
        mario.gravity = 0;
        break;
      } else {
        mario.gravity = -1.0;
      }
    } else if (blocks[i].color === "darkblue") {
      if (
        mario.coordX === blocks[i].coordX &&
        mario.coordY === blocks[i].coordY
      ) {
        blocks[i].color = "yellow";
        score += 1;
      }
    }

    // green block phasing stoppage
    if (blocks[i].coordX - mario.coordX == 10 && blocks[i].height > 20) {
      mario.coordX = mario.coordX - 10;
    }
    if (
      blocks[i].coordX + blocks[i].width == mario.coordX + 10 &&
      blocks[i].height > 20
    ) {
      mario.coordX = mario.coordX + 10;
    }

    if (mario.coordY > canvas.height) {
      mario.coordX = 10;
      mario.coordY = 280;
    }
  }
}
function drawAll() {
  // clears everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMario();
  drawBlocks();
  mario.coordY -= mario.gravity;
  dontFall();
  drawScore();
  drawTimer();
}
setInterval(drawAll, 10);
setInterval(decrementTime, 1000);

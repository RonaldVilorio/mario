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

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let blocks = [
  createBlock(200, 270, 50, 50, "red", false),
  createBlock(0, 300, 400, 20, "brown", false),
  createBlock(400, 350, 400, 20, "brown", false),
  createBlock(400, 200, 80, 20, "brown", false),
  createBlock(700, 100, 80, 20, "brown", false),
  createBlock(550, 150, 80, 20, "brown", false),
  createBlock(800, 200, 80, 20, "brown", false),
  createBlock(20, 200, 10, 10, "black", false),
  createBlock(120, 100, 10, 10, "black", false),
  createBlock(70, 350, 10, 10, "black", false),
  createBlock(220, 230, 10, 10, "black", false),
  createBlock(500, 120, 10, 10, "black", false),
  createBlock(700, 200, 10, 10, "black", false),
];

let numOfTargets = blocks.filter((el) => el.color === "black").length;

// once you have collected 10/10 you win, track the best times
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
// TimerEnd

function createBlock(x, y, w, h, c, d) {
  return {
    coordX: x,
    coordY: y,
    width: w,
    height: h,
    danger: d,
    color: c,
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
  } else {
    null;
  }
}

function move() {
  if (rightPressed && upPressed) {
    mario.coordY -= 30;
    mario.coordX += 20;
  } else if (leftPressed && upPressed) {
    mario.coordY -= 30;
    mario.coordX -= 20;
  } else if (rightPressed) {
    mario.coordX += 10;
  } else if (leftPressed) {
    mario.coordX -= 10;
  } else if (upPressed) {
    mario.coordY -= 30;
  } else {
    null;
  }
}
function blockHandler() {
  console.log(mario.coordY, mario.coordY + mario.height);
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].color === "brown") {
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
      if (
        blocks[i].coordY + blocks[i].height >= mario.coordY &&
        mario.coordY > blocks[i].coordY &&
        mario.coordX < blocks[i].coordX + blocks[i].width &&
        mario.coordX + mario.width > blocks[i].coordX
      ) {
        console.log("he");
        mario.coordY = blocks[i].coordY + blocks[i].height;
        mario.coordY = mario.coordY + 30
        break;
      }
    } else if (blocks[i].color === "red") {
      if (
        mario.coordX + mario.width <= blocks[i].coordX ||
        mario.coordX >= blocks[i].coordX + blocks[i].width
      ) {
        mario.gravity = -1.0;
      } else if (mario.coordY + mario.height === blocks[i].coordY) {
        mario.gravity = 0;
        break;
      } else {
        mario.gravity = -1.0;
      }
    } else if (blocks[i].color === "black") {
      if (
        mario.coordX === blocks[i].coordX &&
        mario.coordY === blocks[i].coordY
      ) {
        blocks[i].color = "yellow";
        score += 1;
        // break;
      }
    }

    // block phasing stoppage
    if (blocks[i].coordX - mario.coordX == 10 && blocks[i].height > 20) {
      mario.coordX = mario.coordX - 10;
    }
    if (
      blocks[i].coordX + blocks[i].width == mario.coordX + 10 &&
      blocks[i].height > 20
    ) {
      mario.coordX = mario.coordX + 10;
    }
    // mario is restarted every time he falls out of canvas/goes above
    // out of canvas left-right
    if (
      mario.coordY > canvas.height ||
      mario.coordY + mario.height < 0 ||
      mario.coordX + mario.width <= 0 ||
      mario.coordX > canvas.width
    ) {
      mario.coordX = 10;
      mario.coordY = 280;
    }
  }
  return score;
}
function drawAll() {
  // clears everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mario.coordY -= mario.gravity;
  
  drawScore();
  drawTimer();
  drawMario();
  drawBlocks();
  blockHandler();

  if (score === numOfTargets) {
    clearInterval(gameOn);
    alert("Nice job!");
    location.reload();
  } else if (score != numOfTargets && time === 0) {
    clearInterval(gameOn);
    alert("You lose");
    location.reload();
  }
}

let gameOn = setInterval(drawAll, 10);
setInterval(decrementTime, 1000);

let canvas = document.querySelector("#myCanvas");

let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let arrOfObjs = [];

let mario = {
  width: 20,
  height: 20,
  coordX: 10,
  coordY: 260,
  gravity: -1.0,
};
mario.img = new Image();
mario.img.src = "./assets/mario.png";

// let floorBlock = {
//   coordX: 0,
//   coordY: 300,
//   width: 100,
//   height: 20,
// };

let minion = {
  coordX: 10,
  coordY: 280,
  width: 20,
  height: 20,
  gravity: -9.5,
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let blocks = [
  createBlock(100, 270, 50, 50, "green", false, false),
  createBlock(200, 270, 50, 50, "green", false, false),
  createBlock(300, 270, 50, 50, "green", false, false),
  createBlock(0, 300, 400, 20, "brown", false, true),
  createBlock(300, 350, 400, 20, "brown", false, true),
];

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
function handleBlockStand(blks) {
  let greenBlocks = blks.filter((el) => el.color === "green");
  let floor = blks.filter((el) => el.floor === true);
  let gblock1 = greenBlocks[0];
  let gblock2 = greenBlocks[1];

  if (floor[0].coordY === mario.coordY + mario.height) {
    mario.gravity = 0;
  } else if (
    mario.coordY + mario.height === gblock1.coordY &&
    (mario.coordX + mario.width <= gblock1.coordX ||
      mario.coordX >= gblock1.coordX + gblock1.width)
  ) {
    console.log("dedede");
    mario.gravity = -1.0;
  } else if (mario.coordY + mario.height === gblock1.coordY) {
    console.log("hey");
    mario.gravity = 0;
  } else {
    mario.gravity = -1.0;
  }
}
function dontFall() {
  // handleBlockStand(blocks);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].floor) {
      if (
        blocks[i].coordY === mario.coordY + mario.height &&
        mario.coordX < blocks[i].coordX + blocks[i].width
      ) {
        mario.gravity = 0;
        break;
      } else {
        console.log("alallala");
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
    }

    // jumping up to erase blue blocks
    // if (
    //   mario.coordX === blocks[i].coordX &&
    //   blocks[i].coordY - mario.coordY == -20
    // ) {
    //   blocks.splice(blocks.indexOf(blocks[i]), 1);
    // }
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
  }
}
function drawAll() {
  // clears everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMario();
  drawBlocks();
  mario.coordY -= mario.gravity;
  dontFall();
}
setInterval(drawAll, 10);

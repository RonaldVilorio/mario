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

// let breakableBlock = {
//   coordX: 300,
//   coordY: 240,
//   width: 20,
//   height: 20,
//   danger: false,
// };
let minion = {
  coordX: 10,
  coordY: 280,
  width: 20,
  height: 20,
  gravity: -0.5,
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let blocks = [
  createBlock(100, 240, 100, 60, "green"),
  createBlock(320, 240, 20, 20, "darkblue"),
  createBlock(340, 240, 20, 20, "darkblue"),
];

function createBlock(x, y, w, h, c) {
  return {
    coordX: x,
    coordY: y,
    width: w,
    height: h,
    danger: false,
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
  // handles the green block interaction

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
function dontFall() {
  for (let i = 0; i < blocks.length; i++) {
    console.log("M", mario.coordX + mario.width, "B", blocks[i].coordX);
    // standing on the blocks
    // falling from the sides
    if (
      (mario.coordX + mario.width > blocks[i].coordX + blocks[i].width &&
        mario.coordY + mario.height === blocks[i].coordY) ||
      (blocks[i].coordX == mario.coordX + mario.width &&
        mario.coordY + mario.height === blocks[i].coordY)
    ) {
      mario.coordY -= mario.gravity;
    } else if (mario.coordY + mario.height === blocks[i].coordY) {
      null;
    } else if (mario.coordY < floorBlock.coordY - mario.height) {
      mario.coordY -= mario.gravity;
    } 
    // mario falls into empty space
    if (mario.coordX >= 500 && mario.coordX <= 580) {
      mario.coordY -= mario.gravity;
    }

    // if (
    //   mario.coordY == blocks[i].coordY - mario.height &&
    //   mario.coordX + mario.width >= blocks[i].coordX &&
    //   mario.coordX <= blocks[i].width + blocks[i].coordX
    // ) {
    //   console.log("hey");
    //   null;
    // } else if (mario.coordY < floorBlock.coordY - mario.height) {
    //   mario.coordY -= mario.gravity;
    // } else if (mario.coordX >= 500 && mario.coordX <= 580) {
    //   mario.coordY -= mario.gravity;
    // }

    // jumping up to erase blue blocks
    if (
      mario.coordX === blocks[i].coordX &&
      blocks[i].coordY - mario.coordY == -20
    ) {
      blocks.splice(blocks.indexOf(blocks[i]), 1);
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
  }
}
function drawAll() {
  // clears everything above the floor
  ctx.clearRect(0, 0, canvas.width, canvas.height - 100);
  // clears mario when falling
  ctx.clearRect(500, 200, 100, canvas.height);
  drawMario();
  drawBlocks();
  dontFall();
  // mario falls and gets reset
  if (mario.coordY > 400) {
    mario.coordX = 10;
    mario.coordY = 270;
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
setInterval(drawAll, 10);

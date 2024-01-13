const cellSize = 25;
const rows = 30;
const columns = 30;

const board = document.getElementById("playground");
const score = document.getElementById("score");
const context = board.getContext("2d");

const snakeBody = [];
const snakeHead = {
  snake_x: Math.floor(columns / 2) * cellSize,
  snake_y: Math.floor(rows / 2) * cellSize,
};

const snakeVelocity = {
  vel_x: 0,
  vel_y: 0,
};

const foodPeice = {
  food_x: undefined,
  food_y: undefined,
};

let curr_score = 0;
let gameOver = false;

window.onload = () => {
  board.height = cellSize * rows;
  board.width = cellSize * columns;

  placeFood();
  document.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
      location.reload();
    }
  });
  document.addEventListener("keyup", changeDirection);

  // Renderloop
  setInterval(render, 100);
};

function render() {
  if (gameOver) {
    score.innerText = "GAME OVER! \nPress \u23ce";
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "orange";
  context.fillRect(foodPeice.food_x, foodPeice.food_y, cellSize, cellSize);

  if (
    foodPeice.food_x == snakeHead.snake_x &&
    foodPeice.food_y == snakeHead.snake_y
  ) {
    snakeBody.push([foodPeice.food_x, foodPeice.food_y]);
    curr_score = snakeBody.length;
    score.innerText = String(curr_score);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; --i) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeHead.snake_x, snakeHead.snake_y];
  }

  context.fillStyle = "lime";
  snakeHead.snake_x += snakeVelocity.vel_x * cellSize;
  snakeHead.snake_y += snakeVelocity.vel_y * cellSize;
  context.fillRect(snakeHead.snake_x, snakeHead.snake_y, cellSize, cellSize);
  for (let i = 0; i < snakeBody.length; ++i) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], cellSize, cellSize);
  }

  if (
    snakeHead.snake_x < 0 ||
    snakeHead.snake_x > columns * cellSize ||
    snakeHead.snake_y < 0 ||
    snakeHead.snake_y > rows * cellSize
  ) {
    gameOver = true;
  }

  for (let i = 0; snakeBody.length; ++i) {
    if (
      snakeHead.snake_x == snakeBody[i][0] &&
      snakeHead.snake_y == snakeBody[i][1]
    ) {
      gameOver = true;
    }
  }
}

function placeFood() {
  foodPeice.food_x = Math.floor(Math.random() * columns) * cellSize;
  foodPeice.food_y = Math.floor(Math.random() * rows) * cellSize;
  if (
    foodPeice.food_x == snakeHead.snake_x &&
    foodPeice.food_y == snakeHead.snake_y
  )
    placeFood();
}

function changeDirection(event) {
  switch (event.code) {
    case "ArrowUp":
      if (snakeVelocity.vel_y == 1) break;
      snakeVelocity.vel_x = 0;
      snakeVelocity.vel_y = -1;
      break;
    case "ArrowDown":
      if (snakeVelocity.vel_y == -1) break;
      snakeVelocity.vel_x = 0;
      snakeVelocity.vel_y = 1;
      break;
    case "ArrowLeft":
      if (snakeVelocity.vel_x == 1) break;
      snakeVelocity.vel_x = -1;
      snakeVelocity.vel_y = 0;
      break;
    case "ArrowRight":
      if (snakeVelocity.vel_x == -1) break;
      snakeVelocity.vel_x = 1;
      snakeVelocity.vel_y = 0;
      break;
    default:
      break;
  }
}

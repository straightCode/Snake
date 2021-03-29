'use strict'

const box = 30;
const border = 3;
const scoreValueEl = document.getElementById('scoreValue');
const offsetX = document.querySelector('.border').offsetLeft;
const offsetY = document.querySelector('.border').offsetHeight;
const offsetTop = document.querySelector('.border').offsetTop;
let headX = box;
let headY = box;
let score = 0;
let direction = 'down';
let snake = [];
let foodCords = {}

function createSnakeBlock(cords) {
  let snakeBlock = document.createElement('div');
  snakeBlock.className = 'snake-block';
  snakeBlock.style.top = cords.y + 'px';
  snakeBlock.style.left = cords.x + 'px';
  document.body.append(snakeBlock);
  return snakeBlock;
}
function generateFoodCords(){
  foodCords = {
    x: (Math.floor(Math.random() * 20) * box) + offsetX,
    y: (Math.floor(Math.random() * 20) * box) + offsetTop,
  }
  for(let i = 0; i < snake.length; i++){
    if(foodCords.x == snake[i].x && foodCords.y == snake[i].y){
      generateFoodCords()
    }
  }
}

function createFodd() {
  generateFoodCords();
  let foodEl = document.createElement('div');
  foodEl.className = 'food';
  foodEl.style.top = foodCords.y + 'px';
  foodEl.style.left = foodCords.x + 'px';
  document.body.append(foodEl);
}

function selectDirection(e) {
  switch (e.keyCode) {
    case (37):
      direction = 'left';
      break;
    case (39):
      direction = 'right';
      break;
    case (38):
      direction = 'up';
      break;
    case (40):
      direction = 'down';
      break;
  }
}
document.addEventListener('keydown', selectDirection);

createFodd();

snake.unshift({
  x: offsetX,
  y: offsetY
});

createSnakeBlock({
  x: offsetX,
  y: offsetY
});

function render() {
  switch (direction) {
    case ('down'):
      headY += box;
      break;
    case ('up'):
      headY -= box;
      break;
    case ('left'):
      headX -= box;
      break;
    case ('right'):
      headX += box;
      break;
  }
  if (headX > (box * 20) + offsetX) {
    headX = offsetX;
  } else if (headX < offsetX) {
    headX = box * 20 + offsetX;
  } else if (headY > (offsetY + offsetTop) - box) {
    headY = offsetTop;
  } else if (headY < offsetTop) {
    headY = offsetY ;
  }
  let head = {
    x: headX,
    y: headY,
  }
  createSnakeBlock(head);
  for (let i = 0; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      console.log('gameover!!!');
    }
  }
  if (head.x == foodCords.x && head.y == foodCords.y) {
    document.querySelector('.food').remove();
    score++;
    createFodd();
  } else {
    document.querySelector('.snake-block').remove();
    snake.pop();
  }
  snake.unshift(head);
  scoreValueEl.innerText = score;
}

setInterval(render, 100);

console.dir(document.querySelector('.border'))
'use strict'
console.log('op');
const box = 30;
const scoreValueEl = document.getElementById('scoreValue');
const offsetX = document.querySelector('.border').offsetLeft;
const offsetY = document.querySelector('.border').offsetHeight;
const offsetTop = document.querySelector('.border').offsetTop;
let headX = box;
let headY = box;
let score = 0;
let touchStart = {};
let touchEnd = {};
let direction = 'down';
let snake = [];
let foodCords = {}

document.addEventListener('keydown', selectDirection);
document.addEventListener('touchstart', touchstart);
document.addEventListener('touchend', touchend);

function selectDirectionTouch(){
  const diffX = touchStart.x - touchEnd.x;
  const diffY = touchStart.y - touchEnd.y;
  if(diffX < -200 && Math.abs(diffX) > Math.abs(diffY)){
    direction = 'right';
  }else if(diffX > 200 && Math.abs(diffX) > Math.abs(diffY)){
    direction = 'left';
  }else if(diffY > 200 && Math.abs(diffY) > Math.abs(diffX)){
    direction = 'up';
  }
  else if(diffY < -200 && Math.abs(diffY) > Math.abs(diffX)){
    direction = 'down';
  }
  console.log(diffX, diffY);
}

function touchstart(e){
  touchStart.x = e.changedTouches[0].screenX;
  touchStart.y = e.changedTouches[0].screenY;
}
function touchend(e){
  touchEnd.x = e.changedTouches[0].screenX;
  touchEnd.y = e.changedTouches[0].screenY;
  selectDirectionTouch();
}

function createSnakeBlock(cords) {
  let snakeBlock = document.createElement('div');
  snakeBlock.className = 'snake-block';
  snakeBlock.style.top = cords.y + 'px';
  snakeBlock.style.left = cords.x + 'px';
  document.body.append(snakeBlock);
  return snakeBlock;
}

function generateFoodCords() {
  foodCords = {
    x: (Math.floor(Math.random() * 20) * box) + offsetX,
    y: (Math.floor(Math.random() * 20) * box) + offsetTop,
  }
  for (let i = 0; i < snake.length; i++) {
    if (foodCords.x == snake[i].x && foodCords.y == snake[i].y) {
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
    headY = offsetY;
  }
  let head = {
    x: headX,
    y: headY,
  }
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

  createSnakeBlock(head);
  snake.unshift(head);
  scoreValueEl.innerText = score;
}

setInterval(render, 100);
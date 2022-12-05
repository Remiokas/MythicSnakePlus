import {update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeTouch, gameScore, onSnake} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {update as updateWall, draw as drawWall, wallList}  from './wall.js'
import {update as updateGgFood, draw as drawGgFood, checkGgTimer, ggFoodCount} from './ggFood.js'
import {update as updateWallFood, draw as drawWallFood, wallBreakCount} from './wallFood.js'
import {outsideGrid} from './grid.js'
import {scoreSender} from './score_poster.js'

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

let lastRenderTime = 0;
let gameOver = false;
let affixWall = false;
const gameBoard = document.querySelector('#game-board');
let snakeHeadSelector = document.getElementsByClassName('snake');

function main(currentTime, startTime) {
    if (gameOver) {
        scoreSender(gameScore, wallBreakCount, ggFoodCount);
        alert(`Game is Over. Your Score Is: ${gameScore}`);
        if (confirm('Play Again?')) {
        window.location = '/play'
        }
        return
    }
    window.requestAnimationFrame(main);
    const renderDifference = (currentTime - lastRenderTime) / 1000;
    if (renderDifference < 1 / snakeSpeed) return
    lastRenderTime = currentTime;
    update();
    draw();
    snakeHeadSelector[0].textContent = '00';
    snakeHeadSelector[snakeHeadSelector.length -1].textContent = '!!!'
    if (snakeHeadSelector.length === 1) {
    snakeHeadSelector[0].textContent = '00';
    }
}

function update() {
    checkGG();
    updateFood();
    updateGgFood();
    updateWallFood();
    updateSnake();
    updateWall();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawGgFood(gameBoard);
    drawWallFood(gameBoard);
    drawWall(gameBoard);
}

function checkGG() {
    gameOver = outsideGrid(getSnakeHead()) || snakeTouch() || wallGG(getSnakeHead()) || checkGgTimer()

}

function wallGG(head) {
    wallList.forEach(wall =>{
        if (wall['x'] === head['x'] && wall['y'] === head['y']) {
            affixWall = true;
        }
    })
    return affixWall
}

let start = true;

if (start) {
    window.requestAnimationFrame(main);
}

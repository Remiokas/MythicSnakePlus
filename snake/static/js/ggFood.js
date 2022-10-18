import {onSnake, growSnake} from './snake.js'
import {randomGridPosition} from './grid.js'
import {onWall} from './wall.js'

export let ggFood = getRandomGgFoodPosition();
let startCheck = false;

let currentTime = new Date().getTime();
let updateTime = new Date().getTime();

window.addEventListener('keydown', startIndicator);

function startIndicator() {
    startCheck = true;
}

export function update() {
    if (onSnake(ggFood)) {
        ggFood = getRandomGgFoodPosition();
        currentTime = new Date().getTime();
    }
}

export function draw(gameBoard) {
        const ggFoodElement = document.createElement('div');
        ggFoodElement.style.gridRowStart = ggFood.y;
        ggFoodElement.style.gridColumnStart = ggFood.x;
        ggFoodElement.classList.add('gg-food')
        let foodTime = Math.round(10 - (updateTime - currentTime) / 1000);
        if (foodTime <= 10){
        ggFoodElement.textContent = `${Math.round(10 - (updateTime - currentTime) / 1000)}`
        }
        else {
        ggFoodElement.textContent = '10'
        }
        gameBoard.appendChild(ggFoodElement)
}

function getRandomGgFoodPosition() {
    let newGgFoodPosition
    while (newGgFoodPosition == null || onSnake(newGgFoodPosition) || onWall(newGgFoodPosition)) {
        newGgFoodPosition = randomGridPosition()
    }
    return newGgFoodPosition
}

export function checkGgTimer() {
    if (startCheck) {
        updateTime = new Date().getTime()
        if (currentTime+10000 <= updateTime){
            currentTime = new Date().getTime();
            return true;
            }
}
    else {
    currentTime = new Date().getTime()
    }
}
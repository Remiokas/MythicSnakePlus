import {onSnake, growSnake} from './snake.js'
import {randomGridPosition} from './grid.js'
import {onWall} from './wall.js'

export let food = getRandomFoodPosition();
const growSize = 1;

export function update() {
    if (onSnake(food)) {
        growSnake(growSize)
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition) || onWall(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}
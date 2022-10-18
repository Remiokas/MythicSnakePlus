import {onSnake, growSnake} from './snake.js'
import {randomGridPosition} from './grid.js'
import {onWall, wallList} from './wall.js'

export let wallFood = getRandomWallFoodPosition();
let wallFoodCounter = 0;

export function update() {
    if (onSnake(wallFood)) {
        wallFoodCounter += 1;
        wallFood = getRandomWallFoodPosition();
        wallBreak();
    }
}

export function draw(gameBoard) {
        const wallFoodElement = document.createElement('div');
        wallFoodElement.style.gridRowStart = wallFood.y;
        wallFoodElement.style.gridColumnStart = wallFood.x;
        wallFoodElement.classList.add('wall-food')
        wallFoodElement.textContent = `${wallFoodCounter}`
        gameBoard.appendChild(wallFoodElement)
}

function getRandomWallFoodPosition() {
    let newWallFoodPosition
    while (newWallFoodPosition == null || onSnake(newWallFoodPosition) || onWall(newWallFoodPosition)) {
        newWallFoodPosition = randomGridPosition()
    }
    return newWallFoodPosition
}

export function wallBreak() {
    if (wallFoodCounter === 3){
        wallList.pop();
        wallFoodCounter = 0;
    }
}

import {onSnake, growSnake, snakeSpeed} from './snake.js'
import {randomGridPosition} from './grid.js'

export let wall = getRandomWallPosition();
let currentTime = new Date().getTime()
let newSegments = 0;
export let wallList = [{x: -1, y: -1}];
let startCheck = false;

window.addEventListener('keydown', startIndicator);

function startIndicator() {
    startCheck = true;
}

export function draw(gameBoard) {
    wallList.forEach(wallSegment => {
        const wallElement = document.createElement('div');
        wallElement.style.gridRowStart = wallSegment.y;
        wallElement.style.gridColumnStart = wallSegment.x;
        wallElement.classList.add('wall')
        gameBoard.appendChild(wallElement)
    })
}

function getRandomWallPosition() {
    let newWallPosition
    while (newWallPosition == null || onSnake(newWallPosition)) {
        newWallPosition = randomGridPosition()
    }
    return newWallPosition
}

export function update() {
    if (startCheck) {
        let updateTime = new Date().getTime()
        if (currentTime+5000 <= updateTime){
            currentTime = new Date().getTime();
            growWall(wall);
            wall = getRandomWallPosition();
        }
    }
    else {
    currentTime = new Date().getTime();
    }
}

function growWall(wall) {
        wallList.push(wall);
    }

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

export function onWall(position, {ignoreHead = false} = {}) {
    return wallList.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}
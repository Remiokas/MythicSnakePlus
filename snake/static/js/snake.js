import {getInputDirection} from './input.js'

export let snakeSpeed = 24;
const snakeBody = [{x: 16, y: 16}];
let newSegments = 0;
export let gameScore = 0;

export function update() {
    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        snakeElement.textContent = '[   ]'
        gameBoard.appendChild(snakeElement);
        let rotation = getInputDirection();
        if (rotation.x === 1) {
        snakeElement.style.transform = 'rotate(-90deg)';
        }
        if (rotation.x === -1) {
        snakeElement.style.transform = 'rotate(90deg)';
        }
        if (rotation.y === -1) {
        snakeElement.style.transform = 'rotate(180deg)';
        }
    })
}

export function growSnake(amount) {
    newSegments += amount;
    addSegments();
    snakeSpeed += 0.1;
    gameScore += 1;
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeTouch() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments () {
    for (let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0;
}

let order = [];
let clickedOrder = [];
let score= 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

//
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder= [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//
let lightColor = (element, time) => {
    time = time * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, time - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, time);
}

//
let checkOrder = () => {
    for(let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        nextLevel();
    }
}

//
let click = (clickedColor) => {
    clickedOrder[clickedOrder.length] = clickedColor;
    createColorElement(clickedColor).classList.add('selected');

    setTimeout(() => {
        createColorElement(clickedColor).classList.remove('selected');
        checkOrder();
    }, 250);
}

//
let createColorElement = (color) => {
    if(color == 0) {
        return blue;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return green;
    }
}

//
let nextLevel = () => {
    setTimeout(() => {
    score++;
    shuffleOrder();
    }, 250);
}

//
let gameOver = () => {
    alert(`Game Over!\nFinal Score: ${score}`)
    order = [];
    clickedOrder = [];

    newGame();
}

//
let newGame = () => {
    alert('Starting game...')
    score = 0;
    nextLevel();
}


blue.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
green.onclick = () => click(3);

newGame();

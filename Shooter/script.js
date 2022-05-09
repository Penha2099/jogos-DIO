const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const dangersImg = ['imgs/spaceship1.png', 'imgs/spaceship2.png', 'imgs/asteroid1.png', 'imgs/asteroid2.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let dangerInterval;

function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === ' ') {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === '0px') {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= 25;
        yourShip.style.top = `${position}px`
    }
}

function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === '550px') {
        return;
    } else {
        let position = parseInt(topPosition);
        position += 25;
        yourShip.style.top = `${position}px`
    }
}

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xAxis = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yAxis = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');

    newLaser.src = 'imgs/laser.png';
    newLaser.classList.add('laser');

    newLaser.style.left = `${xAxis}px`;
    newLaser.style.top = `${yAxis - 15}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xAxis = parseInt(laser.style.left);
        let dangers = document.querySelectorAll('.danger');

        dangers.forEach((danger) => {
            if (laserCollision(laser, danger)) {
                danger.src = 'imgs/explosion.png';
                danger.classList.remove('danger');
                danger.classList.add('destroyed');
            }
        })

        if(xAxis >= 650) {
            laser.remove();
        } else{
            laser.style.left = `${xAxis + 8}px`
        }
    }, 10);
}

function createDanger() {
    let newDanger = document.createElement('img');
    let dangerSprite = dangersImg[Math.floor(Math.random() * dangersImg.length)];

    newDanger.src = dangerSprite;
    newDanger.classList.add('danger');
    newDanger.classList.add('danger-transition');
    newDanger.style.left = '600px';
    newDanger.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newDanger);
    moveDanger(newDanger);
}

function moveDanger(danger) {
    let moveDangerInterval = setInterval(() => {
        let xAxis = parseInt(window.getComputedStyle(danger).getPropertyValue('left'));
        if(xAxis <= 50) {
            if(Array.from(danger.classList).includes('destroyed')) {
                danger.remove();
            } else {
                gameOver();
            }
        } else {
            danger.style.left = `${xAxis - 3}px`;
        }
    }, 30);
}

function laserCollision(laser, danger) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let dangerTop = parseInt(danger.style.top);
    let dangerLeft = parseInt(danger.style.left);
    let dangerBottom = dangerTop - 30;

    if (laserLeft != 340 && laserLeft + 40 >= dangerLeft) {
        if (laserTop <= dangerTop && laserTop >= dangerBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    dangerInterval = setInterval(() => {
        createDanger();
    }, 2000);
}

function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(dangerInterval);
    let dangers = document.querySelectorAll('.danger');
    dangers.forEach((danger) => danger.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
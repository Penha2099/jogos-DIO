var player, winner = null;
var selectedPlayer = document.getElementById('selected-player');
var squares = document.getElementsByClassName('square');

changePlayer('X');

function pickSquare(id) {
    var square = document.getElementById(id);

    if (square.innerHTML !== '-') {
        return;
    }

    square.innerHTML = player;
    square.style.color = '#000';

    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
    changePlayer(player);
    checkWinner();
}

function changePlayer(value) {
    player = value;
    selectedPlayer.innerHTML = player;
}

function checkWinner() {
    var square1 = document.getElementById(1);
    var square2 = document.getElementById(2);
    var square3 = document.getElementById(3);
    var square4 = document.getElementById(4);
    var square5 = document.getElementById(5);
    var square6 = document.getElementById(6);
    var square7 = document.getElementById(7);
    var square8 = document.getElementById(8);
    var square9 = document.getElementById(9);

    if (checkSequence(square1, square2, square3)) {
        chooseWinner(square1);
        return;
    } else if (checkSequence(square4, square5, square6)) {
        chooseWinner(square4);
        return;
    } else if (checkSequence(square7, square8, square9)) {
        chooseWinner(square7);
        return;
    } else if (checkSequence(square1, square4, square7)) {
        chooseWinner(square1);
        return;
    } else if (checkSequence(square2, square5, square8)) {
        chooseWinner(square2);
        return;
    } else if (checkSequence(square3, square6, square9)) {
        chooseWinner(square3);
        return;
    } else if (checkSequence(square1, square5, square9)) {
        chooseWinner(square1);
        return;
    } else if (checkSequence(square3, square5, square7)) {
        chooseWinner(square3);
        return;
    }
}

function chooseWinner(square) {
    winner = square.innerHTML;
    alert(`Winner: ${winner}`);
    restart();
}

function checkSequence(square1, square2, square3) {
    var match = false;

    if (square1.innerHTML !== '-' && square1.innerHTML === square2.innerHTML && square1.innerHTML === square3.innerHTML) {
        match = true;
    }

    return match;
}

function restart() {
    changePlayer('X');
    for(var i = 1; i <= 9; i++) {
        var square = document.getElementById(i);
        square.innerHTML = '-';
    }
}
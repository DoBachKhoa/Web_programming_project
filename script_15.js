// Parameters
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
var numbersRaw = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
var x = 4; y = 4;
var playing = 0
var main = document.querySelector('body');
var moves = [];
const myEvent = new CustomEvent('update');
const squares = document.getElementsByClassName('square');


// Parameters for playing games
var canvas = document.createElement('div');
var canvas2 = document.createElement('div');
var home = document.createElement('div');
var play = document.createElement('div');
var move = document.createElement('div');
var undo = document.createElement('div');
var wiki = document.createElement('div');
canvas.classList.add('canvas');
canvas2.classList.add('canvas');
home.classList.add('button', 'hover');
play.classList.add('button', 'hover');
wiki.classList.add('button', 'hover');
move.classList.add('button', 'move');
undo.classList.add('button');
play.innerHTML = 'Play';
home.innerHTML = 'Home';
move.innerHTML = 'Move';
undo.innerHTML = 'Undo';
wiki.innerHTML = 'More';
move.move = 0;
home.style.marginLeft = '0.1vw';
undo.classList.add('gray');


// Function start
function start() {
    move.style.backgroundColor = '#3399FF';
    undo.classList.remove('gray');
    undo.classList.add('hover');
    play.innerHTML = 'Replay';
    moves = [];
    x = 4;
    y = 4;
    shuffle();
    playing = 1;
    move.move = 0;
    move.innerHTML = 'Move: ' + String(move.move);
}


// Function to shuffle an array. Function shuffleArray: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


// Function to update
function update() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = String(numbers[squares[i].num]);
        if (squares[i].innerHTML == 0) {
            squares[i].style.backgroundColor = 'white';
        } else {
            squares[i].style.backgroundColor = '#3399FF';
        }
    }
}


// Function to updatemove
function updatemove() {
    if (playing == 1) {
        move.move ++;
        move.innerHTML = 'Move: ' + String(move.move);
    }
}


// Function to shuffle
function shuffle() {
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    shuffleArray(numbers)
    var count = 0;
    for (var i = 0; i <= 13; i ++) {
        for (var j = i+1; j <= 14; j ++) {
            if (numbers[i] > numbers[j]) {
                count ++;
            }
        }
    }
    if (count % 2 == 1) {
        [numbers[14], numbers[13]] = [numbers[13], numbers[14]];
    }
    numbers.push(0);
    update();
}


// Creating the squares&updating
for (var i = 1; i < 4; i ++) {
    document.querySelector('body').appendChild(document.createElement('br'));
}
main.appendChild(canvas);
main.appendChild(canvas2);
for (var i = 1; i <= 4; i ++) {
    for (var j = 1; j <=4; j ++) {
        const element = document.createElement('div');
        element.classList.add('square');
        element.innerHTML = numbers[i*4 + j - 5];
        element.num =(i*4 + j - 5);
        canvas.appendChild(element);
    }
    canvas.appendChild(document.createElement('br'));
}
update();


// Codes to 'move' the squares around
document.querySelector('body').addEventListener('keydown', change);
function change(event) {
    switch (event.key) {
        case "ArrowRight":
            if (y>1) {
                moves.push('d');
                updatemove();
                var temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 6];
                numbers[x*4 + y - 6] = temp;
                y --;
                update();
            }
            break;
        case "ArrowLeft":
            if (y<4) {
                moves.push('a');
                updatemove();
                temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 4];
                numbers[x*4 + y - 4] = temp;
                y ++;
                update();
            }
            break;
        case "ArrowDown":
            if (x>1) {
                moves.push('s');
                updatemove();
                temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 9];
                numbers[x*4 + y - 9] = temp;
                x --;
                update();
            }
            break;
        case "ArrowUp":
            if (x<4) {
                moves.push('w');
                updatemove();
                temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 1];
                numbers[x*4 + y - 1] = temp;
                x ++;
                update();
            }
            break;
    }
    if ((playing == 1) && (numbers.length === numbersRaw.length && numbers.every(function(value, index) { return value === numbersRaw[index]}))) {
        if (move.innerHTML < 2) {
            alert('You win!\nDid that in ' + String(move.move) + ' move');
        } else {
            alert('You win!\nDid that in ' + String(move.move) + ' moves');
        }
        moves = [];
        playing = 0
    }
}


// Function to undo moves
function playback() {
    console.log(moves);
    if (moves.length > 0 && playing == 1) {
        last = moves.pop();
        switch (last) {
            case "d":
                move.move = move.move - 2;
                updatemove();
                var temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 4];
                numbers[x*4 + y - 4] = temp;
                y ++;
                update();
                break;
            case "a":
                move.move = move.move - 2;
                updatemove();
                var temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 6];
                numbers[x*4 + y - 6] = temp;
                y --;
                update();
                break;
            case "s":
                move.move = move.move - 2;
                updatemove();
                var temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 1];
                numbers[x*4 + y - 1] = temp;
                x ++;
                update();
                break;
            case "w":
                move.move = move.move - 2;
                updatemove();
                var temp = numbers[x*4 + y - 5];
                numbers[x*4 + y - 5] = numbers[x*4 + y - 9];
                numbers[x*4 + y - 9] = temp;
                x --;
                update();
                break;
        }
    }
}


// To press play and undo
play.addEventListener('click', start);
undo.addEventListener('click', playback);


// Rules & more CSS:
var rulebox = document.createElement('div');
var histbox = document.createElement('div');
rulebox.classList.add('rulebox');
histbox.classList.add('rulebox');
rulebox.innerHTML = 'RULE: Click \'Play\' to start!<br/><br/>- Press the arrows to move the squares around.<br/> - Click \'Undo\' to retake your last moves, and<br/> - Click \'Replay\' to reset the games.<br/> - Objective: to reorder the numbers ascendingly.<br/><br/>Have fun!';
histbox.innerHTML = 'The 15-puzzle on your screen is invented way back in the 19th century.<br/><br/>Some of its other names are the Gem Puzzle, Boss Puzzle, or Game of Fifteen.<br/><br/>The game have been a classical problem for combinatorical math and modelling algorithms; one of the interesting questions is its solvability given the initial position.';
canvas2.appendChild(home);
canvas2.appendChild(wiki);
canvas2.appendChild(document.createElement('br'));
canvas2.appendChild(histbox);
canvas2.appendChild(document.createElement('br'));
canvas2.appendChild(rulebox);
canvas2.appendChild(document.createElement('br'));
canvas2.style.marginLeft = '2%';
canvas.style.marginLeft = '20%';
home.style.width = '15.7vw';
home.style.textAlign = 'left';
histbox.style.height = '12vw';



// Function buttons
canvas2.appendChild(play);
canvas2.appendChild(undo);
canvas2.appendChild(move);
canvas2.appendChild(document.createElement('br'));
canvas2.appendChild(document.createElement('br'));
canvas.appendChild(document.createElement('br'));


// Adding the links
home.addEventListener('click', homepage);
wiki.addEventListener('click', wikipage);
function homepage() {
    location.replace('index_main.html');
}
function wikipage() {
    window.open('https://en.wikipedia.org/wiki/15_puzzle', '_blank');
}
// Parameters
var states = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var keystates = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var playing = 0
var main = document.querySelector('body');
var moves = [];
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
undo.classList.add('gray1');


// Function to update
function update() {
    for (var i = 0; i < 25; i ++) {
        if (states[i] == 0) {
            squares[i].classList.remove('gray');
        } else {
            squares[i].classList.add('gray');
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
    states = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < 25; i ++) {
        if (Math.random() >= 0.5) {
            states[i] = 1;
        }
    }
    if ((states[0] + states[1] + states[3] + states[4] + states[10] + states[11]
        + states[13] + states[14] + states[20] + states[21] + states[23] + states[24])%2 == 1) {
            states[1] = 1 - states[1];
    }
    if ((states[0] + states[2] + states[4] + states[5] + states[7] + states[9]
        + states[15] + states[17] + states[19] + states[20] + states[22] + states[24])%2 == 1) {
            states[2] = 1 - states[2];
    }
}


// Function start
function start() {
    move.style.backgroundColor = '#3399FF';
    undo.classList.remove('gray1');
    undo.classList.add('hover');
    shuffle();
    update();
    playing = 1;
    move.move = 0;
    moves = [];
}


// Creating the squares&updating
for (var i = 1; i < 4; i ++) {
    document.querySelector('body').appendChild(document.createElement('br'));
}
main.appendChild(canvas);
main.appendChild(canvas2);
for (var i = 0; i < 5; i ++) {
    for (var j = 0; j < 5; j ++) {
        const element = document.createElement('button');
        element.classList.add('square', 'hover1');
        element.addEventListener('click', action);
        element.innerHTML='|';
        element.x = i;
        element.y = j;
        canvas.appendChild(element);
    }
    canvas.appendChild(document.createElement('br'));
}
update();


// Codes to change the states
function turn(x, y) {
    change = [[x, y],[x+1, y],[x-1, y],[x, y+1],[x, y-1]]
    for (var val = 0; val < 5; val ++) {
        [i, j] = change[val];
        if (0 <= i && i < 5 && 0 <= j && j < 5) {
            // console.log(i, j);  
            states[5*i + j] = 1 - states[5*i + j];
        }
    }
    update();
}

function action() {
    moves.push([this.x, this.y]);
    turn(this.x, this.y);
    if (playing == 1) {updatemove();}
    if ((playing == 1) && (states.length === keystates.length && states.every(function(value, index) { return value === keystates[index]}))) {
        if (move.innerHTML < 2) {
            alert('You win!\nDid that in ' + String(move.move) + ' move');
        } else {
            alert('You win!\nDid that in ' + String(move.move) + ' moves');
        }
        moves = [];
        playing = 0;
    }
}

// Function to undo moves
function playback() {
    if (moves.length > 0 && playing == 1) {
        [x, y] = moves.pop();
        turn(x, y);
        if (playing == 1) {
            move.move = move.move - 2;
            updatemove();
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
rulebox.innerHTML = 'RULE: Click \'Play\' to start!<br/><br/>- Click on the squares to perform switching.<br/> - Click \'Undo\' to retake your last moves, and<br/> - Click \'Replay\' to reset the games.<br/> - Objective: to make the whole thing blue.<br/><br/>Have fun!';
histbox.innerHTML = 'Lights Out was first released in 1995 as an electronic game.<br/><br/>Since then, many other versions of the game have appeared, with modified board size and control rule.<br/><br/>The main idea is that every square is a light bulb, ans pressing one causes itself as well as its adjacent ones to switch state. The goal is to turn all the light bulbs off, or in our case, to make all the squares turn blue.';
canvas2.appendChild(home);
canvas2.appendChild(wiki);
canvas2.appendChild(document.createElement('br'));
canvas2.appendChild(histbox);
canvas2.appendChild(document.createElement('br'));
canvas2.appendChild(rulebox);
canvas2.appendChild(document.createElement('br'));
canvas2.style.marginLeft = '2%';
canvas.style.marginLeft = '15%';
home.style.width = '16.55vw';
home.style.textAlign = 'left';
histbox.style.height = '14.2vw';



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
    window.open('https://en.wikipedia.org/wiki/Lights_Out_(game)', '_blank');
}
var play = document.querySelector(".play");
var array = ["1", "2", "3", "4", "5", "6"];
var clicked = false;
var temp = 0;
var playing = 0;
const squares = document.getElementsByClassName("square");
const action = document.querySelector('.action');

var results = document.querySelector(".results");
for (var i = 0; i < 4; i++) {
  const ele = document.createElement("div");
  ele.classList.add("square2");
  results.appendChild(ele);
  results.appendChild(document.createElement("br"));
}
var key_squares = document.getElementsByClassName("square2");

var container = [];
for (var i = 0; i < 9; i++) {
  container[i] = [0, 0, 0, 0];
}

var answer = [1, 1, 1, 1];

function setKey() {
  answer = [];
  for (i = 0; i < 4; i++) {
    answer.push(1 + Math.floor(Math.random() * 6));
  }
  console.log(answer);
}

document.addEventListener("keydown", broadcast);
for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 9; j++) {
    var element = document.createElement("div");
    element.classList.add("square");
    element.x = i;
    element.y = j;
    element.innerHTML = '';
    element.addEventListener("click", changenum);
    element.addEventListener("update", updatenum);
    play.appendChild(element);
  }
  // var key = document.createElement("div");
  // key.classList.add("square");
  // play.appendChild(key);
  play.appendChild(document.createElement("br"));
}

// Create result boxes

for (var j = 0; j < 9; j++) {
  var result1 = document.createElement("div");
  result1.classList.add("square");
  result1.classList.add("result");
  result1.x = i;
  result1.y = j;
  play.appendChild(result1);
}
play.appendChild(document.createElement("br"));

boxes = document.getElementsByClassName("result");

// Checking number of correct guesses
function right_position(arr1, arr2) {
  var res = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] == arr2[i]) {
      res++;
    }
  }
  return res;
}

function wrong_position(arr1, arr2) {
  var res = 0;
  right = right_position(arr1, arr2);
  var save1 = [0, 0, 0, 0, 0, 0];
  var save2 = [0, 0, 0, 0, 0, 0];
  for (i = 0; i < 4; i++) {
    save1[arr1[i]]++;
    save2[arr2[i]]++;
  }
  for (i = 0; i < 6; i++) {
    res = res + Math.min(save1[i], save2[i]);
  }
  return res - right;
}

// Test box
test = document.createElement('div');
test.classList.add('test', 'button');
test.innerHTML = "Check!";
test.addEventListener("click", checkresult);
document.addEventListener('keydown', actioncheck);

function actioncheck(event) {
  if (event.key == 'Enter') {
    checkresult();
  }
}

function checkresult() {
  if (
    playing == 1 &&
    container[temp][0] *
      container[temp][1] *
      container[temp][2] *
      container[temp][3] !=
      0
  ) {
    boxes[temp].innerHTML = right_position(answer, container[temp]) + " |  " + wrong_position(answer, container[temp]);
    boxes[temp].classList.remove('gray');
    if (right_position(answer, container[temp]) == 4) {
      show_result();
      playing = 0;
      alert("You win in " + String(temp + 1) + " attemps");
    } else {
      temp++;
      if (temp == 9) {
        show_result();
        playing = 0;
        alert("You ran out of attemp! Try again?");
      } else {
        updatemove();
      }
    }
  }
}

function changenum(event) {
  if (playing == 1) {
    if (this.classList.contains("clicked")) {
      this.classList.remove("clicked");
      clicked = false;
    } else {
      if (!clicked && this.y == temp) {
        this.classList.add("clicked");
        clicked = true;
      }
    }
  }
}

function show_result() {
  for (var i = 0; i < 4; i++) {
    key_squares[i].innerHTML = answer[i];
  }
}

function hide_result() {
  for (var i = 0; i < 4; i++) {
    key_squares[i].innerHTML = "";
  }
}

function broadcast(event) {
  for (var i = 0; i < squares.length; i++) {
    updatenum(squares[i], event.key);
  }
}

function updatenum(obj, val) {
  if (playing == 1) {
    if (obj.classList.contains("clicked")) {
      obj.classList.remove("clicked");
      clicked = false;
      if (array.includes(val)) {
        obj.innerHTML = val;
        container[obj.y][obj.x] = parseInt(val);
      }
    }
  }
}

// Reset function
function reset() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '';
  }
  for (var i = 36; i < squares.length; i++) {
    squares[i].classList.add('gray');
  }
}

// Play button
var start = document.createElement("div");
start.classList.add("button", "hover");
start.innerHTML = "Start";
start.addEventListener("click", startgame);

function startgame() {
  playing = 1;
  temp = 0;
  moves.classList.remove('gray');
  test.classList.add('hover');
  setKey();
  reset();
  hide_result();
  updatemove();
}

// Other buttons
var home = document.createElement('div');
var more = document.createElement('div');
var histbox = document.createElement('div');
var moves = document.createElement('div');
home.classList.add('button', 'hover');
more.classList.add('button', 'hover');
histbox.classList.add('rulebox');
moves.classList.add('button', 'gray');
action.appendChild(home);
action.appendChild(more);
action.appendChild(histbox);
action.appendChild(start);
action.appendChild(test);
action.appendChild(moves);
home.innerHTML = 'Home';
more.innerHTML = 'More';
moves.innerHTML = 'Attempt';
histbox.innerHTML = 'Mastermind is based on an older game called “Bulls and Cows” and is originally a two-player game. Its first electronic apperance was around 1960 on a computer system at Cambridge University.The objective is to guess a 4-digit sequence in no more than 9 attemps, each attemps is replied with the number of correct digits in the right and wrong position. The digits are from 1 to 6.<br><br>CONTROL:<br><br> - Click "Start" to start!<br> - Click the squares to insert the numbers of your guess. It is only allowed to press the squares in the leftmost column that have not been replied. Re-click a square to un-choose it.<br> - Click "Check", or press Enter, to check a column once you have filled all the four squares in one of them.<br> - You have nine attempts to crack the code.<br> - Enjoy the game!';
histbox.style.marginBottom = '0.2vw';
home.style.paddingRight = '10.34vw';

// Moves
function updatemove() {
  moves.innerHTML = 'Attempt: ' + String(temp + 1);
}

// Link functions
home.addEventListener('click', homepage);
more.addEventListener('click', wikipage);
function homepage() {
  location.replace('index_main.html');
}
function wikipage() {
  window.open('https://en.wikipedia.org/wiki/Mastermind_(board_game)', '_blank');
}

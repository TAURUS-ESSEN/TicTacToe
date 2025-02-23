'use strict';
const Gameboard = {
    gameboard:  Array(9).fill(""),
    moveCounter: 0,
    currentPlayer: "x",
}

function createPlayer(name,marker) {
    return {
        name,
        marker,
    }
}

const gameControl = (function () {
    let moveCounter = 0;

    return {
        counterIncrement: function() {
            moveCounter++;
            console.log("moveCounter"+moveCounter);
        },
        counterDecrement: function() {
            moveCounter--;
            console.log("moveCounter"+moveCounter);
        },
        counterShow: function() {
            return moveCounter;
        }
    };
})();
  
const player1 = createPlayer("Vasya", "x");
const player2 = createPlayer("Ira", "o");

let gameboard = Gameboard.gameboard; 
let moveCounter = gameControl.counterShow();
let marker =  Gameboard.currentPlayer;

round(gameboard, moveCounter);

function round(gameboard, moveCounter) {
    for (let i = 0; i < 9; i++) { 
        console.log("--------------------------");
        console.log("ИИИИ ТЕКУУУЩИЙ СЧЕТЧИК ЗАЦИКЛЕННЫЙ" +gameControl.counterShow());
        console.log("Ход #" +gameControl.counterShow());
        marker = (i % 2==0) ? "x" : "o";

        let randomNumber = Math.floor(Math.random() * 9);
        console.log("случайная позиция в массиве "+randomNumber);
    
        if (gameboard[randomNumber] == "") {
            console.log("позиция свободная, идет запись в массив")
            gameboard[randomNumber] = marker;  
            gameControl.counterIncrement();
            console.log("доска на #"+gameControl.counterShow(), gameboard);
            let result = (checkResult(gameboard, gameControl.counterShow())); 
            if (result == "win") {
                winMessage(gameControl.counterShow(), marker);
                break;  
            }
            
            if (result == "draw") {
                drawMessage();
                break;  
            }
        }

        else {
            console.log("позиция занята, перезапуск итерации")
            i--;
          //  moveCounter--;
           // gameControl.counterDecrement();
        }
    }
}

function checkResult(gameboard, moveCounter) {
    console.log("--------------------------");
    console.log("проверка хода #" +moveCounter);

// check lines    
for (let i = 0; i < 9; i += 3) {
    let threeInRow = gameboard.slice(i, i + 3);
    console.log(`проверяем по строкам`);
    console.log(threeInRow);
    if (threeInRow.every(el => el !== "")) {
        if (new Set(threeInRow).size === 1) {
            return "win";
        }
    }
}

// check columns
for (let i = 0; i < 3; i += 1) {
    let threeInColumn = [gameboard[i],gameboard[i+3],gameboard[i+6]];
    if (threeInColumn.every(el => el !== "")) {
    if (new Set(threeInColumn).size === 1 ) {
       return "win";
    }
  }
}  
// check diagonals
  let leftToRightDiagonal= [gameboard[0],gameboard[4],gameboard[8]];
  if (leftToRightDiagonal.every(el => el !== "")) {
  if (new Set(leftToRightDiagonal).size === 1) {
        return "win";
    }
 }

let rightToLeftDiagonal= [gameboard[2],gameboard[4],gameboard[6]];
if (rightToLeftDiagonal.every(el => el !== "")) {
if (new Set(rightToLeftDiagonal).size === 1) {
        return "win";
}
}

// check draw
if (!gameboard.includes("")) {
    console.log("теперь доска"+gameboard);
    return `draw`;
}
} 

function winMessage(moveCounter, marker) {
    marker == player1.marker ? console.log("победил " +player1.name) :  console.log("победил " +player2.name);
    console.log("тут будет текст про победу. Игра закончена на #"+moveCounter + " Победа за " +marker);
}

function drawMessage() {
    console.log("Ничья");
}

function test(currentButton) {
   // alert("Rabotaet");
  // console.log(btn0);
    currentButton.textContent="X";
    console.log(currentButton.id);
}

const btn0 = document.getElementById("button0");
btn0.addEventListener("click", function() {
   test(btn0) })
const btn1 = document.getElementById("button1");
btn1.addEventListener("click", function() {
    test(btn1) })
const btn2 = document.getElementById("button2")
btn2.addEventListener("click", function() {
    test() })
const btn3 = document.getElementById("button3");
btn3.addEventListener("click", function() {
    test() })
const btn4 = document.getElementById("button4");
btn4.addEventListener("click", function() {
    test() })
const btn5 = document.getElementById("button5");
btn5.addEventListener("click", function() {
    test() })
const btn6 = document.getElementById("button6");
btn6.addEventListener("click", function() {
    test() })
const btn7 = document.getElementById("button7");
btn7.addEventListener("click", function() {
    test() })
const btn8 = document.getElementById("button8");
btn8.addEventListener("click", function() {
    test() })
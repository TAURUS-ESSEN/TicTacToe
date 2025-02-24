'use strict';
const Gameboard = {
    gameboard:  Array(9).fill(""),
   // moveCounter: 0,
    //currentPlayer: "X",
    gameboardReset: function() {
        gameboard = Array(9).fill("")
    },

    

}

function createPlayer(name,marker) {
    return {
        name,
        marker,
    }
}

const gameControl = (function () {
    let moveCounter = 0;
    let currentPlayer = "X";
    return {
        counterIncrement: function() {
            moveCounter++;
        },
        counterDecrement1: function() {
            moveCounter--;
        },
        counterShow: function() {
            return moveCounter;
        },
        currentPlayerChange: function() {
            currentPlayer = (moveCounter % 2==0) ? "X" : "O";
            return currentPlayer; 
        },
        gameReset: function() {
            moveCounter = 0;
            currentPlayer = "X";
        },
    };
})();
  
const player1 = createPlayer("Vasya", "X");
const player2 = createPlayer("Ira", "O");

//сокращения

let gameboard = Gameboard.gameboard; 
let moveCounter = gameControl.counterShow;
//let marker =  Gameboard.currentPlayer;
 

function makeTurn(currentButton) {
    if (gameboard[currentButton.value] === "") {
        currentButton.textContent = gameControl.currentPlayerChange(); 
        if (gameControl.currentPlayerChange() == "X") {
            currentButton.style.color = "blue";
        }
        if (gameControl.currentPlayerChange() == "O") {
            currentButton.style.color = "red";
        }
      //  console.log("Доска до нажатия ", gameboard);
        console.log("счетчик до =", moveCounter());
        gameboard[currentButton.value] = gameControl.currentPlayerChange();
        console.log("доска после нажатия = ", gameboard);
       
        
        currentButton.disabled = "true"
        let result1 =checkResult1(gameboard, moveCounter());
            if (result1 == "win") {
                 winMessage(moveCounter(), gameControl.currentPlayerChange()); 
            }
            if (result1 == "draw") {
                drawMessage();     
            } 
        gameControl.counterIncrement();
        console.log("счетчик ПОСЛЕ =", moveCounter());
    }
}

function checkResult1(gameboard, moveCounter) {
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
    console.log(`проверяем по столбцам`);
    console.log(threeInColumn);
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

function createNewButton() {
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "New Game";
    resetBtn.classList = "resetBtn";
    document.getElementById("endGame").appendChild(resetBtn);
    resetBtn.addEventListener("click", function() {
        reset() })
}

function reset() {
    Gameboard.gameboardReset();
    console.log("сброс доски = ", gameboard);
    document.getElementById("endGame").remove();
    document.querySelectorAll(".gameButton").forEach(function(button) {
        button.disabled = false;
        button.textContent = "";
        gameControl.gameReset();
      });
     

}

function winMessage(moveCounter, marker) {
    marker == player1.marker ? console.log("победил " +player1.name) :  console.log("победил " +player2.name);
    let winner = marker == player1.marker ? player1.name : player2.name
    //console.log("тут будет текст про победу. Игра закончена на #"+moveCounter + " Победа за " +marker);
    document.getElementById("footer").innerHTML = `<div id="endGame"><p>Player ${winner} wins</p></div>`;
    document.querySelectorAll(".gameButton").forEach(function(button) {
        button.disabled = true;
      });
     
    createNewButton()
 
}

function drawMessage() {
    console.log("Ничья");
    document.getElementById("footer").innerHTML = `<div id="endGame"><p>Draw</p></div>`;
    createNewButton()
}


const btn0 = document.getElementById("button0");
btn0.addEventListener("click", function() {
   makeTurn(btn0) })
const btn1 = document.getElementById("button1");
btn1.addEventListener("click", function() {
    makeTurn(btn1) })
const btn2 = document.getElementById("button2")
btn2.addEventListener("click", function() {
    makeTurn(btn2) })
const btn3 = document.getElementById("button3");
btn3.addEventListener("click", function() {
    makeTurn(btn3) })
const btn4 = document.getElementById("button4");
btn4.addEventListener("click", function() {
    makeTurn(btn4) })
const btn5 = document.getElementById("button5");
btn5.addEventListener("click", function() {
    makeTurn(btn5) })
const btn6 = document.getElementById("button6");
btn6.addEventListener("click", function() {
    makeTurn(btn6) })
const btn7 = document.getElementById("button7");
btn7.addEventListener("click", function() {
    makeTurn(btn7) })
const btn8 = document.getElementById("button8");
btn8.addEventListener("click", function() {
    makeTurn(btn8) })
'use strict';
const Gameboard = {
    gameboard:  Array(9).fill(""),
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
    let isRobot = false;
    return {
        counterIncrement: function() {
            moveCounter++;
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
        updateRobotStatus: function(checkbox) {
            isRobot = checkbox;
            return isRobot;
        },
    };
})();

const displayController = (function() { 
    // set listeners for all buttons on gameboard
    const buttons = document.querySelectorAll(".gameButton");
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            makeTurn(event.target);   
        });
    });

    const inputPlayer1Name = document.getElementById("player1Name");
    inputPlayer1Name.addEventListener("change", function(){
        player1.name = inputPlayer1Name.value;
    });

    const inputPlayer2Name = document.getElementById("player2Name");
    inputPlayer2Name.addEventListener("change", function(){
        player2.name = inputPlayer2Name.value;
    });

    const checkbox = document.getElementById("robot");
    checkbox.addEventListener("change", function(){
    gameControl.updateRobotStatus(checkbox.checked);
});


    function deactivateAllInputs() {
    document.querySelectorAll("input").forEach(function(input) {
        input.disabled = true; }); // When the game starts, all inputs are deactivated
    }

    function markerDisplay(currentButton) {
        currentButton.textContent = currentMarker(); 
        currentButton.style.color = (moveCounter() %2 == 0) ? "blue" : "red";
        currentButton.disabled = "true"; 
    }

    function createNewButton() {
        const newGameBtn = document.createElement("button");
        newGameBtn.textContent = "New Game";
        newGameBtn.classList = "newGameBtn";
        document.getElementById("endGame").appendChild(newGameBtn);
        newGameBtn.addEventListener("click", function() {
            displayController.reset() 
        })
    }

    function drawMessage() {
        document.getElementById("footer").innerHTML = `<div id="endGame"><p>Draw</p></div>`;
        createNewButton();
    }

    function winMessage(currentMarker) {
        let winner = currentMarker == player1.marker ? player1.name : player2.name
         document.getElementById("footer").innerHTML = `<div id="endGame"><p> ${winner} wins</p></div>`;
         document.querySelectorAll(".gameButton").forEach(function(button) {
             button.disabled = true;
           });
         createNewButton();
     }

     
    function reset() {
        Gameboard.gameboardReset();
        console.log("board reset = ", gameboard);
        document.getElementById("endGame").remove();
        document.querySelectorAll(".gameButton").forEach(function(button) {
            button.disabled = false;
            button.textContent = "";
            gameControl.gameReset();
        });
        document.querySelectorAll("input").forEach(function(input) {
            input.disabled = false;
        });     
    }
          
    return {
        createNewButton,
        drawMessage,
        winMessage,
        reset,
        deactivateAllInputs,
        markerDisplay,
    }

})()
  
const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

let gameboard = Gameboard.gameboard; 
let moveCounter = gameControl.counterShow;
let currentMarker = gameControl.currentPlayerChange; 

function makeTurn(currentButton) {
    if (gameboard[currentButton.value] === "") {
        displayController.deactivateAllInputs();
        displayController.markerDisplay(currentButton);  
        gameboard[currentButton.value] = currentMarker(); // array[index] = X or O
     
        let result = checkResult(gameboard); // check win oder draw
            if (result == "win") {
                 displayController.winMessage(currentMarker()); 
            }
            if (result == "draw") {
                displayController.drawMessage();     
            } 

        gameControl.counterIncrement(); //  counter +1
      
        if (gameControl.updateRobotStatus(document.getElementById("robot").checked) == true) { // play with robot?
            if (result == "win") {
                displayController.winMessage(currentMarker); 
                return;
            }

            if (!gameboard.includes("")) {
                displayController.drawMessage();
                return;
            }
            setTimeout(() => {
                robotTurn();
            }, 500);  // Delay in displaying the computer's response for smoother gameplay.
        }
    }
}

function robotTurn() {
    let currentMarker = gameControl.currentPlayerChange();
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 9); //random index number from 0 ... 8
    } while (gameboard[randomIndex] !== "");  

    gameboard[randomIndex] = currentMarker;     //array[random index] = O

    let currentButton1 = document.querySelector(`button[value="${randomIndex}"]`); // select buttom with value = randomIndex
    displayController.markerDisplay(currentButton1);
    gameControl.counterIncrement();// counter +1
    let result =checkResult(gameboard); // // check win oder draw
    if (result == "win") {
         displayController.winMessage(moveCounter(), currentMarker); 
    }
    if (result == "draw") {
         displayController.drawMessage();     
    } 
}

function checkResult(gameboard) {
// check lines    
    for (let i = 0; i < 9; i += 3) {
        let threeInRow = gameboard.slice(i, i + 3);
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
        console.log("gameboard", gameboard);
        return `draw`;
    }
} 
 
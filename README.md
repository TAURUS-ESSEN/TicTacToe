 
# Tic-Tac-Toe Game

This is a **Tic-Tac-Toe** game implemented using **HTML**, **CSS**, and **JavaScript**. The project follows the principles of **modular JavaScript architecture** using **IIFE (Immediately Invoked Function Expressions)** and **factory functions** to ensure clean and maintainable code. The game can be played in a browser with two players or against a computer.

---

## Features

- **Two game modes**:
  - Player vs. Player
  - Player vs. Computer (activated by checking the "Play with Computer" checkbox)
- **Dynamic UI updates** without page reloads
- **Responsive design** for different screen sizes
- **Minimal global variables** to ensure modularity
- **Restart button** to easily start a new game
- **Player name customization**

---

## Technologies Used

- **HTML**: For structuring the game board and user inputs
- **CSS**: For styling the game layout and responsiveness
- **JavaScript**:
  - **IIFE (Immediately Invoked Function Expressions)** for modular architecture
  - **Factory functions** for player objects
  - **Event listeners** for interactive gameplay

---

## Project Architecture

The project follows a **modular architecture** with the following structure:

- **Gameboard Module**:
  - Stores the game state as an array
  - Manages the game board's data and state
- **gameControl Module**:
  - Handles the game's logic, including player turns, win conditions, and the game's flow
- **displayController Module**:
  - Manages all DOM manipulations, including rendering the game board, showing messages, and resetting the game

This architecture ensures **clear separation of concerns** and **high maintainability**.

---

## How to Play

1. **Enter player names** in the input fields (optional).
2. **Choose to play against another player** or **against the computer** by checking the "Play with Computer" checkbox.
3. **Click on a square** on the game board to place your marker ("X" or "O").
4. **Alternate turns** between players.
5. **The game checks for win conditions** after each move:
   - Rows, columns, or diagonals with the same marker.
   - If all squares are filled without a winner, the game declares a **Draw**.
6. **A message displays the winner** or **a draw**, and a **New Game** button appears to restart the game.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tic-tac-toe.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd tic-tac-toe
   ```
3. **Open index.html** in your browser to start playing.

---

## Live Demo

You can play the game **[here](https://taurus-essen.github.io/TicTacToe/)**.

---

## Future Enhancements

- Add **score tracking** for multiple rounds
- Implement **difficulty levels** for the computer AI
- Enhance the **user interface with animations** and transitions

## License

This project is licensed under the **MIT License**.

---

## Acknowledgments

- Project inspired by **The Odin Project** curriculum
- Special thanks to **Mentors** and **Peers** for feedback and support.

**Enjoy the game!**

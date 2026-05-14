# Tetris-js

A simple tetris clone that runs in the browser

## 📄 Description

```javascript
class Tetromino;
class GameBoard;
class UI;
```

The game revolves around these main classes. ```Gameboard``` stores the current state of the game grid in a matrix. The ```UI``` handles all visual representation and keyboard input. ```Tetromino``` is the base class that the specialised tetromino classes inherit behaviour from that is specifically necessary for collision detection. The specialised tetromino classes like the gameboard class, also represent their shape information in matrices.  When a tetromino completes its vertical descent down the grid, the ui instance transmits its coordinate information to the gameboard instance. The gameboard method associated with tetromino placement, ```placeTetromino(rowCoord, columnCoord, tetrominoShape)```, takes the coordinate data and along with the tetromino instance, iterates through the tetromino matrix to update the gameboard matrix with the positive number values that are meant to represent the positive space inside a tetromino. The collision detection logic then queries the gameboard grid; positive number values are associated with occupied cells that the current falling tetromino must respect and collide with.

## 🧰 Languages and tools

[![languages and tools](https://skillicons.dev/icons?i=js,html,css,webpack,tailwind)](https://skillicons.dev)

## 📌 To do

- Levels that increase in difficulty; higher levels must be associated with faster vertical descent.  
- Fail screen that displays score and level reached, with a 'try again' button that reinitialises the game.  
- Back button in the main screen that returns to the start screen.

## 📷 Demo

## 🚧 Installation and usage

```bash
git git@github.com:lmaqungo/tetris-js.git
cd tetris-js
npm install
npm run dev
```

## 🧠 Project insights

- Significantly sharpened my ability to **mathematicize** game scenes and objects by representing them in data structures like arrays and objects. This process enables all the game objects to communicate with each other in a common mathematical language. Obviously any developer intuitively knows that this is necessary to build any project, but I have never had to apply that intuition to this extent. This ability will be especially beneficial for my future aspirations in exploring game development, and programming more broadly as it opens a whole new world of possibility with regards to the scale of real world scenarios that I can attempt to represent on a computer. Everything is just a list that needs iterating. I had a major Eureka moment beyond the magnitude that I’ve experienced on any React project that I’ve worked on, where I realised that any program is really just an ordered sequence of numbers, and my ultimate goal as a developer beyond writing actual syntax is to develop ingenious ways of transforming a real life idea numbers that you can perform maths operations on.
- **State management**: Coming from a React context where components automatically ‘react’ to a state variable change without much input from the developer, this project challenged me to solve the state management issue, specifically with regards to how the game should transition from the start screen to the playing screen. In my case, this ultimately led to making a function with a switch statement that is called alongside a particular state value; each state value is associated with function calls that correspond with the two game states.

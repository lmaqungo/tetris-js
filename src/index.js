import UI from "./classes/userInterface.js";
import "./styles.css";
import GameBoard from "./classes/gameboard.js";

const gameBoard = new GameBoard();
const ui = new UI(gameBoard.columns, gameBoard.rows);


ui.startScreen(switchGameState);

function switchGameState(state) {
    switch(state){
        case 1:
            ui.initialiseGameEnvironment(); 
            const running = true;
            if(running) {
                run();
            }
            break;
    }
}

async function run() {
    console.log('start game')
    while(true) {
        const tetromino = gameBoard.getTetromino();
        const nextTetromino = gameBoard.getQueuedTetromino();
        ui.calculateQueuedShapeContainer(nextTetromino);
        const coordinates = await ui.drawTetromino(tetromino, gameBoard);
        gameBoard.placeTetromino(coordinates.row, coordinates.column, tetromino.shape)
        if(gameBoard.checkFilledRows()){
            ui.clearRow(gameBoard);
        }
        if(gameBoard.checkFilledColumn()){
            console.log('a column has been filled!')
            break
        }
    }
    console.log(gameBoard.toString());
    console.log('end game');
};




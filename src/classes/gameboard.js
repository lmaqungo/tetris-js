import OmegaTetromino from "./tetromino/omegaTetromino.js";
import IotaTetromino from "./tetromino/iotaTetromino.js";
import TauTetromino from "./tetromino/tauTetromino.js";
import SigmaTetromino from "./tetromino/sigmaTetromino.js";
import LambdaTetromino from "./tetromino/lambdaTetromino.js";

class GameBoard {
    grid = []; 
    columns;
    rows;
    score = 0;
    highScore = 0;
    tetrominoQueue = [IotaTetromino, OmegaTetromino, TauTetromino, SigmaTetromino, LambdaTetromino]; 
    tetrominoSelectorIndex = 0;
    colorId = 1;

    constructor(rows=20, columns=10) {
        this.rows = rows;
        this.columns = columns;
        for(let x = 0; x < rows; x++) {
            let rowsArr = []
            for(let y = 0; y < columns; y++) {
                rowsArr.push(0)
            }
            this.grid.push(rowsArr)
            rowsArr = []
        }
    }

    get grid() {
        return this.grid;
    }

    set grid(input) {
        this.grid = input
    }

    toString() {
        let gridString = ''; 
        let horizontalAxis = '   ';
        for(let x = 0; x < this.columns; x++) {
            if(x === this.columns-1) {
                horizontalAxis += `${x+1}\n`
            } else {
                horizontalAxis += `${x+1} `
            }
        }
        gridString += horizontalAxis
        this.grid.forEach((row, rowIndex) => {
            const rowNumber = rowIndex + 1
            if(rowNumber.toString().length > 1) {
                gridString += `${rowNumber} `
            } else {
                gridString += `${rowNumber}  `
            }
            gridString += row.join(" ")
            if(rowIndex < this.grid.length - 1) {
                gridString += '\n'
            }
        })
        return gridString
    }

    placeTetromino(rowCoord, columnCoord, tetrominoShape) {
        tetrominoShape.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if(cell > 0) {
                    this.grid[(rowCoord) + rowIndex][(columnCoord) + columnIndex] = cell
                }
            })
        })
        console.log(this.toString())
    }

    isQuadrantEmpty(rowCoord, columnCoord, tetrominoShape) {
        return tetrominoShape.every((row, rowIndex) => {
            return row.every((cell, columnIndex) => {
                return this.grid[(rowCoord - 1) + rowIndex][(columnCoord - 1) + columnIndex] === 0
            })
        })
    }

    getTetromino() {
        const tetroClass = this.tetrominoQueue[this.tetrominoSelectorIndex];
        const tetroObj = new tetroClass(this.colorId);
        if(this.tetrominoSelectorIndex === this.tetrominoQueue.length - 1){
            this.tetrominoSelectorIndex = 0
        } else{
            this.tetrominoSelectorIndex+=1
        }

        if(this.colorId === 6){
            this.colorId = 1
        } else {
            this.colorId++
        }
        return tetroObj
    }

    getQueuedTetromino(){
        const nextTetrominoIndex = this.tetrominoSelectorIndex;
        const nextColorId = this.colorId;
        
        const tetrominoClass = this.tetrominoQueue[nextTetrominoIndex];
        const tetrominoObj = new tetrominoClass(nextColorId);
        return tetrominoObj
    }

    checkFilledRows(){
        let counter = 0;
        let gridPartition = [...this.grid]
        this.grid.forEach((row, rowIndex) => { 
            if(row.every((cell) => {
                return cell !== 0
            })) {
                gridPartition.splice((rowIndex-counter), 1); 
                console.log(`row ${rowIndex} filled!`)
                counter++
            }
        })
        if(counter > 0) {
            this.shiftGrid(gridPartition, counter);
            this.score+= counter * 2;
            return true
        }
        return false
    }

    checkFilledColumn() {
        for(let col = 0; col < this.columns; col++) {
            const colMemory = []; 
            this.grid.forEach((row) => {
                colMemory.push(row[col])
            })
            if(colMemory[0] > 0){
                return true
            }
        } 
        return false
    }

    shiftGrid(gridPartition, counter){
        const newGrid = [];
        for(let count = 0; count < counter; count++) {
            const newRow = []
            for(let x = 0; x < this.columns; x++) {
                newRow.push(0)
            }
            newGrid.push(newRow)
        }
        this.grid = newGrid.concat(gridPartition); 
    }

    getHighestCellRow(columnsArrInput){
        const rows = []; 
        columnsArrInput.forEach((columnIndex) => {
            for(let col = 0; col < this.columns; col++) {
                const columnArr = []; 
                this.grid.forEach(row => columnArr.push(row[col]));
                
                if(columnIndex === col){
                    rows.push(columnArr.findIndex(cell => cell > 0))
                }
            }
        })
        return Math.min(...rows)
    }
    
}


export default GameBoard




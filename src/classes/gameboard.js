import OmegaTetromino from "./tetromino/omegaTetromino.js"
import IotaTetromino from "./tetromino/iotaTetromino.js";

class GameBoard {
    grid = []; 
    columns;
    rows;
    score = 0;
    highScore = 0;

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
        const color = Math.floor(Math.random() * 6) + 1;
        return new IotaTetromino(color)
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
            this.shiftGrid(gridPartition, counter)
        }
    }

    checkFilledColumn() {
        for(let col = 0; col < this.columns; col++) {
            const colMemory = []; 
            this.grid.forEach((row) => {
                colMemory.push(row[col])
            })
            if(colMemory.every((element) => element > 0)) {
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
    
    play() {
        while(true) {
            const coordinates = [[1, 1], [3, 1], [5, 1], [7, 1], [9, 3]]; 
            coordinates.forEach((coordinate) => {
                const omega = new OmegaTetromino(2); 
                const placeResult =  this.placeTetromino(coordinate[0], coordinate[1], omega.shape); 
                if(placeResult) {
                    console.log(this.toString())
                    console.log('check filled rows:'); 
                    this.checkFilledRows(); 
                    console.log(this.toString());
                    console.log('\n')
                    if(this.checkFilledColumn()) {
                        console.log('You lose! You lose Tony Stark!'); 
                        return
                    }
                    
                }
            })
            break;
        }
    }

}


export default GameBoard




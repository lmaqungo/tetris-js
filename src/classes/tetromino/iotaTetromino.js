import Tetromino from "./tetromino.js";

class IotaTetromino extends Tetromino {
    shape; 
    frame; 
    colorId;
    width;
    rightmostCol; 
    leftmostCol;

    constructor(id, frame=1) {
        super(); 
        this.colorId = id;
        
        this.frame = this.getRandomFrame(frame); 
        this.updateShape()
    }

    updateShape() {
        const id = this.colorId
        switch(this.frame) {
            case 1: 
                this.shape = [
                    [0, id, 0, 0], 
                    [0, id, 0, 0], 
                    [0, id, 0, 0], 
                    [0, id, 0, 0]
                ]; 
                this.width = 1;
                this.rightmostCol = 1;
                this.leftmostCol = 1;
                break;
            case 2: 
                this.shape = [
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [id, id, id, id]
                ]; 
                this.width = 4;
                this.rightmostCol = 3;
                this.leftmostCol = 0;
                break;
            case 3: 
                this.shape = [
                    [0, 0, id, 0], 
                    [0, 0, id, 0], 
                    [0, 0, id, 0], 
                    [0, 0, id, 0]
                ]; 
                this.width = 1;
                this.rightmostCol = 2;
                this.leftmostCol = 2;
                break;
            case 4: 
                this.shape = [
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [id, id, id, id]
                ]; 
                this.width = 4;
                this.rightmostCol = 3;
                this.leftmostCol = 0;
                break;
        }
    }

    getRightMostCells(){
        const rightCells = []
        this.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if(cell > 0) {
                    if(colIndex === this.rightmostCol){
                        rightCells.push(
                            {
                                row: rowIndex,
                                col: colIndex
                            }
                        )
                    }
                }
            })
        })
        return rightCells
    }

    getLeftMostCells() {
        const leftCells = []; 
        this.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if(cell > 0) {
                    if(colIndex === this.leftmostCol) {
                        leftCells.push({
                            row: rowIndex, 
                            col: colIndex
                        })
                    }
                }
            })
        })
        return leftCells
    }

    get shape() {
        return this.shape
    }

    set shape(input) {
        this.shape = input
    }

    rotate() {
        this.frame = this.incrementFrame(this.frame); 
        this.updateShape()
    }

    toString() {
        let shapeString = ''; 
        this.shape.forEach((row, rowIndex) => {
            let rowString = ''; 
            row.forEach((cell) => {
                if(cell === 0){
                    rowString+= ' '
                } else{
                    rowString += cell
                }
            })
            shapeString+= rowString
            if(rowIndex < this.shape.length - 1) {
                shapeString+= '\n'
            }
        })
        return shapeString
    }
}

for(let i = 1; i < 5; i ++) {
    const iota = new IotaTetromino(i, i); 
    console.log(iota.toString())
    
    iota.getRightMostCells().forEach((coord) => {
        console.log(`row: ${coord.row}, col: ${coord.col}`)
    })
}


export default IotaTetromino
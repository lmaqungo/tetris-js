import Tetromino from "./tetromino.js";

class LambdaTetromino extends Tetromino {
    shape; 
    

    constructor(id) {
        super(); 
        this.shape = [
            [id, 0, 0], 
            [id, 0, 0], 
            [id, id, 0]
        ]; 
       
    }

    get shape(){
        return this.shape
    }

    set shape(input) {
        this.shape = input
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

export default LambdaTetromino


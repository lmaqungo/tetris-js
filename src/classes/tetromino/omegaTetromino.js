import Tetromino from "./tetromino.js";

class OmegaTetromino extends Tetromino {
    shape;
    constructor(id){
        super(); 
        this.shape = [
            [id, id], 
            [id, id]
        ]
    }

    get shape(){
        return this.shape
    }

    set shape(input){
        this.shape = input
    }

    toString() {
        let shapeString = ''
        this.shape.forEach((row, rowIndex) => {
            shapeString+= row.join("")
            if(rowIndex < this.shape.length - 1 ){
                shapeString+= '\n'
            }
        })
        return shapeString
    }
}

export default OmegaTetromino



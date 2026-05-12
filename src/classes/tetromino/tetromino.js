
class Tetromino {

    constructor(){
        if(new.target === Tetromino) {
            throw new TypeError('Tetromino is an abstract class')
        }
    }

    get shape(){
        return this.shape
    }

    set shape(input) {
        this.shape = input
    }

    getRandomFrame(frame=null) {
        if(frame){
            return frame
        } else {
            return Math.floor(Math.random() * 4) + 1
        }
    }

    incrementFrame(startFrame) {
        let frame = startFrame; 
        if(frame === 4) {
            frame = 1
        } else {
            frame += 1
        }
        return frame;
    }

    getRightCells(){
        const rightCells = []
        this.shape.forEach((row, rowIndex) => {
            const lastCellCol = row.findLastIndex(element => element > 0)
            if(lastCellCol > -1) {
                rightCells.push({
                    row: rowIndex, 
                    col: lastCellCol
                })
            }
        })
        return rightCells
    }

    getLeftCells() {
        const leftCells = []; 
        this.shape.forEach((row, rowIndex) => {
            const firstCellCol = row.findIndex(element => element > 0)
            if(firstCellCol > -1) {
                leftCells.push({
                    row: rowIndex, 
                    col: firstCellCol
                })
            }
        })
        return leftCells
    }

    getBottomCells(){
        const bottomCells = []; 
        for(let col = 0; col < this.shape.length; col++) {
            const columnArr = [];
            this.shape.forEach((row) => {
                columnArr.push(row[col])
            })
            const lastCellRow = columnArr.findLastIndex(element => element > 0); 
            if(lastCellRow > -1){
                bottomCells.push(
                    {
                        row: lastCellRow, 
                        col: col
                    }
                )
            }
        }
        return bottomCells
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

export default Tetromino
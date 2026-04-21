import OmegaTetromino from "./tetromino/omegaTetromino.js";
import IotaTetromino from "./tetromino/iotaTetromino.js";

class UI {
    cellSize;
    rows;
    columns;
    grid; 
    horizontalControl = 0;
    
    constructor(cellSize=24, columns=10, rows=20) {
        this.cellSize = cellSize; 
        this.rows = rows; 
        this.columns = columns;
        const body = document.querySelector('body'); 
        body.classList.add('flex', 'justify-center', 'items-center', 'h-screen', 'gap-1'); 
        
        this.grid = document.createElement("div"); 
        const dimensions = {
            width:`${cellSize * columns}px`,
            height:`${cellSize * rows}px`
        }
        this.grid.style.height = dimensions.height
        this.grid.style.width = dimensions.width
        this.grid.classList.add('outline-2', 'outline-black', 'bg-cyan-500');
        this.grid.style.position = "relative"
        
        body.appendChild(this.grid)
        const testOmega = new OmegaTetromino(4); 
        const testIota = new IotaTetromino(1); 
        this.drawTetromino(testIota); 
        
    } 

    drawTetromino(tetromino){
        const shapeContainer = document.createElement('div'); 
        
        shapeContainer.style.display = "grid"; 
        shapeContainer.style.gridTemplateColumns = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        shapeContainer.style.gridTemplateRows = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        shapeContainer.style.position = "absolute"; 

        const endAnimationPosition = (this.rows - (tetromino.shape.length));

        console.log(`end vertical position: ${endAnimationPosition}`)

        /* 
            this 2 will represent the number of cells below the falling piece in a particular column
            Will change upon every horizontal input. fn getOccupiedCells(column) => number. Will call
            in the event listener. The fall animation fn will need to accept a new endPosition upon every
            input event
        */


        /* 
        This end position can be recalculated upon every horizontal input event
        */
        
        tetromino.shape.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if(cell > 0) {
                    const cellElement = document.createElement('div'); 
                    cellElement.classList.add(this.getCellColor(cell));
                    cellElement.style.gridRowStart = `${rowIndex + 1}`; 
                    cellElement.style.gridRowEnd = `${rowIndex + 2}`;
                    cellElement.style.gridColumnStart = `${columnIndex + 1}`;
                    cellElement.style.gridColumnEnd = `${columnIndex + 2}`;
                    shapeContainer.appendChild(cellElement);
                }
            })
        })
        
        // shapeContainer.classList.add("outline");
        let leftShiftMultiplier = 0;

        /* 
            iterate through the rows of the tetromino 2d array
            keep record of each column
            if every cell in column is equal to 0, increment shift multiplier
            shift the horizontal offset using a multiple of the cellSize and the shift multiplier
        */

        for(let colIndex = 0; colIndex < tetromino.shape.length; colIndex++) {
            const column = []; 
            tetromino.shape.forEach((row) => {
                column.push(row[colIndex])
            })
            if(column.every(element => element === 0)) {
                leftShiftMultiplier += 1
            } else if(column.every(element => element !== 0)) {
                break
            }
        }

        const leftOrigin = (this.cellSize * leftShiftMultiplier) * -1

        shapeContainer.style.left = `${leftOrigin}px`;

        /* 
            Make the middle of the grid the starting point, then set the max and min
            of the horizontal move the negative and positive of this.columns
            use this line: (this.columns / 2 * this.cellSize)
        */

        let horizontalMove = 0; 

        shapeContainer.classList.add('outline');
        this.grid.appendChild(shapeContainer); 

        const playAnimation = true; 

        let verticalPosition = 0;

        if(playAnimation) {
            setTimeout(() => {
                    const animation = setInterval(() =>  {
                        verticalPosition += 1; 
                        shapeContainer.style.top = `${verticalPosition * this.cellSize}px`
    
                        if(verticalPosition === endAnimationPosition) {
                            /* this point I can call gameBoard.placeTetromino */
                            const horizontalPosition = (leftShiftMultiplier * -1 ) + horizontalMove
                            console.log(`horizontal: ${horizontalPosition}\nvertical: ${verticalPosition}`)
                            /* remove the eventListener from the shapeContainer*/
                            clearInterval(animation)
                        }
                    }, 500)
            }, 2000)
        }

        document.addEventListener('keydown' , (e) => {
            if (!e.repeat) {
                if(e.key === "ArrowLeft"){
                    console.log('left arrow clicked')
                    if(horizontalMove > 0) {
                        horizontalMove -= 1; 
                    }
                } else if(e.key === "ArrowRight") {
                    console.log('right arrow clicked')
                    if(horizontalMove < this.columns - 1) {
                        /* this -, currently hardcoded for the straight tetro will be account for the
                        width of the shape
                        */
                       horizontalMove += 1
                    }
                }
            }
            shapeContainer.style.left = `${leftOrigin + (horizontalMove * this.cellSize) }px`;

        })

    }

    tetrominoVerticalAnimation(tetrominoContainer) {
        return
    }

    getCellColor(colorId) {
        const colors = [
            'bg-red-500', 
            'bg-orange-400', 
            'bg-yellow-300', 
            'bg-lime-600', 
            'bg-blue-600', 
            'bg-violet-700'
        ]
        return colors[colorId-1]
    }
}

export default UI
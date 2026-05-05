
class UI {
    cellSize;  
    rows;  
    columns;  
    grid; 
    horizontalMove;  
    shapeContainer;  
    verticalPosition;
    leftShiftMultiplier;

    tetromino; 
    gameBoard;
    /*
        rename the properties by prepending a prefix that denotes if it belongs to the grid or the shapeContainer. 
        The shapeContainer properties will reset after every drawTetro fn call
    */
    
    constructor(columns=10, rows=20, cellSize=24, ) {
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
    } 

    drawTetromino(tetromino, gameBoard) {

        this.tetromino = tetromino; 
        this.gameBoard = gameBoard;

        this.horizontalMove = 0; 
        this.shapeContainer = document.createElement('div'); 
        
        this.shapeContainer.style.display = "grid"; 
        this.shapeContainer.style.gridTemplateColumns = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        this.shapeContainer.style.gridTemplateRows = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        this.shapeContainer.style.position = "absolute"; 

        this.calculateShapeContainer()
        
        this.calculateLeftShiftMultiplier()

        // this.shapeContainer.classList.add('outline'); 
        this.grid.appendChild(this.shapeContainer); 

        const playAnimation = true; 

        this.verticalPosition = 0;

        if(playAnimation) {
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        document.addEventListener('keydown', this)
                        const animation = setInterval(() =>  {
                            this.shapeContainer.style.top = `${this.verticalPosition * this.cellSize}px`; 
                            const nextCellRow = this.verticalPosition + this.tetromino.shape.length + 1; 

                            if(nextCellRow <= this.rows) {
                                
                                let nextFrameCollision;
                                for(let cell = 0; cell < this.tetromino.width; cell++) {
                                    const nextCell = this.gameBoard.grid[nextCellRow-1][this.horizontalMove + cell]; 
                                    if(nextCell > 0) {
                                        nextFrameCollision = true; 
                                        break;
                                    }
                                }

                                if(nextFrameCollision) {

                                    const horizontalPosition = (this.leftShiftMultiplier * -1 ) + this.horizontalMove
                                    document.removeEventListener('keydown', this)
                                    clearInterval(animation)

                                    resolve(
                                        {
                                            column: horizontalPosition,
                                            row: this.verticalPosition
                                        }
                                    )
                                } else {
                                    this.verticalPosition += 1; 
                                }
                            } 
                            
                            if(nextCellRow > this.rows) {
                                
                                const horizontalPosition = (this.leftShiftMultiplier * -1 ) + this.horizontalMove
                              
                                document.removeEventListener('keydown', this)
                                
                                resolve(
                                    {
                                        column: horizontalPosition,
                                        row: this.verticalPosition
                                    }
                                )
                                
                                clearInterval(animation)
                            }
                        }, 500)
                    } catch(err) {
                        reject(err)
                    }
                }, 2000)
            })
        }
    }

    tetrominoVerticalAnimation(tetrominoContainer) {
        return
    }

    calculateShapeContainer() {
        const divs = this.shapeContainer.querySelectorAll('div'); 
        if(divs.length > 0) {
            divs.forEach(cell => cell.remove())
        }

        this.tetromino.shape.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if(cell > 0) {
                    const cellElement = document.createElement('div'); 
                    cellElement.classList.add(this.getCellColor(cell));
                    cellElement.style.gridRowStart = `${rowIndex + 1}`; 
                    cellElement.style.gridRowEnd = `${rowIndex + 2}`;
                    cellElement.style.gridColumnStart = `${columnIndex + 1}`;
                    cellElement.style.gridColumnEnd = `${columnIndex + 2}`;
                    this.shapeContainer.appendChild(cellElement);
                }
            })
        })
    }

    clearRow(gameBoard){
        /* 
            remove all child divs
            create a new div that is gameBoard.columns * highest filled column(row number) in area
            shape will contain 0s, and other numbers greater than zero that represent the tetrominos
            make the div a grid container; use the calculateShapeContainer fn
            make it absolute, then use left:,bottom:0 
        */

        const tetrominos = this.grid.querySelectorAll('div'); 
        tetrominos.forEach(tetromino=> tetromino.remove()); 
        
        const tetrominoTower = document.createElement('div'); 

        tetrominoTower.style.display = "grid"; 
        tetrominoTower.style.gridTemplateColumns = `repeat(${this.columns}, ${this.cellSize}px)`; 
        tetrominoTower.style.gridTemplateRows = `repeat(${this.rows}, ${this.cellSize}px)`; 
        tetrominoTower.style.position = "absolute"; 
        tetrominoTower.style.left = '0px';
        tetrominoTower.style.bottom = '0px';

        gameBoard.grid.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if(cell > 0) {
                    const cellElement = document.createElement('div'); 
                    cellElement.classList.add(this.getCellColor(cell));
                    cellElement.style.gridRowStart = `${rowIndex + 1}`; 
                    cellElement.style.gridRowEnd = `${rowIndex + 2}`;
                    cellElement.style.gridColumnStart = `${columnIndex + 1}`;
                    cellElement.style.gridColumnEnd = `${columnIndex + 2}`;
                    tetrominoTower.appendChild(cellElement)
                }
            })
        })

        this.grid.appendChild(tetrominoTower); 
    }

    calculateLeftShiftMultiplier() {
        /*
            iterate through the rows of the tetromino 2d array
            keep record of each column
            if every cell in column is equal to 0, increment shift multiplier
            shift the horizontal offset using a multiple of the cellSize and the shift multiplier
        */
        this.leftShiftMultiplier = 0;

        for(let colIndex = 0; colIndex < this.tetromino.shape.length; colIndex++) {
            const column = []; 
            this.tetromino.shape.forEach((row) => {
                column.push(row[colIndex])
            })
            if(column.every(element => element === 0)) {
                this.leftShiftMultiplier += 1
            } else if(column.every(element => element !== 0)) {
                break
            }
        }
        /* 
            Make the middle of the grid the starting point, then set the max and min
            of the horizontal move the negative and positive of this.columns
            use this line: (this.columns / 2 * this.cellSize)
        */
        const leftOrigin = (this.cellSize * this.leftShiftMultiplier) * -1;

        this.shapeContainer.style.left = `${leftOrigin}px`;
    }

    handleEvent(e) {
        // change the e.key control flow into a switch statement
        if(e.type === 'keydown'){
            if (!e.repeat) {
                if(e.key === "ArrowLeft"){
                    // console.log('left arrow clicked')
                    // checks if we're clicking past the left boundary
                    if(this.horizontalMove > 0) {
                        /* 
                            if we're within the left boundary and there isn't a cell already on the gameBoard to the left of the bottom cell(s) then you can move to the left
                        */
                        
                        // bottom cell of tetromino
                        const bottomCellVerticalPosition = this.verticalPosition + this.tetromino.shape.length - 1;
                        const leftCell = this.gameBoard.grid[bottomCellVerticalPosition][this.horizontalMove - 1]; 
                        /* 
                            -1 to look for the cell to the left
                        */

                        if(leftCell === 0) {
                            this.horizontalMove -= 1; 
                        }
                    }
                } else if(e.key === "ArrowRight") {
                    // console.log('right arrow clicked')
                    // checks if we're clicking past the right boundary
                    if(this.horizontalMove < this.columns - this.tetromino.width) {
                        // this -1 should be the width of the shape, which changes per rotation

                         /* 
                            if we're within the right boundary and there isn't a cell already on the gameBoard to the right of the bottom cell(s) then you can move to the right
                        */

                        const bottomCellVerticalPosition = this.verticalPosition + this.tetromino.shape.length - 1;
                        const rightCell = this.gameBoard.grid[bottomCellVerticalPosition][this.horizontalMove + 1]; 

                        /* 
                            +1 to look to the right
                        */

                        if(rightCell === 0) {
                            this.horizontalMove += 1
                        }
                    }
                } else if (e.key === 'ArrowUp') {
                    this.tetromino.rotate();
                    this.calculateShapeContainer(); 
                    this.calculateLeftShiftMultiplier();
                    
                    const rightShift = this.horizontalMove + this.tetromino.width; 
                    if(rightShift > (this.columns - 1)){
                            this.horizontalMove = this.columns - (this.tetromino.width)
                        } 
                }

                this.shapeContainer.style.left = `${((this.leftShiftMultiplier * -1) + this.horizontalMove) * this.cellSize }px`;

            }
        }
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
        return colors[colorId- 1]
    }
}

export default UI
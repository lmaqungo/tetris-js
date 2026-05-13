
class UI {
    cellSize;  
    rows;  
    columns;  
    grid; 
    horizontalMove;  
    shapeContainer;  
    verticalPosition;
    leftShiftMultiplier;
    topShiftMultiplier;
    scoreDisplay;
    levelDisplay;

    tetromino; 
    gameBoard;
    /*
        rename the properties by prepending a prefix that denotes if it belongs to the grid or the shapeContainer. 
        The shapeContainer properties will reset after every drawTetro fn call
    */
    
    constructor(columns=10, rows=20, cellSize=24 ) {
        this.cellSize = cellSize; 
        this.rows = rows; 
        this.columns = columns; 
        const body = document.querySelector('body'); 
        body.classList.add('flex', 'justify-center', 'items-center', 'h-screen'); 

        const mainContainer = document.createElement('div'); 
        mainContainer.classList.add('flex', 'flex-col', 'gap-1', 'items-center');
        
        this.grid = document.createElement("div"); 
        const dimensions = {
            width:`${cellSize * columns}px`,
            height:`${cellSize * rows}px`
        }
        this.grid.style.height = dimensions.height
        this.grid.style.width = dimensions.width
        this.grid.classList.add('outline-2', 'outline-black');
        this.grid.style.position = "relative"

        const stats = document.createElement('div'); 
        stats.classList.add('bold', 'text-sm')

        this.scoreDisplay = document.createElement('p'); 
        this.scoreDisplay.textContent = `Score: ${0}`; 
        this.levelDisplay = document.createElement('p'); 
        this.levelDisplay.textContent = `Level: ${1}`; 

        stats.append(this.scoreDisplay)
        stats.append(this.levelDisplay)

        mainContainer.append(this.grid); 
        mainContainer.append(stats);    

        body.appendChild(mainContainer)
        
    } 

    drawTetromino(tetromino, gameBoard) {

        this.tetromino = tetromino;
        this.gameBoard = gameBoard;

        this.horizontalMove = Math.round(((9- this.tetromino.width)/2 ));
        this.shapeContainer = document.createElement('div'); 
        
        this.shapeContainer.style.display = "grid"; 
        this.shapeContainer.style.gridTemplateColumns = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        this.shapeContainer.style.gridTemplateRows = `repeat(${tetromino.shape.length}, ${this.cellSize}px)`; 
        this.shapeContainer.style.position = "absolute"; 

        this.calculateShapeContainer()
        
        this.calculateLeftShiftMultiplier()
        this.calculateTopShiftMultiplier()

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
                            this.shapeContainer.style.top = `${(this.verticalPosition + (this.topShiftMultiplier * -1)) * this.cellSize }px`; 

                            const nextCellRow = (this.verticalPosition + (this.topShiftMultiplier * -1)) + this.tetromino.shape.length + 1; 

                            if(nextCellRow <= this.rows) {
                                                                
                                const nextCells = []; 
                                this.tetromino.getBottomCells().forEach((coord) => {
                                    const bottomCell = this.gameBoard.grid[((this.verticalPosition + (this.topShiftMultiplier * -1)) + coord.row + 1)][((this.horizontalMove + (this.leftShiftMultiplier * -1)) + coord.col)];
                                    nextCells.push(bottomCell);
                                })

                                const nextFrameCollision = nextCells.some(cell => cell > 0)

                                if(nextFrameCollision) {

                                    document.removeEventListener('keydown', this)
                                    clearInterval(animation)

                                    resolve(
                                        {
                                            column: (this.leftShiftMultiplier * -1 ) + this.horizontalMove,
                                            row: this.verticalPosition + (this.topShiftMultiplier * -1)
                                        }
                                    )
                                } else {
                                    this.verticalPosition += 1; 
                                }
                            } 
                            
                            if(nextCellRow > this.rows) {
                                
                                document.removeEventListener('keydown', this)
                                
                                resolve(
                                    {
                                        column: (this.leftShiftMultiplier * -1 ) + this.horizontalMove,
                                        row: this.verticalPosition + (this.topShiftMultiplier * -1)
                                    }
                                )
                                
                                clearInterval(animation)
                            }
                        }, 400)
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

        this.scoreDisplay.textContent = `score: ${gameBoard.score}`; 

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
            } else if(column.some(element => element > 0)) {
                break
            }
        }

        this.shapeContainer.style.left = `${((this.leftShiftMultiplier * -1) + this.horizontalMove) * this.cellSize }px`;
    }

    calculateTopShiftMultiplier(){
        this.topShiftMultiplier = 0; 

        this.tetromino.shape.forEach((row) => {
            if(row.every(cell => cell === 0)){
                this.topShiftMultiplier+=1
            }
        })

        this.shapeContainer.style.top = `${(this.topShiftMultiplier * -1) * this.cellSize }px`;  
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
                        
                        const leftCells = []; 
                         
                        this.tetromino.getLeftCells().forEach((coord) => {
                            const leftCell = this.gameBoard.grid[( (this.verticalPosition + (this.topShiftMultiplier * -1))  + coord.row)][((this.horizontalMove + (this.leftShiftMultiplier * -1)) + coord.col - 1)]; 
                            leftCells.push(leftCell)
                        })

                        if(leftCells.every(cell => cell === 0)) {
                            this.horizontalMove -= 1; 
                        }
                    }
                } else if(e.key === "ArrowRight") {
                    // checks if we're clicking past the right boundary
                    if(this.horizontalMove < this.columns - this.tetromino.width) {

                         /* 
                            if we're within the right boundary and there isn't a cell already on the gameBoard to the right of the bottom cell(s) then you can move to the right
                        */

                        const rightCells = []

                        this.tetromino.getRightCells().forEach((coord) => {
                            const rightCell = this.gameBoard.grid[((this.verticalPosition + (this.topShiftMultiplier * -1))  + coord.row)][((this.horizontalMove + (this.leftShiftMultiplier * -1) ) + coord.col + 1)]; 
                            rightCells.push(rightCell)
                        })

                       if(rightCells.every(cell => cell === 0)) {
                            this.horizontalMove += 1
                        }
                    }
                } else if (e.key === 'ArrowUp') {
                    
                    /*
                    If there are presently filled columns, set the verticalPosition, otherwise pass
                    */
                   
                   this.tetromino.rotate();
                   this.calculateLeftShiftMultiplier();
                   this.calculateShapeContainer(); 
                   
                   const rightShift = this.horizontalMove + this.tetromino.width; 
                   if(rightShift > (this.columns - 1)){
                       this.horizontalMove = this.columns - (this.tetromino.width)
                    }
                    
                    if(this.verticalPosition - this.topShiftMultiplier < 0) {
                        this.calculateTopShiftMultiplier();
                    }

                    const columns = []
                    
                    this.tetromino.shape.forEach((row, rowIndex) => {
                        row.forEach((cell, columnIndex) => {
                            const gridCell = this.gameBoard.grid[( (this.verticalPosition + (this.topShiftMultiplier * -1))  + rowIndex)][(this.horizontalMove + (this.leftShiftMultiplier * -1) + columnIndex)];
                            if(gridCell > 0) {
                                const column = this.horizontalMove + (this.leftShiftMultiplier * -1) + columnIndex
                                if(!columns.includes(column)){
                                    columns.push(column)
                                }
                            }
                        })
                    })

                    if(columns.length > 0) {
                        console.log('you made a rotation violation!\n');
                        const highestCellRow = this.gameBoard.getHighestCellRow(columns); 
                        console.log(`highest row: ${highestCellRow}`);
                        this.verticalPosition = highestCellRow + (this.topShiftMultiplier * -1) - this.tetromino.shape.length;
                        
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
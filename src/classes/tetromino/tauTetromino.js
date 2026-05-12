import Tetromino from "./tetromino.js";

class TauTetromino extends Tetromino {
    shape; 
    frame; 
    colorId;
    width;

    constructor(id, frame=1) {
        super(); 
        this.colorId = id;
        
        this.frame = this.getRandomFrame(frame); 
        this.updateShape()
    }

    updateShape(){
        const id = this.colorId; 
        switch(this.frame){
            case 1: 
                this.shape = [
                    [0, 0, 0], 
                    [0, id, 0], 
                    [id, id, id] 
                ]; 
                this.width = 3;
                break;
            case 2: 
                this.shape = [
                    [0, id, 0], 
                    [0, id, id], 
                    [0, id, 0] 
                ]; 
                this.width = 2;
                break;
            case 3: 
                this.shape = [
                    [0, 0, 0], 
                    [id, id, id], 
                    [0, id, 0] 
                ]; 
                this.width = 3; 
                break;
            case 4: 
                this.shape = [
                    [0, id, 0], 
                    [id, id, 0], 
                    [0, id, 0] 
                ]; 
                this.width = 2; 
                break;
        }
    }
    
    rotate() {
        this.frame = this.incrementFrame(this.frame); 
        this.updateShape()
    }

}

for(let i = 1; i < 5; i++){
    const tau = new TauTetromino(2, i)
    console.log(tau.toString()); 
    
    tau.getRightCells().forEach((coord) => {
        console.log(`row: ${coord.row}, col: ${coord.col}`)
    })
}

export default TauTetromino

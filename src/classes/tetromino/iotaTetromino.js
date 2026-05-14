import Tetromino from "./tetromino.js";

class IotaTetromino extends Tetromino {
    shape; 
    frame; 
    colorId;
    width;

    constructor(id, frame=2) {
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
                break;
            case 2: 
                this.shape = [
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [id, id, id, id]
                ]; 
                this.width = 4;
                break;
            case 3: 
                this.shape = [
                    [0, 0, id, 0], 
                    [0, 0, id, 0], 
                    [0, 0, id, 0], 
                    [0, 0, id, 0]
                ]; 
                this.width = 1;
                break;
            case 4: 
                this.shape = [
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [0, 0, 0, 0], 
                    [id, id, id, id]
                ]; 
                this.width = 4;
                break;
        }
    }

    rotate() {
        this.frame = this.incrementFrame(this.frame); 
        this.updateShape()
    }

}

export default IotaTetromino
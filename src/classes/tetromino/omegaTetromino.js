import Tetromino from "./tetromino.js";

class OmegaTetromino extends Tetromino {
    shape;
    colorId;
    width;

    constructor(id){
        super(); 
        this.colorId = id; 

        this.shape = [
            [id, id], 
            [id, id]
        ]; 
        this.width = 2; 
    }

    rotate(){
        return
    }

}


export default OmegaTetromino



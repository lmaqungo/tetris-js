
class Tetromino {

    constructor(){
        if(new.target === Tetromino) {
            throw new TypeError('Tetromino is an abstract class')
        }
    }

    get shape(){
        throw new Error('get shape() is an abstract method that must be implemented by subclass')
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

}

export default Tetromino
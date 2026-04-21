class Tetromino {

    constructor(){
        if(new.target === Tetromino) {
            throw new TypeError('Tetromino is an abstract class')
        }
    }

    get shape(){
        throw new Error('get shape() is an abstract method that must be implemented by subclass')
    }

}

export default Tetromino
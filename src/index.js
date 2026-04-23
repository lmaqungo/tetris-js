import UI from "./classes/userInterface.js";
import "./styles.css";
import IotaTetromino from "./classes/tetromino/iotaTetromino.js";

const ui = new UI();
const testIota = new IotaTetromino(2); 

let iterationCount = 0



/* 

test.draw() => draws the tetro
test.animateDown() => returns true or false

let falling = test.animateDown()

    test.draw();
        test.animate();


    async run() {
        while(true) {
            let tetro = new tetro(n);
            await test.draw();
            if(no lose) {
                generateNewTetro()
                await test.draw(newTetro)
            }
        }
    }
        
    let test.draw return a promise 
}

*/

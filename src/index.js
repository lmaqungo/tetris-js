import UI from "./classes/userInterface.js";
import "./styles.css";

const ui = new UI();

async function run() {
    console.log('start game')
    for(let i = 0; i < 5; i++) {
        const coordinates = await ui.drawTetromino()
        console.log(`coordinates: ${coordinates}`)
    }
    console.log('end game')
}; 

run();



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

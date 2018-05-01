import 'p5'
import { Grid } from './grid/grid'

let playableGrid

window.setup = () => {
    createCanvas(700, 410)
    playableGrid = new Grid(window, 10, 10)
}

window.draw = () => {
    background(0)   // see: https://github.com/processing/p5.js/issues/2814
    playableGrid.show()
}

window.keyPressed = () => {
    // switch (window.keyCode) {
    //     case "P".charCodeAt():
    //     case "p".charCodeAt():
    //         myTile.buildProducer()
    //         break
    //     case RIGHT_ARROW:
    //         myTile.select()
    //         break
    //     case LEFT_ARROW:
    //         myTile.unselect()
    //         break
    // }
}

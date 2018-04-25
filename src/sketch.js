import 'p5'
import { Tile } from './tile/tile'

const myTile = new Tile(window, 10, 10)

window.setup = () => {
    createCanvas(700, 410)
    background(0)
}

window.draw = () => {
    myTile.show()
}

window.keyPressed = () => {
    switch (window.keyCode) {
        case "P".charCodeAt():
        case "p".charCodeAt():
            myTile.buildProducer()
            break
        case RIGHT_ARROW:
            myTile.select()
            break
        case LEFT_ARROW:
            myTile.unselect()
            break
    }
}

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
    myTile.buildProducer()
}

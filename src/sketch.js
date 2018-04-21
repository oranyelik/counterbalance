import 'p5'
import { Tile } from './tile/tile'

const myTile = new Tile(10, 10);

window.setup = function () {
    createCanvas(700, 410);
    background(0);
}

window.draw = function () {
    myTile.show();
}

import 'p5'
import { Grid } from './grid/grid'
import { Types } from './tile/types'
import { Player } from './player/player'

let playableGrid
let player

window.setup = () => {
    createCanvas(700, 410)
    playableGrid = new Grid(window, 10, 10)
    player = new Player()
}

window.draw = () => {
    background(0)   // see: https://github.com/processing/p5.js/issues/2814
    playableGrid.show()
    showPlayerGold()
}

window.keyPressed = () => {
    switch (window.keyCode) {
        case ' '.charCodeAt():
            player.addGold(250)
            break
        case Types.producer.hotkey.charCodeAt():
            playableGrid.buildStructure(Types.producer)
            break
        case Types.army.hotkey.charCodeAt():
            playableGrid.buildStructure(Types.army)
            break
        case Types.defense.hotkey.charCodeAt():
            playableGrid.buildStructure(Types.defense)
            break
        case Types.research.hotkey.charCodeAt():
            playableGrid.buildStructure(Types.research)
            break
        case UP_ARROW:
            playableGrid.moveUp()
            break
        case RIGHT_ARROW:
            playableGrid.moveRight()
            break
        case DOWN_ARROW:
            playableGrid.moveDown()
            break
        case LEFT_ARROW:
            playableGrid.moveLeft()
            break
    }
}

function showPlayerGold() {
    fill('#FFF')
    text('Player 1 Gold:', 300, 10, 80, 80)
    textAlign(RIGHT)
    text(player.getGold(), 300, 20, 80, 80)
}

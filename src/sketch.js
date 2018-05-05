import 'p5'
import { Grid } from './grid/grid'
import { Types } from './tile/types'
import { Player } from './player/player'

const framesPerSecond = 10

let playableGrid
let player

window.setup = () => {
    createCanvas(700, 410)
    playableGrid = new Grid(window, 10, 10)
    player = new Player()
    frameRate(framesPerSecond)
}

window.draw = () => {
    background(0)   // see: https://github.com/processing/p5.js/issues/2814
    playableGrid.show()
    showPlayerGold()

    if (frameCount % framesPerSecond === 0) {
        playableGrid.update(player)
    }
}

window.keyPressed = () => {
    switch (window.keyCode) {
        case ' '.charCodeAt():
            player.addGold(250)
            break
        case Types.producer.hotkey.charCodeAt():
            player.build(Types.producer, playableGrid)
            break
        case Types.army.hotkey.charCodeAt():
            player.build(Types.army, playableGrid)
            break
        case Types.defense.hotkey.charCodeAt():
            player.build(Types.defense, playableGrid)
            break
        case Types.research.hotkey.charCodeAt():
            player.build(Types.research, playableGrid)
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
    noStroke()
    text('Player 1 Gold:', 300, 10, 80, 80)
    textAlign(RIGHT)
    text(player.getGold(), 300, 20, 80, 80)
}

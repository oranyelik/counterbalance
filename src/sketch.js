import 'p5'
import { Grid } from './grid/grid'
import { Types } from './tile/types'
import { Player } from './player/player'

const framesPerSecond = 10

let playableGrid
const players = []

// TODO: Start with an enemy tile that can be destroyed
window.setup = () => {
    createCanvas(600, 450)
    playableGrid = new Grid(window, 20, 20)
    players[0] = new Player()
    players[1] = new Player(true)
    frameRate(framesPerSecond)
}

window.draw = () => {
    background(0)   // see: https://github.com/processing/p5.js/issues/2814
    playableGrid.show()
    showPlayerGold()

    if (frameCount % framesPerSecond === 0) {
        playableGrid.update(players)
    }
}

window.keyPressed = () => {
    // add shift support for player 2 so we can verify the X's appear!
    const player = !keyIsDown(SHIFT) ? players[0] : players[1]

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
    
    textAlign(LEFT)
    text('Player 1 Gold:', 500, 10, 80, 80)
    textAlign(RIGHT)
    text(players[0].getGold(), 500, 20, 80, 80)

    textAlign(LEFT)
    text('Player 2 Gold:', 500, 40, 80, 80)
    textAlign(RIGHT)
    text(players[1].getGold(), 500, 50, 80, 80)
}

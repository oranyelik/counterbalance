import 'p5'
import { TileSize } from './tile/tile'
import { Grid } from './grid/grid'
import { Types } from './tile/types'
import { Player } from './player/player'
import { AI } from './player/ai'

const framesPerSecond = 10
const gridSize = 20

let opponent, playableGrid, boardLockupTicks
const players = []

window.setup = () => {
    createCanvas(600, 450)
    frameRate(framesPerSecond)

    playableGrid = new Grid(window, gridSize, gridSize)
    players[0] = new Player()
    players[1] = new Player(true)

    const tiles = playableGrid.getTiles()

    tiles[0].buildStructure(Types.producer, players[0])
    tiles[tiles.length - 1].buildStructure(Types.producer, players[1])

    players[0].addGold(250)
    players[1].addGold(250)

    opponent = new AI(players[1], playableGrid)
}

window.draw = () => {
    background(0)   // see: https://github.com/processing/p5.js/issues/2814
    playableGrid.show()
    showPlayerGold()
    showControlsLegend()

    opponent.act()

    if (frameCount % framesPerSecond === 0) {
        playableGrid.update(players)
        determineVictor()
    }
}

window.keyPressed = () => {
    const player = !keyIsDown(SHIFT) ? players[0] : players[1]

    switch (window.keyCode) {
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

function determineVictor() {
    let player1TileCount = 0, player2TileCount = 0

    const tiles = playableGrid.getTiles()

    for (const tile of tiles) {
        if (tile.type) {
            tile.isEnemy ? player2TileCount++ : player1TileCount++
        }
    }

    if (player1TileCount + player2TileCount === gridSize * gridSize) {
        boardLockupTicks++
    }
    else {
        boardLockupTicks = 0
    }

    let player1Loses, player2Loses

    if (boardLockupTicks > 10) {
        if (player1TileCount >= player2TileCount) {
            player1Loses = false
            player2Loses = true
        }
        else {
            player1Loses = true
            player2Loses = false
        }
    }

    if (player1Loses || player1TileCount === 0) {
        text('Player 2 WINS!', 500, 80, 80, 80)
        window.noLoop()
    } else if (player2Loses || player2TileCount === 0) {
        text('Player 1 WINS!', 500, 80, 80, 80)
        window.noLoop()
    }
}

function showControlsLegend() {
    textSize(8)

    strokeWeight(1)
    stroke('#FFF')
    fill(Types.producer.color)
    rect(470, 200, TileSize, TileSize)

    noStroke()
    fill('#FFF')
    text('PRODUCTION (P)', 570, 212)

    strokeWeight(1)
    stroke('#FFF')
    fill(Types.army.color)
    rect(470, 230, TileSize, TileSize)

    noStroke()
    fill('#FFF')
    text('ARMY (A)', 570, 244)

    strokeWeight(1)
    stroke('#FFF')
    fill(Types.defense.color)
    rect(470, 260, TileSize, TileSize)

    noStroke()
    fill('#FFF')
    text('DEFENSE (D)', 570, 276)

    strokeWeight(1)
    stroke('#FFF')
    fill(Types.research.color)
    rect(470, 290, TileSize, TileSize)

    noStroke()
    fill('#FFF')
    text('RESEARCH (R)', 570, 305)
}

function showPlayerGold() {
    textSize(12)
    fill('#FFF')
    noStroke()

    textAlign(LEFT)
    text('Player 1 Gold', 500, 10, 80, 80)
    textAlign(RIGHT)
    text(players[0].getGold(), 495, 20, 80, 80)

    textAlign(LEFT)
    text('Player 2 Gold', 500, 40, 80, 80)
    textAlign(RIGHT)
    text(players[1].getGold(), 495, 50, 80, 80)
}

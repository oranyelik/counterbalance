const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj = windowObj
        this.width = width
        this.height = height
        this.tiles = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, j * TileSize + (2*j) + 2, i * TileSize + (2*i) + 2))
            }
        }

        this.tiles[0].select()
        this.selectedTileIndex = 0
    }

    buildStructure(type, isEnemy) {
        return this.tiles[this.selectedTileIndex].buildStructure(type, isEnemy)
    }

    getTiles() {
        return this.tiles
    }

    moveUp() {
        if (this.selectedTileIndex - this.width >= 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex - this.width].select()
            this.selectedTileIndex -= this.width
        }
    }

    moveRight() {
        if ((this.selectedTileIndex + 1) % this.width > 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex + 1].select()
            this.selectedTileIndex++
        }
    }

    moveDown() {
        if (this.selectedTileIndex + this.width < this.tiles.length) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex + this.width].select()
            this.selectedTileIndex += this.width
        }
    }

    moveLeft() {
        if (this.selectedTileIndex % this.width !== 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex - 1].select()
            this.selectedTileIndex--
        }
    }

    update(players) {
        for (const tile of this.tiles) {
            if (!tile.type)
                continue;

            if (this.windowObj.frameCount >= tile.buildingCompleteFrame && tile.type.production) {
                if (tile.isEnemy) {
                    players[1].addGold(tile.type.production)
                }
                else {
                    players[0].addGold(tile.type.production)
                }
            }

            // TODO: health / damage (.adjacent, .nextNeighbor), boost
        }
    }

    /* istanbul ignore next */
    show() {
        for (const tile of this.tiles) {
            tile.show()
        }
    }
}

module.exports = {
    Grid
}

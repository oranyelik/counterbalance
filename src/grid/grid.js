const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj
        this.width = width
        this.height = height
        this.tiles = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, j * TileSize + (2*j), i * TileSize + (2*i)))
            }
        }

        this.tiles[0].select()
        this.selectedTileIndex = 0
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

const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj
        this.tiles = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, j * TileSize + (2*j), i * TileSize + (2*i)))
            }
        }

        this.tiles[0].select()
    }

    getTiles() {
        return this.tiles
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

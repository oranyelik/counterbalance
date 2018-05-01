const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj
        this.tiles = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, i * TileSize, j * TileSize))
            }
        }

        this.tiles[0].select()
    }

    getTiles() {
        return this.tiles
    }
}

module.exports = {
    Grid
}
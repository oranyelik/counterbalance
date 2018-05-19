const TileTypes = require('../tile/types').Types

class AI {
    constructor(player, grid) {
        this.player = player
        this.grid = grid
        this.moves = 0
    }

    queueNextStructure() {
        let nextStructureSeed, nextStructureType

        if (this.moves < 12) {
            // first ten moves will always build producers to seed economy
            nextStructureSeed = 0
        }
        else {
            nextStructureSeed = Math.random()
        }

        if (nextStructureSeed <= 0.3) {
            nextStructureType = TileTypes.producer
        }
        else if (nextStructureSeed <= 0.4) {
            nextStructureType = TileTypes.defense
        } else if (nextStructureSeed <= 0.65) {
            nextStructureType = TileTypes.research
        } else {
            nextStructureType = TileTypes.army
        }

        this.nextStructure = nextStructureType
    }

    queueNextBuildPosition() {
        const allTiles = this.grid.getTiles()
        const buildableTiles = []

        for (let i = 0; i < allTiles.length; i++) {
            if (allTiles[i].type)
                continue

            if (this.grid.isTileAdjacentToPlayerTile(i, this.player.isEnemy)) {
                buildableTiles.push(i)
            }
        }

        // generates random int 0 to buildableTiles.length - 1
        const randomTileIndex = Math.floor(Math.random() * Math.floor(buildableTiles.length))
        return buildableTiles[randomTileIndex]
    }

    act() {
        if (!this.nextStructure) {
            this.queueNextStructure()
        }

        const nextStructureIndex = this.queueNextBuildPosition()

        if (this.player.build(this.nextStructure, this.grid, nextStructureIndex)) {
            this.moves++
            delete this.nextStructure
        }
    }
}

module.exports = {
    AI
}

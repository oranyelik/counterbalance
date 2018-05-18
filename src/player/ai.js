const TileTypes = require('../tile/types').Types

class AI {
    constructor(player, grid) {
        this.player = player
        this.grid = grid
    }

    queueNextStructure() {
        // generates random int 0 - 3
        const nextStructureSeed = Math.floor(Math.random() * Math.floor(4))
        let nextStructureType

        switch (nextStructureSeed) {
            case 0:
                nextStructureType = TileTypes.producer
                break
            case 1:
                nextStructureType = TileTypes.defense
                break
            case 2:
                nextStructureType = TileTypes.research
                break
            case 3:
                nextStructureType = TileTypes.army
                break
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
            console.log('structure built at index', nextStructureIndex);
            delete this.nextStructure
        }
    }
}

module.exports = {
    AI
}

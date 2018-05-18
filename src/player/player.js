const TileTypes = require('../tile/types').Types

class Player {
    constructor(isEnemy) {
        this.gold = 0
        this.researcherTileIndicies = []
        this.numStructures = 1

        if (isEnemy) {
            this.isEnemy = isEnemy
        }
    }

    addGold(amount) {
        this.gold += amount
    }

    getGold() {
        return this.gold
    }

    build(structure, buildableGrid, tileIndex) {
        if (this.gold >= structure.cost && buildableGrid.buildStructure(structure, this, tileIndex)) {
            this.gold -= structure.cost
            this.numStructures++

            return true
        }
        else {
            return false
        }
    }

    getGoldProduction() {
        const boost = TileTypes.research.boost * this.researcherTileIndicies.length

        if (boost) {
            return TileTypes.producer.production * boost
        }
        else {
            return TileTypes.producer.production
        }
    }

    getArmyDamage() {
        const boost = TileTypes.research.boost * this.researcherTileIndicies.length

        if (boost) {
            return TileTypes.army.damage * boost
        }
        else {
            return TileTypes.army.damage
        }
    }

    getStructureHealthMultiplier() {
        if (!this.researcherTileIndicies.length)
            return 1

        return TileTypes.research.boost * this.researcherTileIndicies.length
    }
}

module.exports = {
    Player
}

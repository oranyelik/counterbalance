const TileTypes = require('../tile/types').Types

class Player {
    constructor(isEnemy) {
        this.gold = 0
        this.researcherTileIndicies = []

        if (isEnemy) {
            this.isEnemy = isEnemy
        }
    }

    addGold(amount) {
        this.gold += Math.floor(amount)
    }

    getGold() {
        return this.gold
    }

    build(structure, buildableGrid, tileIndex) {
        if (this.gold >= structure.cost && buildableGrid.buildStructure(structure, this, tileIndex)) {
            this.gold -= structure.cost

            return true
        }
        else {
            return false
        }
    }

    getGoldProduction() {
        return TileTypes.producer.production
    }

    getArmyDamage() {
        if (this.researcherTileIndicies.length) {
            const boost = TileTypes.research.boost * Math.log(this.researcherTileIndicies.length + 1) + 1
            return TileTypes.army.damage * boost
        }
        else {
            return TileTypes.army.damage
        }
    }

    getStructureHealthMultiplier() {
        if (this.researcherTileIndicies.length) {
            const boost = TileTypes.research.boost * Math.log(this.researcherTileIndicies.length + 1) + 1
            return boost
        }
        else {
            return 1
        }
    }
}

module.exports = {
    Player
}

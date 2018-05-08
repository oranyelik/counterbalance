class Player {
    constructor(isEnemy) {
        this.gold = 0

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

    build(structure, buildableGrid) {
        if (this.gold >= structure.cost && buildableGrid.buildStructure(structure, this.isEnemy)) {
            this.gold -= structure.cost
            
            return true
        }
        else {
            return false
        }
    }
}

module.exports = {
    Player
}

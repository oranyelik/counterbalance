class Player {
    constructor() {
        this.gold = 0
    }

    addGold(amount) {
        this.gold += amount
    }

    getGold() {
        return this.gold
    }

    build(structure, buildableGrid) {
        if (this.gold >= structure.cost && buildableGrid.buildStructure(structure)) {
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

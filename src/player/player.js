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
}

module.exports = {
    Player
}

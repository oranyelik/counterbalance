// consider moving hotkey / color for each type into this structure; consider extracting to separate file
// ^ this would improve our open/closed principle adherence!
const types = {
    producer: {
        cost: 60,
        buildTime: 10,
        health: 100,
        production: 10
    },
    army: {
        cost: 80,
        buildTime: 10,
        health: 120,
        damage: {
            adjacent: 20,
            nextNeighbor: 10
        }
    },
    defense: {
        cost: 40,
        buildTime: 4,
        health: 80
    },
    research: {
        cost: 110,
        buildTime: 18,
        health: 90,
        boost: 1.1
    }
}

const TileSize = 20

class Tile {
    constructor(windowObj, x, y) {
        this.windowObj = windowObj
        this.x = x
        this.y = y
    }

    buildProducer() {
        if (this.type)
            return false;

        return this.type = types.producer
    }

    buildArmy() {
        if (this.type)
            return false;

        return this.type = types.army
    }

    buildDefense() {
        if (this.type)
            return false;

        return this.type = types.defense
    }

    buildResearch() {
        if (this.type)
            return false;

        return this.type = types.research
    }

    produce() {
        if (this.type === types.producer)
            return this.type.production
    }

    select() {
        this.selected = true
    }

    unselect() {
        this.selected = false
    }

    show() {
        switch (this.type) {
            default:
                this.windowObj.fill('#FFF')
                break;
            case types.producer:
                this.windowObj.fill('#0F0')
                break;
        }

        if (this.selected) {
            this.windowObj.stroke('#F00')
        }
        else {
            this.windowObj.stroke('#505050')
        }

        this.windowObj.rect(this.x, this.y, TileSize, TileSize)
    }
}

module.exports = {
    Tile,
    TileSize
}

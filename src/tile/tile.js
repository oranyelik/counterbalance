const Types = require('./types').Types

const TileSize = 20

class Tile {
    constructor(windowObj, x, y) {
        this.windowObj = windowObj
        this.x = x
        this.y = y
    }

    buildStructure(buildingType) {
        if (this.type)
            return false;

        return this.type = buildingType
    }

    buildProducer() {
        return this.buildStructure(Types.producer)
    }

    buildArmy() {
        return this.buildStructure(Types.army)
    }

    buildDefense() {
        return this.buildStructure(Types.defense)
    }

    buildResearch() {
        return this.buildStructure(Types.research)
    }

    produce() {
        if (this.type === Types.producer)
            return this.type.production
    }

    select() {
        this.selected = true
    }

    unselect() {
        this.selected = false
    }

    show() {
        if (this.type) {
            this.windowObj.fill(this.type.color)
        }
        else {
            this.windowObj.fill('#FFF')
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

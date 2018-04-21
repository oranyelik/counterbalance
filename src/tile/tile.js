const types = {
    producer: {
        production: 10
    }
}

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

    produce() {
        if (this.type === types.producer)
            return this.type.production
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

        this.windowObj.rect(this.x, this.y, 20, 20)
    }
}

module.exports.Tile = Tile

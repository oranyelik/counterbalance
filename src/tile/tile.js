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

        this.buildingCompleteFrame = this.windowObj.frameCount + (this.windowObj.frameRate() * buildingType.buildTime)

        return this.type = buildingType
    }

    select() {
        this.selected = true
    }

    unselect() {
        this.selected = false
    }

    show() {
        if (this.type) {
            let tileColor = this.type.color

            if (this.windowObj.frameCount < this.buildingCompleteFrame) {
                // TODO: ease into color by adjusting the alpha in increments of 10% as structure approaches completion
                tileColor = tileColor.replace('rgb(', 'rgba(').replace(')', ',0.5)')
            }

            this.windowObj.fill(tileColor)
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

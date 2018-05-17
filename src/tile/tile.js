const TileSize = 20

class Tile {
    constructor(windowObj, x, y) {
        this.windowObj = windowObj
        this.x = x
        this.y = y
    }

    buildStructure(buildingType, player) {
        if (this.type)
            return false

        this.buildingCompleteFrame = this.windowObj.frameCount + (this.windowObj.frameRate() * buildingType.buildTime)

        this.isEnemy = player.isEnemy
        this.totalHealth = buildingType.health * player.getStructureHealthMultiplier()
        this.health = this.totalHealth

        return this.type = buildingType
    }

    destroyStructure() {
        this.type = undefined
        this.buildingCompleteFrame = undefined
        this.isEnemy = undefined
        this.health = undefined
        this.totalHealth
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
                tileColor = tileColor.replace('rgb(', 'rgba(').replace(')', `,${this.getStructureColorAlpha()})`)
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

        if (this.health) {
            this.windowObj.strokeWeight(3)
            this.windowObj.stroke('#000')
            this.windowObj.line(this.x + 2, this.y + 2, this.x + TileSize - 2, this.y + 2)

            const healthPercent = this.health / this.totalHealth
            const lineLength = (TileSize - 2) * healthPercent

            this.windowObj.strokeWeight(1)
            this.windowObj.stroke('#FFF')
            this.windowObj.line(this.x + 2, this.y + 2, this.x + lineLength, this.y + 2)
        }

        if (this.isEnemy) {
            this.windowObj.fill('#FFF')
            this.windowObj.strokeWeight(2)
            this.windowObj.stroke('#000')
            this.windowObj.textSize(12)
            this.windowObj.text('X', this.x + (TileSize * .75) - 1, this.y + (TileSize * .75) + 1)
        }
    }

    getStructureColorAlpha() {
        const buildFramesRemaining = this.buildingCompleteFrame - this.windowObj.frameCount
        const totalFramesToBuild = this.type.buildTime * this.windowObj.frameRate()
        const progressPercent = 100 - (buildFramesRemaining / totalFramesToBuild) * 100

        if (progressPercent < 20) {
            return 0
        }
        else if (progressPercent < 40) {
            return 0.20
        }
        else if (progressPercent < 60) {
            return 0.40
        }
        else if (progressPercent < 80) {
            return 0.60
        }
        else {
            return 0.80
        }
    }
}

module.exports = {
    Tile,
    TileSize
}

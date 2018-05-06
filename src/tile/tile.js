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
    }

    getStructureColorAlpha() {
        const buildFramesRemaining = this.buildingCompleteFrame - this.windowObj.frameCount
        const totalFramesToBuild = this.type.buildTime * this.windowObj.frameRate()
        const progressPercent = 100 - (buildFramesRemaining / totalFramesToBuild) * 100

        if (progressPercent < 20) {
            return 0.15
        }
        else if (progressPercent < 40) {
            return 0.35
        }
        else if (progressPercent < 60) {
            return 0.55
        }
        else if (progressPercent < 80) {
            return 0.75
        }
        else {
            return 0.95
        }
    }
}

module.exports = {
    Tile,
    TileSize
}

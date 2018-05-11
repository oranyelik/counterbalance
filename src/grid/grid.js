const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj = windowObj
        this.width = width
        this.height = height
        this.tiles = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, j * TileSize + (2*j) + 2, i * TileSize + (2*i) + 2))
            }
        }

        this.tiles[0].select()
        this.selectedTileIndex = 0
    }

    buildStructure(type, isEnemy) {
        return this.tiles[this.selectedTileIndex].buildStructure(type, isEnemy)
    }

    getTiles() {
        return this.tiles
    }

    moveUp() {
        if (this.selectedTileIndex - this.width >= 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex - this.width].select()
            this.selectedTileIndex -= this.width
        }
    }

    moveRight() {
        if ((this.selectedTileIndex + 1) % this.width > 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex + 1].select()
            this.selectedTileIndex++
        }
    }

    moveDown() {
        if (this.selectedTileIndex + this.width < this.tiles.length) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex + this.width].select()
            this.selectedTileIndex += this.width
        }
    }

    moveLeft() {
        if (this.selectedTileIndex % this.width !== 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[this.selectedTileIndex - 1].select()
            this.selectedTileIndex--
        }
    }

    update(players) {
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i]

            if (!tile.type)
                continue

            if (this.windowObj.frameCount >= tile.buildingCompleteFrame) {
                if (tile.type.production) {
                    if (tile.isEnemy) {
                        players[1].addGold(tile.type.production)
                    }
                    else {
                        players[0].addGold(tile.type.production)
                    }
                }
                else if (tile.type.damage) {
                    this.applyDamage(i, tile.type.damage)
                }
            }

            // TODO: apply boost mechanics from research
        }
    }

    applyDamage(damagingTileIndex, nearbyTileDamage) {
        const tilesToBeDamaged = this.findDamageableTiles(damagingTileIndex)

        for (const damagedTile of tilesToBeDamaged.adjacent) {
            damagedTile.health -= nearbyTileDamage.adjacent

            if (damagedTile.health <= 0) {
                damagedTile.destroyStructure()
            }
        }
    }

    findDamageableTiles(damagingTileIndex) {
        const adjacentTiles = []
        const targetEnemyStatus = this.tiles[damagingTileIndex].isEnemy ? undefined : true

        // top left corner
        if ((damagingTileIndex - this.width - 1) % this.width === (damagingTileIndex % this.width) - 1 && damagingTileIndex - this.width - 1 >= 0) {
            const potentialTile = this.tiles[damagingTileIndex - this.width - 1]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // north adjacent
        if (damagingTileIndex - this.width >= 0) {
            const potentialTile = this.tiles[damagingTileIndex - this.width]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // top right corner
        if ((damagingTileIndex - this.width + 1) % this.width === (damagingTileIndex % this.width) + 1 && damagingTileIndex - this.width + 1 >= 0) {
            const potentialTile = this.tiles[damagingTileIndex - this.width + 1]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // right adjacent
        if ((damagingTileIndex + 1) % this.width > 0) {
            const potentialTile = this.tiles[damagingTileIndex + 1]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // bottom left corner
        if ((damagingTileIndex + this.width - 1) % this.width === (damagingTileIndex % this.width) - 1 && damagingTileIndex + this.width - 1 <= this.tiles.length) {
            const potentialTile = this.tiles[damagingTileIndex + this.width - 1]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // south adjacent
        if (damagingTileIndex + this.width < this.tiles.length) {
            const potentialTile = this.tiles[damagingTileIndex + this.width]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // bottom right corner
        if ((damagingTileIndex + this.width + 1) % this.width === (damagingTileIndex % this.width) + 1 && damagingTileIndex + this.width + 1 <= this.tiles.length) {
            const potentialTile = this.tiles[damagingTileIndex + this.width + 1]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        // left adjacent
        if (damagingTileIndex % this.width !== 0) {
            const potentialTile = this.tiles[damagingTileIndex - 1]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push(potentialTile)
            }
        }

        return {
            adjacent: adjacentTiles
        }
    }

    /* istanbul ignore next */
    show() {
        for (const tile of this.tiles) {
            tile.show()
        }
    }
}

module.exports = {
    Grid
}

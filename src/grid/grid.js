const Tile = require('../tile/tile').Tile
const TileSize = require('../tile/tile').TileSize

class Grid {
    constructor(windowObj, width, height) {
        this.windowObj = windowObj
        this.width = width
        this.height = height
        this.tiles = []
        this.tilesToBeDestroyed = []

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.push(new Tile(windowObj, j * TileSize + (2*j) + 2, i * TileSize + (2*i) + 2))
            }
        }

        this.tiles[0].select()
        this.selectedTileIndex = 0
    }

    buildStructure(type, player) {
        if (!this.isSelectedTileAdjacentToPlayerTile(player.isEnemy))
            return false

        return this.tiles[this.selectedTileIndex].buildStructure(type, player)
    }

    getTiles() {
        return this.tiles
    }

    moveUp() {
        const desiredIndex = this.selectedTileIndex - this.width
        if (desiredIndex >= 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[desiredIndex].select()
            this.selectedTileIndex -= this.width
        }
    }

    moveRight() {
        const desiredIndex = this.selectedTileIndex + 1
        if (desiredIndex % this.width > 0) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[desiredIndex].select()
            this.selectedTileIndex++
        }
    }

    moveDown() {
        const desiredIndex = this.selectedTileIndex + this.width
        if (desiredIndex < this.tiles.length) {
            this.tiles[this.selectedTileIndex].unselect()
            this.tiles[desiredIndex].select()
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

    isSelectedTileAdjacentToPlayerTile(isEnemy) {
        const above = this.selectedTileIndex - this.width
        const right = this.selectedTileIndex + 1
        const below = this.selectedTileIndex + this.width
        const left = this.selectedTileIndex - 1

        if (above >= 0) {
            if (this.tiles[above].type !== undefined && this.tiles[above].isEnemy === isEnemy) {
                return true
            }
        }

        if (right < this.tiles.length) {
            if (this.tiles[right].type !== undefined && this.tiles[right].isEnemy === isEnemy) {
                return true
            }
        }

        if (below < this.tiles.length) {
            if (this.tiles[below].type !== undefined && this.tiles[below].isEnemy === isEnemy) {
                return true
            }
        }

        if (left >= 0) {
            if (this.tiles[left].type !== undefined && this.tiles[left].isEnemy === isEnemy) {
                return true
            }
        }

        return false
    }

    update(players) {
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i]
            const player = tile.isEnemy ? players[1] : players[0]
            const opponent = tile.isEnemy ? players[0] : players[1]

            if (!tile.type)
                continue

            if (this.windowObj.frameCount < tile.buildingCompleteFrame)
                continue

            if (tile.type.boost) {
                if (player.researcherTileIndicies.indexOf(i) === -1) {
                    player.researcherTileIndicies.push(i)
                }
            }
            else if (tile.type.production) {
                const goldToBeAdded = player.getGoldProduction()
                player.addGold(goldToBeAdded)
            }
            else if (tile.type.damage) {
                const damageToBeApplied = player.getArmyDamage()
                this.applyDamage(i, damageToBeApplied, opponent)
            }
        }

        // clean up any destroyed structures on each update tick AFTER we've applied damage across the board
        for (const destroyed of this.tilesToBeDestroyed) {
            destroyed.tile.destroyStructure()

            destroyed.tile.owner.numStructures--
            destroyed.tile.owner.researcherTileIndicies
                = destroyed.tile.owner.researcherTileIndicies.filter(e => e !== destroyed.index)
        }

        this.tilesToBeDestroyed = []
    }

    applyDamage(damagingTileIndex, nearbyTileDamage, playerTakingDamage) {
        const tilesToBeDamaged = this.findDamageableTiles(damagingTileIndex)

        for (const damagedTile of tilesToBeDamaged) {
            damagedTile.tile.health -= nearbyTileDamage

            if (damagedTile.tile.health <= 0) {
                this.tilesToBeDestroyed.push(damagedTile)
            }
        }
    }

    findDamageableTiles(damagingTileIndex) {
        const adjacentTiles = []
        const targetEnemyStatus = this.tiles[damagingTileIndex].isEnemy ? undefined : true

        // top left corner
        let potentialTileIndex = damagingTileIndex - this.width - 1
        if (potentialTileIndex % this.width === (damagingTileIndex % this.width) - 1 && potentialTileIndex >= 0) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // north adjacent
        potentialTileIndex = damagingTileIndex - this.width
        if (potentialTileIndex >= 0) {
            const potentialTile = this.tiles[damagingTileIndex - this.width]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // top right corner
        potentialTileIndex = damagingTileIndex - this.width + 1
        if (potentialTileIndex % this.width === (damagingTileIndex % this.width) + 1 && potentialTileIndex >= 0) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // right adjacent
        potentialTileIndex = damagingTileIndex + 1
        if (potentialTileIndex % this.width > 0) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // bottom left corner
        potentialTileIndex = damagingTileIndex + this.width - 1
        if (potentialTileIndex % this.width === (damagingTileIndex % this.width) - 1 && potentialTileIndex < this.tiles.length) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // south adjacent
        potentialTileIndex = damagingTileIndex + this.width
        if (potentialTileIndex < this.tiles.length) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // bottom right corner
        potentialTileIndex = damagingTileIndex + this.width + 1
        if (potentialTileIndex % this.width === (damagingTileIndex % this.width) + 1 && potentialTileIndex < this.tiles.length) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy == targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        // left adjacent
        potentialTileIndex = damagingTileIndex - 1
        if (damagingTileIndex % this.width !== 0) {
            const potentialTile = this.tiles[potentialTileIndex]

            if (potentialTile.health && potentialTile.isEnemy === targetEnemyStatus) {
                adjacentTiles.push({
                    tile: potentialTile,
                    index: potentialTileIndex
                })
            }
        }

        return adjacentTiles
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

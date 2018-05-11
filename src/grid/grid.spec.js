const Grid = require('./grid').Grid

describe('Grid', () => {
    const mockPlayer = {
        addGold: amount => {
            this.gold += amount
        },
        getGold: () => this.gold
    }
    const mockEnemy = {
        isEnemy: true,
        addGold: amount => {
            this.enemyGold += amount
        },
        getGold: () => this.enemyGold
    }

    const mockPlayers = [mockPlayer, mockEnemy]
    const mockProducerType = {
        cost: 0,
        production: 10,
        buildTime: 5,
        health: 100,
    }
    const mockArmyType = {
        cost: 0,
        buildTime: 0,
        health: 100,
        damage: {
            adjacent: 20
        }
    }
    const mockDefenseType = {
        cost: 0,
        buildTime: 0,
        health: mockArmyType.damage.adjacent,   // one hit kill to simplify testing
    }

    let mockWindow

    beforeEach(() => {
        this.gold = 0
        this.enemyGold = 0

        mockWindow = {
            frameCount: 0,
            frameRate: () => 1
        }
    })

    it('should select 0, 0 tile', () => {
        const sut = new Grid({}, 1, 1)

        const tiles = sut.getTiles()

        expect(tiles[0].selected).toBe(true)
    })

    it('should move selection only within grid boundaries for one tile', () => {
        const sut = new Grid({}, 1, 1)

        const tiles = sut.getTiles()

        sut.moveUp()
        expect(tiles[0].selected).toBe(true)

        sut.moveRight()
        expect(tiles[0].selected).toBe(true)

        sut.moveDown()
        expect(tiles[0].selected).toBe(true)

        sut.moveLeft()
        expect(tiles[0].selected).toBe(true)
    })

    it('should move selection only within grid boundaries for multiple tiles', () => {
        const sut = new Grid({}, 2, 2)

        const tiles = sut.getTiles()

        sut.moveUp()
        expect(tiles[0].selected).toBe(true)

        sut.moveRight()
        sut.moveRight()
        expect(tiles[1].selected).toBe(true)

        sut.moveDown()
        sut.moveDown()
        expect(tiles[3].selected).toBe(true)

        sut.moveLeft()
        sut.moveLeft()
        expect(tiles[2].selected).toBe(true)
    })

    it('should move proper selection', () => {
        const sut = new Grid({}, 2, 2)

        const tiles = sut.getTiles()
        expect(tiles[0].selected).toBe(true)

        sut.moveRight()
        expect(tiles[0].selected).toBe(false)
        expect(tiles[1].selected).toBe(true)

        sut.moveDown()
        expect(tiles[1].selected).toBe(false)
        expect(tiles[3].selected).toBe(true)

        sut.moveLeft()
        expect(tiles[3].selected).toBe(false)
        expect(tiles[2].selected).toBe(true)

        sut.moveUp()
        expect(tiles[2].selected).toBe(false)
        expect(tiles[0].selected).toBe(true)
    })

    it('should build producer on selected tile', () => {
        const sut = new Grid(mockWindow, 1, 1)

        const firstAttemptResult = sut.buildStructure({})
        expect(firstAttemptResult).toBeTruthy()

        const secondAttemptResult = sut.buildStructure({})
        expect(secondAttemptResult).toBeFalsy()
    })

    it('should only add player gold after producer finishes construction', () => {
        const sut = new Grid(mockWindow, 1, 1)

        sut.update(mockPlayers)
        expect(mockPlayers[0].getGold()).toBe(0)

        sut.buildStructure(mockProducerType)

        sut.update(mockPlayers)
        expect(mockPlayers[0].getGold()).toBe(0)

        mockWindow.frameCount += mockProducerType.buildTime

        sut.update(mockPlayers)
        expect(mockPlayers[0].getGold()).toBe(mockProducerType.production)
    })

    it('should add gold to player 2 if tile is enemy tile', () => {
        const sut = new Grid(mockWindow, 1, 1)

        expect(mockPlayers[0].getGold()).toBe(0)
        expect(mockPlayers[1].getGold()).toBe(0)

        sut.buildStructure(mockProducerType, true)

        // mockWindow has frameRate of 1
        mockWindow.frameCount += mockProducerType.buildTime

        sut.update(mockPlayers)

        expect(mockPlayers[0].getGold()).toBe(0)
        expect(mockPlayers[1].getGold()).toBe(mockProducerType.production)
    })

    it('should apply army damage to near enemy tiles', () => {
        const sut = new Grid(mockWindow, 3, 3)

        // 0, 0
        sut.buildStructure(mockProducerType)
        
        // 1, 0
        sut.moveRight()
        sut.buildStructure(mockProducerType)
        
        // 2, 0
        sut.moveRight()
        sut.buildStructure(mockProducerType)
        
        // 2, 1
        sut.moveDown()
        sut.buildStructure(mockProducerType)

        // 2, 2
        sut.moveDown()
        sut.buildStructure(mockProducerType)

        // 1, 2
        sut.moveLeft()
        sut.buildStructure(mockProducerType)

        // 0, 2
        sut.moveLeft()
        sut.buildStructure(mockProducerType)

        // 0, 1
        sut.moveUp()
        sut.buildStructure(mockProducerType)

        // 1, 1 (middle tile, enemy tile)
        sut.moveRight()
        sut.buildStructure(mockArmyType, true)

        sut.update(mockPlayers)

        expect(sut.getTiles()[0].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[1].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[2].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[3].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[4].health).toBe(mockArmyType.health)  // the tile dealing damage is undamaged itself
        expect(sut.getTiles()[5].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[6].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[7].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
        expect(sut.getTiles()[8].health).toBe(mockProducerType.health - mockArmyType.damage.adjacent)
    })

    it('should handle having no adjacent tiles to damage', () => {
        const sut = new Grid(mockWindow, 1, 1)

        sut.buildStructure(mockArmyType)
        expect(() => { sut.update(mockPlayers) }).not.toThrow()
    })

    it('should handle having only empty adjacent tiles', () => {
        const sut = new Grid(mockWindow, 3, 3)

        sut.moveRight()
        sut.moveDown()

        sut.buildStructure(mockArmyType)
        expect(() => { sut.update(mockPlayers) }).not.toThrow()
    })

    it('should handle having no tile interactions', () => {
        const sut = new Grid(mockWindow, 1, 1)

        sut.buildStructure(mockDefenseType)
        expect(() => { sut.update(mockPlayers) }).not.toThrow()
    })

    it('should destroy a building at 0 health', () => {
        const sut = new Grid(mockWindow, 2, 1)

        sut.buildStructure(mockArmyType)
        sut.moveRight()
        sut.buildStructure(mockDefenseType, true)

        expect(sut.getTiles()[1].type).toBe(mockDefenseType)

        sut.update(mockPlayers)

        expect(sut.getTiles()[1].health).toBe(undefined)
        expect(sut.getTiles()[1].type).toBe(undefined)
    })

    it('should not damage adjacent allied tiles', () => {
        const sut = new Grid(mockWindow, 3, 3)

        sut.buildStructure(mockDefenseType)
        sut.moveRight()
        sut.buildStructure(mockArmyType)

        sut.update(mockPlayers)

        expect(sut.getTiles()[0].type).toBe(mockDefenseType)
    })
})

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
    let mockWindow, mockProducerType

    beforeEach(() => {
        this.gold = 0
        this.enemyGold = 0

        mockWindow = {
            frameCount: 0,
            frameRate: () => 1
        }
        
        mockProducerType = {
            cost: 0,
            production: 10,
            buildTime: 5
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

        mockWindow.frameCount += mockProducerType.buildTime

        sut.update(mockPlayers)

        expect(mockPlayers[0].getGold()).toBe(0)
        expect(mockPlayers[1].getGold()).toBe(mockProducerType.production)
    })
})

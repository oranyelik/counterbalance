const Grid = require('./grid').Grid

describe('Grid', () => {
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
        const sut = new Grid({}, 1, 1)

        const firstAttemptResult = sut.buildStructure({})
        expect(firstAttemptResult).toBeTruthy()

        const secondAttemptResult = sut.buildStructure({})
        expect(secondAttemptResult).toBeFalsy()
    })

    it('should add player gold on producer tick', () => {
        const mockPlayer = {
            addGold: amount => {
                if (!this.gold) 
                    this.gold = amount
                else
                    this.gold += amount
            },
            getGold: () => this.gold || 0
        }
        const mockProducerType = {
            cost: 0,
            production: 10
        }
        const sut = new Grid({}, 1, 1)

        sut.update(mockPlayer)

        expect(mockPlayer.getGold()).toBe(0)

        sut.buildStructure(mockProducerType)
        sut.update(mockPlayer)
        
        expect(mockPlayer.getGold()).toBe(mockProducerType.production)
    })
})

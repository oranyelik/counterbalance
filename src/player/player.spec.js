const Player = require('./player').Player
const PlayerTypes = require('./player').PlayerTypes

describe('Player', () => {
    it('should exist', () => {
        const sut = new Player()

        expect(typeof Player).toBe('function')
        expect(typeof sut).toBe('object')
    })

    it('should have a gold bank', () => {
        const sut = new Player()

        sut.addGold(10)

        expect(sut.getGold()).toBe(10)
    })

    it('should only allow construction of a structure if they have enough money banked', () => {
        const mockStructure = {
            cost: 60
        }
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }
        const sut = new Player()

        sut.addGold(50)

        expect(sut.build(mockStructure, mockGrid)).toBe(false)
        expect(mockGrid.buildStructure).not.toHaveBeenCalled()

        sut.addGold(10)

        expect(sut.build(mockStructure, mockGrid)).toBe(true)
        expect(mockGrid.buildStructure).toHaveBeenCalled()
        expect(sut.getGold()).toBe(0)
    })

    it('should build enemy tiles for enemy player', () => {
        const mockStructure = {
            cost: 10
        }
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }
        const sut = new Player(true)

        sut.addGold(10)
        sut.build(mockStructure, mockGrid)

        expect(mockGrid.buildStructure).toHaveBeenCalledWith(mockStructure, true)
    })
})
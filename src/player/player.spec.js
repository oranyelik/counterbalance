const Player = require('./player').Player
const TileTypes = require('../tile/types').Types

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

        expect(mockGrid.buildStructure).toHaveBeenCalled()
    })

    it('should have regular gold production with no researchers', () => {
        const sut = new Player()
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }

        sut.build({}, mockGrid)

        expect(sut.getGoldProduction()).toBe(TileTypes.producer.production)
    })

    it('should have boosted gold production with 1 researcher', () => {
        const sut = new Player()
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }

        sut.build({}, mockGrid)
        sut.researcherTileIndicies.push({})

        expect(sut.getGoldProduction()).toBe(TileTypes.producer.production * TileTypes.research.boost)
    })

    it('should have regular army damage with no researchers', () => {
        const sut = new Player()
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }

        sut.build({}, mockGrid)

        expect(sut.getArmyDamage()).toBe(TileTypes.army.damage)
    })

    it('should have boosted army damage with researchers', () => {
        const sut = new Player()
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }

        sut.researcherTileIndicies.push({})
        sut.researcherTileIndicies.push({})

        expect(sut.getArmyDamage()).toBe(TileTypes.army.damage * (TileTypes.research.boost * 2))
        expect(sut.getStructureHealthMultiplier()).toBe(TileTypes.research.boost * 2)
    })

    it('should return a health multiplier of 1 with no researchers', () => {
        const sut = new Player()
        const mockGrid = {
            buildStructure: jest.fn((() => true))
        }

        expect(sut.getStructureHealthMultiplier()).toBe(1)
    })
})
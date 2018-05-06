const Tile = require('./tile').Tile

describe('Tile', () => {
    let mockWindow;

    beforeEach(() => {
        mockWindow = {
            frameCount: 0,
            frameRate: () => 1,
            fill: jest.fn(),
            rect: jest.fn(),
            stroke: jest.fn()
        }
    })

    it('should exist', () => {
        expect(typeof Tile).toEqual('function')
    })

    it('should build producer', () => {
        const mockProducerType = {
            production: 5
        }
        const sut = new Tile(mockWindow)

        expect(sut.buildStructure(mockProducerType)).toBeTruthy()
    })

    it('should not build producer if building already exists', () => {
        const sut = new Tile(mockWindow)

        sut.buildStructure({})

        expect(sut.buildStructure({})).toBeFalsy()
    })

    it('should be a different color once producer is built', () => {
        const sut = new Tile(mockWindow)
        sut.show()

        sut.buildStructure({})
        sut.show()

        expect(mockWindow.fill).toHaveBeenCalledTimes(2)
        expect(mockWindow.fill.mock.calls[0]).not.toEqual(mockWindow.fill.mock.calls[1])
    })

    it('should outline if selected', () => {
        const sut = new Tile(mockWindow)
        sut.show()

        sut.select()
        sut.show()

        expect(mockWindow.stroke).toHaveBeenCalled()
    })

    it('should lose if selection is removed', () => {
        const sut = new Tile(mockWindow)

        sut.select()
        expect(sut.selected).toBe(true)

        sut.unselect()
        expect(sut.selected).toBe(false)
    })

    it('should use transparent color while building', () => {
        const mockStructureType = {
            production: 5,
            buildTime: 5,
            color: 'rgb(255,255,255)'
        }
        const sut = new Tile(mockWindow)

        sut.buildStructure(mockStructureType)
        sut.show()
        sut.show()

        mockWindow.frameCount += mockStructureType.buildTime

        sut.show()

        expect(mockWindow.fill).toHaveBeenCalledTimes(3)
        expect(mockWindow.fill.mock.calls[0]).toEqual(mockWindow.fill.mock.calls[1])
        expect(mockWindow.fill.mock.calls[1]).not.toEqual(mockWindow.fill.mock.calls[2])
    })

    it('should not produce while building')
    // grid will check, show will update isBuilding status?
})

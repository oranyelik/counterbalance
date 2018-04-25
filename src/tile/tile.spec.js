const Tile = require('./tile').Tile

describe('Tile', () => {
    let mockWindow;

    beforeEach(() => {
        mockWindow = {
            fill: jest.fn(),
            rect: jest.fn(),
            stroke: jest.fn(),
            noStroke: jest.fn(),
        }
    })

    it('should exist', () => {
        expect(typeof Tile).toEqual('function')
    })

    it('should build producer', () => {
        const sut = new Tile()
        expect(sut.produce()).toBeFalsy()

        expect(sut.buildProducer()).toBeTruthy()
        expect(sut.produce()).toBeTruthy()
    })

    it('should not build producer if building already exists', () => {
        const sut = new Tile()

        sut.buildProducer()

        expect(sut.buildProducer()).toBeFalsy()
    })

    it('should be a different color once producer is built', () => {
        const sut = new Tile(mockWindow)
        sut.show()

        sut.buildProducer()
        sut.show()

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
        sut.show()

        sut.unselect()
        sut.show()

        expect(mockWindow.stroke).toHaveBeenCalledTimes(1)
        expect(mockWindow.noStroke).toHaveBeenCalledTimes(1)
    })
})

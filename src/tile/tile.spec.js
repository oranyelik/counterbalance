const Tile = require('./tile').Tile

describe('Tile', () => {
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
        let fillWasCalled = false;
        const mockWindow = {
            fill: jest.fn(),
            rect: () => {}
        }

        const sut = new Tile(mockWindow)
        sut.show()

        sut.buildProducer()
        sut.show()

        expect(mockWindow.fill.mock.calls[0]).not.toEqual(mockWindow.fill.mock.calls[1])
    })
})

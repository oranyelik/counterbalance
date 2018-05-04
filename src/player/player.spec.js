const Player = require('./player').Player

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
})
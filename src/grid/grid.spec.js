const Grid = require('./grid').Grid

describe('Grid', () => {
    it('should select 0, 0 tile', () => {
        const sut = new Grid({}, 1, 1)

        const tiles = sut.getTiles()

        expect(tiles[0].selected).toBe(true)
    })
})

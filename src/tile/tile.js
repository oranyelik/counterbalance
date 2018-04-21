class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    show() {
        window.fill('#FFF');
        window.rect(this.x, this.y, 250, 250);
    }
}

module.exports.Tile = Tile

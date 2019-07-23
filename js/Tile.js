class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Tile.size[0];
        this.height = Tile.size[1];
    }

    static get size() {
        const value = game.bg_canvas.height/8;
        return [value, value];
    }
}
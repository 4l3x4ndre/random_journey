class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Tile.size;
        this.height = Tile.size;
        this.color = "black";
    }

    static get size() {
        return 100;
    }
}
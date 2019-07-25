class Tile {
    constructor(x, y, designer_id) {
        this.x = x;
        this.y = y;
        this.width = Tile.size;
        this.height = Tile.size;
        this.color = "black";
        this.designer_id = designer_id;
    }

    static get size() {
        return 100;
    }
}
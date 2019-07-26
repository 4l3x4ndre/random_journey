class Tile {
    constructor(x, y, designer_id) {
        this.x = x;
        this.y = y;
        this.width = Tile.size;
        this.height = Tile.size;
        this.padding = Tile.padding;
        this.color = "black";
        this.designer_id = designer_id;

        // This value need to be random between level,
        // still need to decide how to do it and according to what.
        this.enemy_prct = .2;
    }

    static get size() {
        return 100;
    }

    static get padding() {
        return Tile.size/10;
    }
}
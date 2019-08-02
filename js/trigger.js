class Trigger {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.width = Trigger.edge_size;
        this.height = Trigger.edge_size;
        this.color = "blue";

        this.designer_id = game.designer.bg_array.length;
        game.designer.addDrawable(game.designer.bg_array, this); 
    }

    static get edge_size() {
        return Tile.size/4;
    }
}
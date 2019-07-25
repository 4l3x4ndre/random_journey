class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Tile.size/5;
        this.height = Tile.size/5;     
        this.color = "lightgreen";   
    }

    setSettings(game) {
        this.game = game;
        this.game.designer.addDrawable(this.game.designer.fg_array, this);

        this.map = this.game.map;
        this.x = this.map.start_pos * Tile.size + Tile.size/2;
        this.y = Tile.size/2;
    }

    movement (amount_x, amount_y) {
        this.x += amount_x;
        this.y += amount_y;
    }

    canvasPosition() {
        this.canvas_x = this.x - this.game.designer.vision_area.x;
        this.canvas_y = this.y - this.game.designer.vision_area.y;
    }

}
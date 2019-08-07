class Tile {
    constructor(x, y, designer_id, game) {
        this.x = x;
        this.y = y;
        this.width = Tile.size;
        this.height = Tile.size;
        this.padding = Tile.padding;
        this.designer_id = designer_id;

        this.game = game;
        this.color = this.game.current_world.tile_color;
        this.enemy_prct = this.game.current_world.enemies_density;
    }

    static get size() {
        return 100;
    }

    static get padding() {
        return Tile.size/10;
    }
}
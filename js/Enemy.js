enemies = {}
enemies_index = 0;

class Enemy {
    constructor() {
        this.width = Enemy.size;
        this.height = Enemy.size;
        this.color = "red";

        this.enemies_id = enemies_index;
        enemies[this.enemies_id] = this;
        enemies_index++;
    }

    setSettings(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.designer = game.designer;
        this.designer.addDrawable(this.designer.fg_array, this);
    }

    static get size() {
        return 20;
    }
}
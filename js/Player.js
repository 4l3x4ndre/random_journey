class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Tile.size/5;
        this.height = Tile.size/5;     
        this.color = "lightgreen"; 
        this.tile_id = -1;  
        this.has_take_damage = false;
        this.life = 3;
        this.respawn_delay = 1;
    }

    setSettings(game) {
        this.game = game;
        this.designer_id = this.game.designer.fg_array.length;
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
    
    takeDamage() {
        if (!this.has_take_damage) {
            this.has_take_damage = true;
            for (var i = 0; i < Particle.settings.density; i++) {
                new Particle(this.x, this.y, this.color, this.game);                
            }
            this.game.designer.removeDrawable(this.game.designer.fg_array, this.designer_id);

            // Set the player outside of the map to avoid enemies from chase him
            this.x = -Tile.size * 2;
            this.y = -Tile.size * 2;
            
            setTimeout(() => {
                this.respawn();
            }, this.respawn_delay * 1000);
        }
    }

    respawn() {
        if (this.life > 1) {
            this.designer_id = this.game.designer.fg_array.length;
            this.game.designer.addDrawable(this.game.designer.fg_array, this);
            this.x = this.map.start_pos * Tile.size + Tile.size/2;
            this.y = Tile.size/2;
            this.life --;
            this.game.change_life_text();
            this.has_take_damage = false;
            Enemy.reset_pos();
        } else {
            console.log("PLAYER DIED");
            this.game.player_death();
        }

    }

}
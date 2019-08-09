class Game {
    constructor() {
        this.bg_canvas = document.querySelector("#bg-canvas");
        this.bg_ctx = this.bg_canvas.getContext("2d");

        this.fg_canvas = document.querySelector("#fg-canvas");
        this.fg_ctx = this.fg_canvas.getContext("2d");

        this.inputs = null;
        this.designer = null;
        this.map = null;

        this.speed = {
            walk: 1,
            run: 2
        };
        this.current_speed = this.speed.walk;

        this.player = null;
        this.player_blocking_sizes = {
            width: this.fg_canvas.width/7,
            height: this.fg_canvas.height/7,
        }

        this.reload_page_timeout = null;
        this.finish = false;

        this.world_id = 0;
        this.level_id = 0;

        this.text_state = "increase";
        this.text_world = new Text(this, 1, "world-p", "World ", this.world_id+1, " - ", this.level_id+1);
        this.change_text_opacity = true;
        this.text_world.set_direct_opacity(0);

        this.text_life = new Text(this, 1, "life-p", "Life ", 0);
        this.text_life.set_direct_opacity(1);
    }

    player_death() {
        this.text_life = new Text(this, 1, "life-p", "Game Over", "");
        this.text_life.set_inner_html();
    }

    change_life_text() {
        this.text_life = new Text(this, 1, "life-p", "Life ", this.player.life);
        this.text_life.set_inner_html();
    }

    change_world_text() {
        this.text_world = new Text(this, 1, "world-p", "World ", this.world_id+1, " - ", this.level_id+1);
        this.text_world.set_inner_html();
    }

    change_world_opacity() {
        if (this.change_text_opacity) {
            if (this.text_state == "increase") {
                this.text_world.set_opacity(1);
            } else if (this.text_state == "decrease") {
                this.text_world.set_opacity(0);
            }
        }
    }

    reload_game() {
        this.general.setPosition(this.player, -10, -10);
        enemies = {};
        for (var i in this.designer.fg_array) {
            delete this.designer.fg_array[i];
        }
        for (var i in this.designer.bg_array) {
            delete this.designer.bg_array[i];
        }

        this.level_id++;
        if (this.level_id > 4) {
            this.level_id = 0;
            this.world_id++;
            if (this.world_id+1 <= this.worlds.length) {
                this.current_world = this.worlds[this.world_id];
            } else {
                console.log("FINISH!");
                this.finish = true;
                return;
            }
        }
        if (!this.finish) {
            this.change_world_text();
            this.change_world_opacity();
            this.change_text_opacity = true;
        }
        this.map.grid = [];
        this.map.setLevel();
        this.map.convertToTile(this.map.grid);
        this.player.setSettings(this);
        this.designer.centerMapVision();
        this.designer.draw(game.bg_canvas, game.bg_ctx, game.designer.bg_array);
    }

    check_player_goal() {
        if (this.general.collision(this.player, this.map.trigger)) {
            if (this.reload_page_timeout == null) {
                console.log("RELOADING...");
                for (var i=0; i<Particle.settings.density*2; i++) {
                    new Particle(this.map.trigger.x, this.map.trigger.y, this.map.trigger.color, this);
                }
                this.reload_page_timeout = setTimeout(() => {
                    this.reload_page_timeout = null;
                    this.reload_game();
                }, 2000);
            }
        }
    }

    particles_movement() {
        for (var i in particles) {
            const p = particles[i];
            p.move();
        }
    }

    enemies_life() {
        for (var i in enemies) {
            const e = enemies[i];
            e.behaviour();
        }
    }

    movement() {
        if (this.designer == null) {
            
            return;
        }

        if (this.inputs.run) {
            this.current_speed = this.speed.run;
        } else {
            this.current_speed = this.speed.walk;
        }

        let map_moving_x = true;
        let map_moving_y = true;

        this.player.canvasPosition();
        
        if (this.inputs.up && this.general.movementPossibleWithMap(this.player, this.current_speed + Tile.padding, "up")) {
            if (this.player.y < this.designer.vision_area.y + this.player_blocking_sizes.height) {
                this.designer.movement(0, -this.current_speed);
            }
            this.player.movement(0, -this.current_speed);
        } else if (this.inputs.down && this.general.movementPossibleWithMap(this.player, this.current_speed + Tile.padding, "down")) {
            if (this.player.y > this.designer.vision_area.y+this.designer.vision_area.height-this.player_blocking_sizes.height) {
                this.designer.movement(0, this.current_speed);
            }
            this.player.movement(0, this.current_speed);
        } else {
            map_moving_y = false;
        }

        if (this.inputs.left && this.general.movementPossibleWithMap(this.player, this.current_speed + Tile.padding, "left")) {
            if (this.player.x < this.designer.vision_area.x + this.player_blocking_sizes.width) {
                this.designer.movement(-this.current_speed, 0);
            }
            this.player.movement(-this.current_speed, 0);
        } else if (this.inputs.right && this.general.movementPossibleWithMap(this.player, this.current_speed + Tile.padding, "right")) {
            if (this.player.x > this.designer.vision_area.x+this.designer.vision_area.width-this.player_blocking_sizes.width) {
                this.designer.movement(this.current_speed, 0);
            }
            this.player.movement(this.current_speed, 0);
        } else {
            map_moving_x = false;
        }

        if (map_moving_x || map_moving_y) {
            designer.draw(this.bg_canvas, this.bg_ctx, this.designer.bg_array);
        }
    }

    setSettings(inputs, designer, map, player, general, worlds) {
        this.inputs = inputs;
        this.designer = designer;
        this.map = map;
        this.player = player;
        this.text_life = new Text(this, 1, "life-p", "Life ", this.player.life);
        this.text_life.set_inner_html();
        this.general = general;
        this.worlds = worlds;
        this.current_world = this.worlds[this.world_id];
        this.change_world_text();
    }
}
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
    }

    check_player_goal() {
        if (this.general.collision(this.player, this.map.trigger)) {
            if (this.reload_page_timeout == null) {
                this.reload_page_timeout = setTimeout(() => {
                    this.reload_page_timeout = null;
                    document.location.reload();
                }, 2000);
            }
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

    setSettings(inputs, designer, map, player, general) {
        this.inputs = inputs;
        this.designer = designer;
        this.map = map;
        this.player = player;
        this.general = general;
        
    }
}
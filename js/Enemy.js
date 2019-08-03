enemies = {}
enemies_index = 0;

class Enemy {
    constructor() {
        this.width = Enemy.size;
        this.height = Enemy.size;
        this.sleep_color = "grey";
        this.walk_color = "yellow";
        this.load_attack_color = "orange";
        this.attack_color = "red";
        this.color = this.sleep_color;
        this.type = "jump";

        this.awake_dst = Tile.size;
        this.attack_dst = Tile.size/3;
        this.walkable_speed = .75;
        this.attack_speed = 2;
        this.current_speed = this.walkable_speed;

        this.attacking = false;
        this.can_attack = false;
        this.attack_delay = 0.25;
        this.attack_timeout = null;
        this.jump_dst_traveled = 0;
        this.move_forward = false;
        this.old_pos = {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };

        this.enemies_id = enemies_index;
        enemies[this.enemies_id] = this;
        enemies_index++;
    }

    behaviour() {

        if (this.game.general.collision(this, this.game.player)) {
            this.game.player.takeDamage();
        }

        if (this.attacking) {
            if (this.jump_dst_traveled < this.attack_dst) {
                this.jump_dst_traveled += 1;
                this.x += this.dx;
                this.y += this.dy;
            } else if (this.game.general.distance(this, this.old_pos)> 0) {
                this.setDirection(this.old_pos);
                this.x += this.dx;
                this.y += this.dy;
                this.move_forward = false;
            } else {
                this.attacking = false;
            }
        } else if (this.attack_timeout == null && this.attacking == false) {
            if (this.player_too_close()) {
                this.attack();
            } else if (this.player_close()) {
                this.can_attack = false;
                this.move_to(this.game.player);
            } else {
                this.can_attack = false;
                this.color = this.sleep_color;
            }
        }
        
    }

    attack() {
        if (!this.can_attack) {
            if (this.attack_timeout == null) {
                this.color = this.load_attack_color;
                this.attack_timeout = setTimeout(() => {
                    this.can_attack = true;
                    this.attack_timeout = null;
                }, this.attack_delay*1000);
            }
            return;
        }
        this.color = this.attack_color;

        this.attacking = true;
        if (this.type == "jump") {
            this.jump_attack();
        }
    }

    jump_attack() {
        this.old_pos.x = this.x;
        this.old_pos.y = this.y;
        this.setDirection(this.game.player);
        this.move_forward = true;
        this.jump_dst_traveled = 0;
        this.can_attack = false;
    }

    setDirection(target) {
        let target_x = target.x;
        let target_y = target.y;
        this.dst = Math.sqrt(Math.pow(target_x - this.x, 2) + Math.pow(target_y - this.y, 2));
        this.angle = Math.asin((target_x - this.x)/this.dst);
        this.hypotenuse_length = (target_x - this.x) / Math.sin(this.angle);
        this.dx = (target_x - this.x)/this.hypotenuse_length * this.current_speed;
        this.dy = (target_y - this.y)/this.hypotenuse_length * this.current_speed;
    }

    move_to(target) {
        this.color = this.walk_color;
        if (this.x > target.x) {
            this.move(-this.current_speed, 0);
        } else if (this.x < target.x) {
            this.move(this.current_speed, 0);
        }
        if (this.y > target.y) {
            this.move(0, -this.current_speed);
        } else if (this.y < target.y) {
            this.move(0, this.current_speed);
        }
    }

    move(x, y) {
        if ((x > 0 && this.game.general.movementPossibleWithMap(this, this.current_speed, "right"))
        || x < 0 && this.game.general.movementPossibleWithMap(this, this.current_speed, "left")) {
            this.x += x;
        }
        if ((y > 0 && this.game.general.movementPossibleWithMap(this, this.current_speed, "down"))
        || y < 0 && this.game.general.movementPossibleWithMap(this, this.current_speed, "up")) {
            this.y += y;
        }
    }

    player_close() {
        let dst = this.game.general.distance(this, this.game.player);
        if (dst <= this.awake_dst) {
            return true;
        } else {
            return false;
        }
    }

    player_too_close() {
        let dst = this.game.general.distance(this, this.game.player);
        if (dst <= this.attack_dst) {
            return true;
        } else {
            return false;
        }
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
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

        if (this.inputs.up) {
            this.designer.movement(0, -this.current_speed);
        } else if (this.inputs.down) {
            this.designer.movement(0, this.current_speed)
        }

        if (this.inputs.left) {
            this.designer.movement(-this.current_speed, 0);
        } else if (this.inputs.right) {
            this.designer.movement(this.current_speed, 0);
        }
    }

    setSettings(inputs, designer, map) {
        this.inputs = inputs;
        this.designer = designer;
        this.map = map;
    }
}
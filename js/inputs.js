class InputManager {
    constructor() {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.run = false;

        this.need_space_up = false;

        this.mouse = {
            x: 0,
            y: 0
        }
    }

    getMousePosition(e) {
        const rect = game.bg_canvas.getBoundingClientRect();
        this.mouse.x = (0.5 + e.clientX - rect.left) | 0;
        this.mouse.y = (0.5 + e.clientY - rect.top) | 0;
    }

    spacePressed() {
        if (!this.need_space_up) {
            // Action
            this.need_space_up = true;
        }
    }

    mapZoomPressed() {
        this.game.designer.zoomingMap();
    }

    keyDown(e) {
        
        if (e.keyCode == 90 || e.keyCode == 87) {
            this.up = true;
        } else if (e.keyCode == 81 || e.keyCode == 65) {
            this.left = true;
        } else if (e.keyCode == 83) {
            this.down = true;
        } else if (e.keyCode == 68) {
            this.right = true;
        } else if (e.keyCode == 16) {
            this.run = true;
        } else if (e.keyCode == 32) {
            this.spacePressed();
        }
        
    }

    keyUp(e) {
        if (e.keyCode == 90 || e.keyCode == 87) {
            this.up = false;
        } else if (e.keyCode == 81 || e.keyCode == 65) {
            this.left = false;
        } else if (e.keyCode == 83) {
            this.down = false;
        } else if (e.keyCode == 68) {
            this.right = false;
        } else if (e.keyCode == 16) {
            this.run = false;
        } else if (e.keyCode == 77) {
            this.mapZoomPressed();
        } else if (e.keyCode == 32) {
            this.need_space_up = false;
        }
    }

    setSettings(game) {
        this.game = game;        
    }
}
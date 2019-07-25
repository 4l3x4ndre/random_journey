class Designer {
    constructor() {
        this.game = null; // Init in setSettings
        this.map = null; // Init in setSettings
        this.bg_array = [];
        this.fg_array = [];

        this.vision_area = {
            x:0,
            y:0,
            width: 400,
            height: 400
        }

        this.zoom = {
            min: 200,
            max: null // Init in setSettings
        }
        this.current_zoom = this.zoom.min;
    }

    setSettings(game) {
        this.game = game;
        this.map = game.map;

        this.factor = this.game.bg_canvas.width/this.vision_area.width;

        this.zoom.max = this.map.edge_size * Tile.size;
        this.zoom_array = [this.zoom.min, this.zoom.normal, this.zoom.max];
        this.setMapZoom(this.current_zoom);
    }    

    movement (amount_x, amount_y) {
        if ((this.vision_area.x + amount_x >= 0 && amount_x < 0)
            || (this.vision_area.x + amount_x + this.vision_area.width <= this.map.sizes.width && amount_x > 0)) {        
            this.vision_area.x += amount_x;
        }
        if ((this.vision_area.y + amount_y >= 0 && amount_y < 0)
            || (this.vision_area.y + amount_y + this.vision_area.height <= this.map.sizes.height && amount_y > 0)) {        
            this.vision_area.y += amount_y;
        }
    }

    zoomingMap() {
        
        if (this.current_zoom == this.zoom.min) {
            this.current_zoom = this.zoom.max;
        } else {
            this.current_zoom = this.zoom.min;
        }
        this.setMapZoom();
    }

    setMapZoom(custom_zoom = -1) {
        if (custom_zoom != -1) {
            this.current_zoom = custom_zoom;
        }

        this.changeMapVisionSize(this.current_zoom);
        if (this.current_zoom != this.zoom.max) {
            this.centerMapVision();
        } else {
            this.centerMapVision(0, 0);
        }
        this.draw_bg();
    }

    centerMapVision(custom_x = null, custom_y = null) {
        if (custom_x != null && custom_y != null) {
            this.vision_area.x = custom_x;
            this.vision_area.y = custom_y;
            return;
        }
        // center the vision area horizontaly
        this.vision_area.x = this.game.player.x - this.vision_area.width/2;
        // center the vision area verticaly
        this.vision_area.y = this.game.player.y - this.vision_area.height/2;        
    }

    changeMapVisionSize(zoom) {
        this.vision_area.width = zoom;
        this.vision_area.height = zoom;

        this.factor = this.game.bg_canvas.width/this.vision_area.width;
    }
    
    draw(canvas, ctx, array) {
        canvas.width = canvas.width;
        for (var i in array) {
            const element = array[i];
            if (!this.isVisible(element)) {
                continue;
            }

            ctx.beginPath();
            ctx.fillStyle = element.color;
            ctx.rect(
                (element.x - this.vision_area.x) * this.factor,
                (element.y - this.vision_area.y) * this.factor,
                element.width * this.factor,
                element.height * this.factor
            );
            ctx.fill();
            ctx.closePath();
        }
    }

    draw_bg() {
        this.game.bg_canvas.width = this.game.bg_canvas.width;
        for (var i in this.bg_array) {
            const element = this.bg_array[i];
            if (!this.isVisible(element)) {
                continue;
            }

            this.game.bg_ctx.beginPath();
            this.game.bg_ctx.fillStyle = element.color;
            this.game.bg_ctx.rect(
                (element.x - this.vision_area.x) * this.factor,
                (element.y - this.vision_area.y) * this.factor,
                element.width * this.factor,
                element.height * this.factor
            );
            this.game.bg_ctx.fill();
            this.game.bg_ctx.closePath();
        }
    }

    draw_fg() {
        this.game.fg_canvas.width = this.game.fg_canvas.width;
        for (var i in this.fg_array) {
            const element = this.fg_array[i];
            if (!this.isVisible(element)) {
                continue;
            }

            this.game.fg_ctx.beginPath();
            this.game.fg_ctx.fillStyle = element.color;
            this.game.fg_ctx.rect(
                (element.x - this.vision_area.x) * this.factor,
                (element.y - this.vision_area.y) * this.factor,
                element.width * this.factor,
                element.height * this.factor
            );
            this.game.fg_ctx.fill();
            this.game.fg_ctx.closePath();
        }
    }

    isVisible(obj) {
        if (obj.x + obj.width >= this.vision_area.x && obj.x <= this.vision_area.x + this.vision_area.width) {
            if (obj.y + obj.height >= this.vision_area.y && obj.y <= this.vision_area.y + this.vision_area.height) {
                return true;
            }
        }
        return false;
    }

    addDrawable(array, obj) {
        array.push(obj);
    }
}
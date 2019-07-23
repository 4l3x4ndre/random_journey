class Designer {
    constructor() {
        this.game = null;
        this.map = null;
        this.bg_array = [];

        this.vision_area = {
            x:0,
            y:0,
            width: 400,
            height: 400
        }

        this.zoom = {
            min: [100, 200],
            normal: [200, 400],
            max: [0, 0]
        }
        this.zoom_array = [this.zoom.min, this.zoom.normal, this.zoom.max];
        this.current_zoom_id = 1;
    }

    setSettings(game) {
        this.game = game;
        this.map = game.map;

        this.factor_width = this.game.bg_canvas.width/this.vision_area.width;
        this.factor_height = this.game.bg_canvas.height/this.vision_area.height;

        this.zoom.max = [this.map.edge_size * Tile.size[0], this.map.edge_size * Tile.size[1]];
        this.zoom_array = [this.zoom.min, this.zoom.normal, this.zoom.max];
        this.setMapZoom(this.current_zoom_id);
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
        
        if (this.current_zoom_id + 1 > this.zoom_array.length-1) {
            this.current_zoom_id=0;
        } else {
            this.current_zoom_id += 1;
        }
        this.setMapZoom();
    }

    setMapZoom(custom_id = -1) {
        let zoom_factor_width = 0;
        let zoom_factor_height = 0;
        if (custom_id != -1) {
            zoom_factor_width = this.zoom_array[custom_id][0];
            zoom_factor_height = this.zoom_array[custom_id][1];
        } else {
            zoom_factor_width = this.zoom_array[this.current_zoom_id][0];            
            zoom_factor_height = this.zoom_array[this.current_zoom_id][1];
        }

        let diff_x = zoom_factor_width - this.vision_area.width;
        let diff_y = zoom_factor_height - this.vision_area.height;

        this.centerMapVision(zoom_factor_width, zoom_factor_height, diff_x, diff_y);
        this.changeMapVisionSize(zoom_factor_width, zoom_factor_height);
    }

    centerMapVision(zoom_factor_width, zoom_factor_height, diff_x, diff_y) {
        // center the vision area horizontaly
        if (diff_x < 0) {
            diff_x = this.vision_area.width - zoom_factor_width;
            this.vision_area.x += diff_x/2;
        } else {
            this.vision_area.x -= diff_x/2;
        }
        // center the vision area verticaly
        if (diff_y < 0) {
            diff_y = this.vision_area.height - zoom_factor_height;
            this.vision_area.y += diff_y/2;
        } else {
            this.vision_area.y -= diff_y/2;
        }
    }

    changeMapVisionSize(zoom_factor_width, zoom_factor_height) {
        this.vision_area.width = zoom_factor_width;
        this.vision_area.height = zoom_factor_height;

        this.factor_width = this.game.bg_canvas.width/this.vision_area.width;
        this.factor_height = this.game.bg_canvas.height/this.vision_area.height;
    }
    
    draw() {
        this.game.bg_canvas.width = this.game.bg_canvas.width;
        for (var i in this.bg_array) {
            const element = this.bg_array[i];
            if (!this.isVisible(element)) {
                continue;
            }

            this.game.bg_ctx.beginPath();
            this.game.bg_ctx.fillStyle = "black";
            this.game.bg_ctx.rect(
                (element.x - this.vision_area.x) * this.factor_width,
                (element.y - this.vision_area.y) * this.factor_height,
                element.width * this.factor_width,
                element.height * this.factor_height
            );
            this.game.bg_ctx.fill();
            this.game.bg_ctx.closePath();
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
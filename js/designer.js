class Designer {
    constructor() {
        this.bg_array = [];
    }

    draw() {
        for (var i in this.bg_array) {
            const element = this.bg_array[i];
            game.bg_ctx.beginPath();
            game.bg_ctx.fillStyle = "black";
            game.bg_ctx.rect(element.x, element.y, element.width, element.height);
            game.bg_ctx.fill();
            game.bg_ctx.closePath();
        }
    }

    addDrawable(array, obj) {
        array.push(obj);
    }
}
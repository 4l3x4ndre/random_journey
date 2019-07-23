class Game {
    constructor() {
        this.bg_canvas = document.querySelector("#bg-canvas");
        this.bg_ctx = this.bg_canvas.getContext("2d");

        this.fg_canvas = document.querySelector("#fg-canvas");
        this.fg_ctx = this.fg_canvas.getContext("2d");
    }
}
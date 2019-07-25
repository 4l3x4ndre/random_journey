const inputs = new InputManager();
document.addEventListener("keydown", inputs.keyDown.bind(inputs), false);
document.addEventListener("keyup", inputs.keyUp.bind(inputs), false);
document.onmousemove = inputs.getMousePosition.bind(inputs);

const game = new Game();

const designer = new Designer();

const map = new Map(8);

const player = new Player(50, 50);

game.setSettings(inputs, designer, map, player);
map.setSettings(game);
player.setSettings(game);
designer.setSettings(game);

designer.draw_bg();

requestAnimationFrame(loop);
function loop() {

    game.movement();
    designer.draw(game.fg_canvas, game.fg_ctx, game.designer.fg_array);

    requestAnimationFrame(loop);
}
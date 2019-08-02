const inputs = new InputManager();
document.addEventListener("keydown", inputs.keyDown.bind(inputs), false);
document.addEventListener("keyup", inputs.keyUp.bind(inputs), false);
document.onmousemove = inputs.getMousePosition.bind(inputs);

const game = new Game();

const designer = new Designer();

const map = new Map(8);

const player = new Player(50, 50);

const general = new General(game);

game.setSettings(inputs, designer, map, player, general);
map.setSettings(game);
player.setSettings(game);
designer.setSettings(game);
general.setSettings(game);
inputs.setSettings(game);

//designer.draw_bg();
designer.draw(game.bg_canvas, game.bg_ctx, game.designer.bg_array);

requestAnimationFrame(loop);
function loop() {

    game.movement();
    game.enemies_life();
    game.check_player_goal();
    designer.draw(game.fg_canvas, game.fg_ctx, game.designer.fg_array);

    requestAnimationFrame(loop);
}
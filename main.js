const inputs = new InputManager();
document.addEventListener("keydown", inputs.keyDown.bind(inputs), false);
document.addEventListener("keyup", inputs.keyUp.bind(inputs), false);
document.onmousemove = inputs.getMousePosition.bind(inputs);

const game = new Game();

const designer = new Designer();

const map = new Map();

const player = new Player(50, 50);

const general = new General(game);

const worlds = [
    new World("lightgreen", "black", .2, ["grey", "yellow", "orange", "red"], 8),
    new World("lightblue", "grey", .3, ["darkorange", "darkred", "red", "lightred"], 8)
];

game.setSettings(inputs, designer, map, player, general, worlds);
map.setSettings(game);
player.setSettings(game);
designer.setSettings(game);
general.setSettings(game);
inputs.setSettings(game);

designer.draw(game.bg_canvas, game.bg_ctx, game.designer.bg_array);

requestAnimationFrame(loop);
function loop() {
    if (!game.player.has_take_damage) {
        if (game.reload_page_timeout == null) {
            game.movement();
        }
        game.check_player_goal();
    }
    if (game.reload_page_timeout == null) {
        game.enemies_life();
    }
    game.change_world_opacity();
    game.particles_movement();
    designer.draw(game.fg_canvas, game.fg_ctx, game.designer.fg_array);

    requestAnimationFrame(loop);
}
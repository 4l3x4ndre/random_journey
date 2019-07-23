const inputs = new InputManager();
document.addEventListener("keydown", inputs.keyDown.bind(inputs), false);
document.addEventListener("keyup", inputs.keyUp.bind(inputs), false);
document.onmousemove = inputs.getMousePosition.bind(inputs);

const game = new Game();

const designer = new Designer();

const map = new Map(8);

game.setSettings(inputs, designer, map);
designer.setSettings(game);
map.setSettings(game);

requestAnimationFrame(loop);
function loop() {

    game.movement();
    designer.draw();

    requestAnimationFrame(loop);
}
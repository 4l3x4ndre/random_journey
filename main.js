const game = new Game();
const designer = new Designer();
const map = new Map(8);

requestAnimationFrame(loop);
function loop() {

    designer.draw();

    requestAnimationFrame(loop);
}
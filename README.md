# Random Journey

Trying to make a simple rpg using Javascript and canvas.

## Map

The map is randomly generated. It use the background canvas to draw. This differentiates the objects and the tiles (who are supposed to be static) to the moving elements like the player.

The background canvas is draw only when the map is moving, to improve performance.

You can zoom in and out by pressing 'm'. This will change the visible area size. The position of this area will change too to keep centered on player.

The map is moving only when the player is to close of the edge of the canvas. This allow to keep the player visible.

## Player

By pressing ZQSD, the player move around the map freely without collision detection for the moment.
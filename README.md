# Random Journey

Trying to make a simple rpg using Javascript and canvas. The goal is to reach the blue trigger at the end of the path without touching a ennemy.

## Map

The map is randomly generated. It use the background canvas to draw. This differentiates the objects and the tiles (who are supposed to be static) to the moving elements like the player.

The background canvas is draw only when the map is moving, to improve performance.

You can zoom in and out by pressing 'm'. This will change the visible area size. The position of this area will change too to keep centered on player.

The map is moving only when the player is to close of the edge of the canvas. This allow to keep the player visible.

Each tile of the map got a pagging value. This prevent moving objects to touch a edge of the map, which looks weird.

## Player

By pressing ZQSD or WASD, the player move around the map. He can't go outside the map.

## Enemies

Enemies are randomly instantiate. Each tile got a spawing percentage (for the moment they all have the same).
According to this percentage, the enemy will spawn on a random position inside of his tile.

The enemies will have different behaviours according to their type.
The first type is really simple. The enemy move to the player if he is too close. When the enemy is enough close, he jump to the player then go back to his initial position.

Enemies got different colors: grey (doing nothing), yellow (walk to the player), orange (charging the attack), red (attack).

If they touch the player, game over.

## General

A script called General contains all the functions that many entities need, like collisions, distance, etc.
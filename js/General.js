class General {
    constructor() {
    }

    mapTileUnder(obj) {
        // return the position of the tile under the object according to the map grid array
        return (Math.floor(obj.y/Tile.size)) * this.map.edge_size + Math.floor(obj.x/Tile.size);
    }

    movementPossibleWithMap(obj, speed, edge) {
        let tile_id = this.mapTileUnder(obj);
        const tile = this.map.grid[tile_id];
        let research_tile = null;
        if (edge == "left") {
            research_tile = this.tileOfId(tile_id-1);
            return this.checkLeftMovement(tile, research_tile, obj, speed);
        } else if (edge == "right") {
            research_tile = this.tileOfId(tile_id+1);
            return this.checkRightMovement(tile, research_tile, obj, speed);
        } else if (edge == "up") {
            research_tile = this.tileOfId(tile_id-this.map.edge_size);
            return this.checkUpMovement(tile, research_tile, obj, speed);
        } else if (edge == "down") {
            research_tile = this.tileOfId(tile_id+this.map.edge_size);
            console.log(tile_id, tile_id+this.map.edge_size);
            
            return this.checkDownMovement(tile, research_tile, obj, speed);
        }
    }

    checkLeftMovement(tile, research_tile, obj, speed) {
        if ((research_tile == null && obj.x - speed < tile.x) || obj.x - speed < 0) {
            // There is nothing to the left of the tile where is the object
            // (no tile or the obj reach the edge of map)
            return false;
        }
        return true;
    }

    checkRightMovement(tile, research_tile, obj, speed) {
        if ((research_tile == null && obj.x+obj.width+speed > tile.x+Tile.size)
        || obj.x+obj.width+speed > this.map.edge_size*Tile.size) {
            return false;
        }
        return true;
    }

    checkUpMovement(tile, research_tile, obj, speed) {
        if ((research_tile == null && obj.y - speed < tile.y) || obj.y - speed < 0) {
            return false;
        }
        return true;
    }

    checkDownMovement(tile, research_tile, obj, speed) {
        if ((research_tile == null && obj.y+obj.height+speed > tile.y + Tile.size)
        || obj.y + obj.height + speed > this.map.edge_size*Tile.size) {
            return false;
        }
        return true;
    }
    tileOfId(id) {
        let tile = this.map.grid[id];
        if (tile == 0) {
            return null;
        } else {
            return tile;
        }
    }

    setSettings(game) {
        this.game = game;
        this.map = game.map;
        this.designer = game.designer;
    }

}
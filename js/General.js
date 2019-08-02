class General {
    constructor() {
    }

    collision(a, b) {
        if (((a.y >= b.y && a.y <= b.y + b.height) || (a.y + a.height >= b.y && a.y + a.height <= b.y + b.height)) && 
        ((a.x >= b.x && a.x <= b.x + b.width) || (a.x + a.width >= b.x && a.x + a.width <= b.x + b.width))) {
            return true;
        } else {
            return false;
        }
    }

    distance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }



    mapTileUnderCoord(x, y) {
        // return the position of the tile under the object according to the map grid array
        return (Math.floor(y/Tile.size)) * this.map.edge_size + Math.floor(x/Tile.size);
    }

    movementPossibleWithMap(obj, speed, edge) {
        if (edge == "left") {
            return this.checkLeftMovement(obj, speed);
        } else if (edge == "right") {
            return this.checkRightMovement(obj, speed);
        } else if (edge == "up") {
            return this.checkUpMovement(obj, speed);
        } else if (edge == "down") {
            return this.checkDownMovement(obj, speed);
        }
    }

    checkLeftMovement(obj, speed) {
        let tile_id = this.mapTileUnderCoord(obj.x, obj.y);
        let tile = this.map.grid[tile_id];
        let research_tile = this.tileOfId(tile_id-1);

        if ((tile != null && research_tile == null && obj.x - speed < tile.x) || obj.x - speed < 0) {
            // There is nothing to the left of the tile where is the object
            // (no tile or the obj reach the edge of map)
            return false;
        }

        tile_id = this.mapTileUnderCoord(obj.x, obj.y + obj.height);
        tile = this.map.grid[tile_id];
        research_tile = this.tileOfId(tile_id-1);

        if ((tile != null && research_tile == null && obj.x - speed < tile.x) || obj.x - speed < 0) {
            // There is nothing to the left of the tile where is the object
            // here it use the opposite edge to avoid glitch when the obj is between to tiles
            return false;
        }
        return true;
    }

    checkRightMovement(obj, speed) {
        let tile_id = this.mapTileUnderCoord(obj.x, obj.y);
        let tile = this.map.grid[tile_id];
        let research_tile = this.tileOfId(tile_id+1);

        if ((tile != null && research_tile == null && obj.x+obj.width+speed > tile.x+Tile.size)
        || obj.x+obj.width+speed > this.map.edge_size*Tile.size) {
            return false;
        }

        tile_id = this.mapTileUnderCoord(obj.x, obj.y + obj.height);
        tile = this.map.grid[tile_id];
        research_tile = this.tileOfId(tile_id+1);

        if ((tile != null && research_tile == null && obj.x+obj.width+speed > tile.x+Tile.size)
        || obj.x+obj.width+speed > this.map.edge_size*Tile.size) {
            return false;
        }
        return true;
    }

    checkUpMovement(obj, speed) {
        let tile_id = this.mapTileUnderCoord(obj.x, obj.y);
        let tile = this.map.grid[tile_id];
        let research_tile = this.tileOfId(tile_id-this.map.edge_size);

        if ((tile != null && research_tile == null && obj.y - speed < tile.y) || obj.y - speed < 0) {
            return false;
        }

        tile_id = this.mapTileUnderCoord(obj.x + obj.width, obj.y);
        tile = this.map.grid[tile_id];
        research_tile = this.tileOfId(tile_id-this.map.edge_size);

        if ((tile != null && research_tile == null && obj.y - speed < tile.y) || obj.y - speed < 0) {
            return false;
        }        
        return true;
    }

    checkDownMovement(obj, speed) {
        let tile_id = this.mapTileUnderCoord(obj.x, obj.y);
        let tile = this.map.grid[tile_id];
        let research_tile = this.tileOfId(tile_id+this.map.edge_size);

        if ((tile != null && research_tile == null && obj.y+obj.height+speed > tile.y + Tile.size)
        || obj.y + obj.height + speed > this.map.edge_size*Tile.size) {
            return false;
        }

        tile_id = this.mapTileUnderCoord(obj.x + obj.width, obj.y);
        tile = this.map.grid[tile_id];
        research_tile = this.tileOfId(tile_id+this.map.edge_size);

        if ((tile != null && research_tile == null && obj.y+obj.height+speed > tile.y + Tile.size)
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
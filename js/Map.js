class Map {
    constructor(edge_size) {
        this.edge_size = edge_size;
        this.grid_size = edge_size*edge_size;
        this.grid_nb_signification = [];
        this.grid = Array(this.grid_size).fill(0);
        this.designer = null;

        this.sizes = {
            width: this.edge_size * Tile.size,
            height: this.edge_size * Tile.size
        }
        
        this.setLevel();
    }

    setSettings(game) {
        this.game = game;
        this.designer = game.designer;
        this.convertToTile(this.grid);
    }

    setLevel() {
        this.stop_generation = false;
        this.start_pos = (0.5 + (Math.random() * this.edge_size-1)) | 0;
        this.last_pos = null;
        this.grid[this.start_pos] = 1;

        this.prev_pos = this.start_pos;
        this.line = 0;
        this.prev_directions = -1;        

        while (!this.stop_generation)  {
            
            this.generation();

        }  
        
        // this is the last tile where the player can goes
        this.last_pos = (this.prev_pos+1) + (this.line) * this.edge_size;
              
    }

    addObjectDestigner(obj) {
        this.designer.addDrawable(this.designer.bg_array, obj);
    }

    convertToTile(array) {
        for (var i in array) {
            if (array[i] == 0){
                continue;
            }
            let x = (i % this.edge_size) * Tile.size;
            let y = Math.floor(i/ this.edge_size) * Tile.size;
            
            let tile = new Tile(x, y, i);
            this.addObjectDestigner(tile);
            this.changeGrid(i, tile);            
            
            // Don't instantiate enemies on the tile where is the player (the first walkable)
            // and on the last tile (where the key is)
            if (i != this.start_pos && i != this.last_pos-1) {
                this.addEnemyOnTile(tile);
            } else if (i == this.last_pos-1) {
                // put the trigger in the middle of the last tile
                this.trigger = new Trigger(x+Tile.size/2-Trigger.edge_size/2, y+Tile.size/2-Trigger.edge_size/2, this.game);
            }
        }
    }

    addEnemyOnTile(tile) {
        let r = Math.random();
        // add a enemy only if the hazard choose to, which allow the random density to look natural
        if (r > tile.enemy_prct) {
            return;
        }
        let enemy = new Enemy(this.game);        

        // padding prevent the enemy to spawn on the edge of the map, which doesn't look good to the eyes
        let x_min = tile.x + tile.padding;
        let x_max = tile.x + tile.width - tile.padding - enemy.width;
        let y_min = tile.y + tile.padding;
        let y_max = tile.y + tile.height - tile.padding - enemy.height;
        let x = Math.random() * (x_max - x_min) + x_min;
        let y = Math.random() * (y_max - y_min) + y_min;
        
        enemy.setSettings(x, y, this.game);
    }

    changeGrid(id, tile) {
        this.grid[id] = tile;
    }

    generation() {
        let direction = (0.5 + (Math.random() * 4)) | 0;

        if ((direction == 0 || direction == 1) && this.line < this.edge_size) {
            if (this.prev_pos != 0 && this.prev_direction != 2 && this.prev_direction != 3) {
                this.prev_pos --;
                this.prev_direction = direction;                    
            } else {
                if (this.line+1 < this.edge_size) {
                    if (this.prev_pos != this.edge_size-1 && this.prev_direction != 0 && this.prev_direction != 1) {
                        this.prev_pos ++;
                        this.prev_direction = 2;
                    } else {
                        this.prev_direction = 4;
                        this.line++;
                    }
                } else {
                    this.stop_generation = true;
                    
                }
            }
        } else if ((direction == 2 || direction == 3) && this.line < this.edge_size) {
            if (this.prev_pos != this.edge_size-1 && this.prev_direction != 0 && this.prev_direction != 1) {
                this.prev_pos ++;
                this.prev_direction = direction;
                
            } else {
                if (this.line+1 < this.edge_size) {
                    if (this.prev_pos != 0 && this.prev_direction != 2 && this.prev_direction != 3) {
                        this.prev_pos --;
                        this.prev_direction = 0;
                    } else {
                        this.prev_direction = 4;
                        this.line++;
                    }
                } else {
                    this.stop_generation = true;
                    
                }
            }
        } else {
            if (this.line+1 < this.edge_size) {
                this.prev_direction = 4;
                this.line++;
            } else {
                this.stop_generation = true;
                
            }
        }

        let id = this.prev_pos+this.line*this.edge_size;
        this.grid[id] = 1;
    }
}
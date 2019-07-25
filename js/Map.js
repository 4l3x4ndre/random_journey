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
        this.grid[this.start_pos] = 1;

        this.prev_pos = this.start_pos;
        this.line = 0;
        this.prev_directions = -1;        

        while (!this.stop_generation)  {
            
            this.generation();

        }        
    }

    addObjectDestigner(obj) {
        this.designer.addDrawable(this.designer.bg_array, obj);
    }

    convertToTile(array) {
        for (var i in array) {
            if (array[i] == 0){
                continue;
            }

            // The "+ 10" allow me to identify tiles. It's provisional.
            let x = (i % this.edge_size) * Tile.size + 10;
            let y = Math.floor(i/ this.edge_size) * Tile.size + 10;
            
            let tile = new Tile(x, y);
            this.addObjectDestigner(tile);
        }
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
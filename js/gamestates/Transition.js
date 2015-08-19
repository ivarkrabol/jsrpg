function Transition (grid, charsWeight) {
    this.grid = grid;
    this.charsWeight = charsWeight.split("");
    
    this.nextState = "";
    
    this.reset();
};

Transition.prototype.reset = function () {
    this.frame = this.grid.firstX();
    
    this.transGrid = new Grid(0, 0);
    
    var charsWeight = this.charsWeight;
    var charsRev = {};
    
    for (var i = 0; i < charsWeight.length; i++) {
        charsRev[charsWeight[i]] = i;
    }
    
    this.grid.getEach(function(elem){
        if (charsWeight.indexOf(elem) === -1) {
            charsWeight.push(elem);
            charsRev[elem] = 0;
        } 
    });
    
    this.charsWeight = charsWeight;
    this.charsRev = charsRev;
};

Transition.prototype.update = function (updateTime) {
    this.frame += 0.1 * updateTime;
    this.x = Math.floor(this.frame);
    
    var grid = this.grid;
    
    var transGridPrev = new Grid(this.x+1, grid.rows);

    transGridPrev.setEach(function (x, y) {
        return grid[y][x];
    });
    
    this.transGrid.init(this.x, grid.rows);

    var transition = this;
    this.transGrid.setEach(function (x, y) {
        var neighbors = 0;
        if(x > 0)           neighbors += transition.charsRev[transGridPrev[y][x-1]];
        if(x < grid.cols-1) neighbors += transition.charsRev[transGridPrev[y][x+1]];
        if(y > 0)           neighbors += 0.5 * transition.charsRev[transGridPrev[y-1][x]];
        if(y < grid.rows-1) neighbors += 0.5 * transition.charsRev[transGridPrev[y+1][x]];

        neighbors = Math.min(0.5 * neighbors, transition.charsWeight.length);

        return transition.charsWeight[Math.floor(Math.random() * neighbors)];
    });

    transGridPrev.init(this.x+2, grid.rows);
    transGridPrev.setEach(function (x, y) {
        if(x === transition.x+1) return grid[y][x];
        return transition.transGrid[y][x];
    });
    
//    if (this.x >= grid.lastX()+4) {
//        grid.clear();
//        game.gameState.setState(this.nextState);
//    }
    
    // Handle input
    
    if(game.input.isPressed["space"]) game.gameState.setState("mainMenu");
};

Transition.prototype.draw = function (updateTime) {
    this.grid.add(this.transGrid, 0, 0);
};

Transition.prototype.enter = function (nextState) {
    this.reset();
    this.nextState = nextState;
};

Transition.prototype.leave = function () {};
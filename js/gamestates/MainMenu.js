function MainMenu (grid, input){
    this.title = bigText("MAIN MENU");
    this.items = [
        new MenuItem("Item 1", function(){}),
        new MenuItem("Polygon", function(){
            game.gameState.setState("polygon");
        }),
        new MenuItem("Load", function(){
            game.gameState.setState("loading");
        }),
        new MenuItem("Transition", function(){
            game.gameState.setState("transition", "mainMenu");
        })
    ];
    
    this.grid = grid;
    this.input = input;
    this.menuGrid = new Grid(0, 0);
    this.selected = 0;
    this.itemWidth = 14;
}

MainMenu.prototype.itemGrid = function (item, selected){
    var grid = [[], [], []];
    
    grid[0][0] = ' ';
    grid[1][0] = ' ';
    grid[2][0] = (selected ? '+' : ' ');
    
    for (var i = 1; i < this.itemWidth; i++) {
        grid[0][i] = ' ';
        grid[1][i] = ' ';
        grid[2][i] = (selected ? '-' : ' ');
    }
    
    for (var i = 0; i < item.name.length; i++) {
        grid[1][i+2] = item.name.charAt(i);
    }
    
    if (selected) {
        grid[2][this.itemWidth-1] = '+';
    }
    
    return grid;
};

MainMenu.prototype.update = function (updateTime){
    
    // Manage input
    
    if((this.input.isPressed["w"] || this.input.isPressed["a"]) && this.selected > 0) {
        this.selected--;
    } else if((this.input.isPressed["s"] || this.input.isPressed["d"]) && this.selected < this.items.length-1) {
        this.selected++;
    }
    
    if(this.input.isPressed["space"]) this.items[this.selected].action();
};

MainMenu.prototype.draw = function (updateTime){
    
    var cols = 4 + Math.max(this.itemWidth, this.title[0].length);
    var rows = 7 + 3 * this.items.length;
    this.menuGrid.init(cols, rows);
    
    this.menuGrid.add(this.title, 2, 1);
    for (var i = 0; i < this.items.length; i++) {
        var selected = (i === this.selected);
        this.menuGrid.add(this.itemGrid(this.items[i], selected), 2, 6 + 3 * i);
    }
    
    this.grid.addCenter(this.menuGrid);
};

MainMenu.prototype.enter = function() {};

MainMenu.prototype.leave = function() {};
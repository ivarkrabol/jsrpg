function Grid(cols, rows, colW, rowH) {
    if(colW === undefined) colW = 0;
    if(rowH === undefined) rowH = 0;
    
    this.rows = 0;
    this.cols = 0;
    this.rowH = 0;
    this.colW = 0;
    this.init(cols, rows, colW, rowH);
};
    
Grid.prototype.init = function(cols, rows, colW, rowH) {
    if(colW === undefined) colW = 0;
    if(rowH === undefined) rowH = 0;
    
    this.cols = cols;
    this.rows = rows;
    this.colW = colW;
    this.rowH = rowH;
    this.clear();
    
    this.length = rows;
};

Grid.prototype.clear = function() {
    for (var i = 0; i < this.rows; i++) {
        this[i] = [];
        for (var j = 0; j < this.cols; j++) {
            this[i][j] = ' ';
        }
    }
};

Grid.prototype.firstX = function() {
    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            if (this[y][x] !== ' ') return x;
        }
    }
    return -1;
};

Grid.prototype.firstY = function() {
    for (var y = 0; y < this.rows; y++) {
        for (var x = 0; x < this.rows; x++) {
            if (this[y][x] !== ' ') return y;
        }
    }
    return -1;
};

Grid.prototype.lastX = function() {
    for (var x = this.cols-1; x >= 0; x--) {
        for (var y = 0; y < this.rows; y++) {
            if (this[y][x] !== ' ') return x;
        }
    }
    return -1;
};

Grid.prototype.lastY = function() {
    for (var y = this.rows-1; y >= 0; y--) {
        for (var x = 0; x < this.rows; x++) {
            if (this[y][x] !== ' ') return y;
        }
    }
    return -1;
};

Grid.prototype.add = function(subGrid, x, y) {
    var height = Math.min(subGrid.length, this.rows-y);
    var width = Math.min(subGrid[0].length, this.cols-x);
    var top = Math.max(0, -y);
    var left = Math.max(0, -x);
    
    for (var i = top; i < height; i++) {
        for (var j = left; j < width; j++) {
            this[y+i][x+j] = subGrid[i][j];
        }
    }
};

Grid.prototype.addCenter = function(subGrid) {
    var width = 0;
    for (var i = 0; i < subGrid.length; i++) {
        if (width < subGrid[i].length) width = subGrid[i].length;
    }
    var x = Math.round((this.cols-width)/2);
    var y = Math.round((this.rows-subGrid.length)/2);
    this.add(subGrid, x, y);
};

Grid.prototype.getEach = function(action) {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            action(this[i][j],j,i);
        }
    }
};

Grid.prototype.setEach = function(action) {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            var res = action(j,i);
            if(res === undefined) res = "+";
            this[i][j] = ("" + res).charAt(0);
        }
    }
};
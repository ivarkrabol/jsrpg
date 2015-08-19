function Polygon(grid, charsLight, charsMedium, charsDark) {
    this.grid = grid;
    
    this.polX = [0, 80,  81, 160, 160,  80,   0, -80, -160, -160, -80, -80];
    this.polY = [0, 60, 160, 220, 320, 380, 320, 380,  320,  220, 160,  60];
    
    this.charsLight = charsLight;
    this.charsMedium = charsMedium;
    this.charsDark = charsDark;
};

Polygon.prototype.zeroOffset = function(nums) {
    var min = nums[0];
    for(var i = 1; i < nums.length; i++) min = Math.min(min, nums[i]);
    var offsetNums = [];
    for(var i = 0; i < nums.length; i++) offsetNums[i] = nums[i] - min;
    return offsetNums;
};

Polygon.prototype.triXs = function(xs) {
    var newXs = [];
    for(var i = 0; i < xs.length; i++) newXs[i] = Math.round(xs[i]*(1/this.grid.colW));
    
    return newXs;
};

Polygon.prototype.triYs = function(ys) {
    var newYs = [];
    for(var i = 0; i < ys.length; i++) newYs[i] = Math.round(ys[i]*(3/this.grid.rowH));
    
    return newYs;
};

Polygon.prototype.boolArrayPolygon = function(xs, ys) {
    if(xs.length !== ys.length || xs.length < 3) return;
    
    if(xs[0] !== xs[xs.length-1] || ys[0] !== ys[ys.length-1]) {
        xs.push(xs[0]);
        ys.push(ys[0]);
    }
    
    // Find size
    
    var width = xs[0];
    var height = ys[0];
    
    for(var s = 1; s < xs.length; s++) {
        if(width < xs[s]) width = xs[s];
        if(height < ys[s]) height = ys[s];
    }
    
    // Temporary static flag
    
    var cw = true;
    
    // Create a bunch arrays of arrays of (mostly) false booleans
    
    var boolArray = [];
    var handledBoolArray = [];
    var triangleBoolArray = [];
    var fakeHoleBoolArray = [];
    for(var i = 0; i < height; i++) {
        boolArray[i] = [];
        handledBoolArray[i] = [];
        triangleBoolArray[i] = [];
        fakeHoleBoolArray[i] = [];
        for(var j = 0; j < width; j++) {
            boolArray[i][j] = false;
            handledBoolArray[i][j] = false;
            triangleBoolArray[i][j] = false;
            if(i*j === 0) fakeHoleBoolArray[i][j] = true;
            else fakeHoleBoolArray[i][j] = false;
        }
    }
    
    // Create triangle arrays and put them in
    
    var innerXs = [];
    var innerYs = [];
    
    for(var s = 1; s < xs.length; s++) {
        
        if((xs[s]-xs[s-1]) * (ys[s]-ys[s-1]) === 0){
            innerXs.push(xs[s-1], xs[s]);
            innerYs.push(ys[s-1], ys[s]);
            continue;
        }
        var subBoolArray = this.boolArrayFromRightTriangle(xs[s], ys[s], xs[s-1], ys[s-1], cw);
        var subPosX = Math.min(xs[s],xs[s-1]);
        var subPosY = Math.min(ys[s],ys[s-1]);
        var subWidth = Math.abs(xs[s-1] - xs[s]);
        var subHeight = Math.abs(ys[s-1] - ys[s]);
        
        for(var i = 0; i < subHeight; i++) {
            for(var j = 0; j < subWidth; j++) {
                boolArray[subPosY+i][subPosX+j] = subBoolArray[i][j];
                handledBoolArray[subPosY+i][subPosX+j] = true;
                triangleBoolArray[subPosY+i][subPosX+j] = true;
                fakeHoleBoolArray[subPosY+i][subPosX+j] = !subBoolArray[i][j];
            }
        }
    }
    
    // Find holes
    
    function Hole(x, y) {
        this.fake = false;
        this.coords = [];
        
        if(this.next(x, y)) this.fake = true;
        if(this.fake) {
            for(var c = 0; c < this.coords.length; c++) {
                fakeHoleBoolArray[this.coords[c][1]][this.coords[c][0]] = true;
            }
        }
    }
    
    Hole.prototype.next = function(x, y) {
        if(handledBoolArray[y][x]) return !triangleBoolArray[y][x] && fakeHoleBoolArray[y][x];
        handledBoolArray[y][x] = true;
        if(boolArray[y][x]) return false;
        
        this.coords.push([x, y]);
        
        var fake = false;
        if(x+1 === boolArray[0].length || this.next(x+1, y)) fake = true;
        if(y+1 === boolArray.length || this.next(x, y+1)) fake = true;
        if(fakeHoleBoolArray[y][x]) fake = true;
        
        return fake;
    };
    
    console.log("\n\nPreholes:\nboolArray");
    this.consoleBoolArray(boolArray);
    console.log("handledBoolArray");
    this.consoleBoolArray(handledBoolArray);
    console.log("fakeHoleBoolArray");
    this.consoleBoolArray(fakeHoleBoolArray);
   
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            if(!handledBoolArray[i][j] && !boolArray[i][j]) {
                new Hole(j, i);
                console.log("\n\nHole:\nhandledBoolArray");
                this.consoleBoolArray(handledBoolArray);
                console.log("fakeHoleBoolArray");
                this.consoleBoolArray(fakeHoleBoolArray);
            }
        }
    }
    
    // Fill real holes
   
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            if(!fakeHoleBoolArray[i][j]) boolArray[i][j] = true;
        }
    }
    
    console.log("\n\nPostholes:\nboolArray");
    this.consoleBoolArray(boolArray);
    console.log("handledBoolArray");
    this.consoleBoolArray(handledBoolArray);
    console.log("fakeHoleBoolArray");
    this.consoleBoolArray(fakeHoleBoolArray);
    
    return boolArray;
};

Polygon.prototype.boolArrayFromRightTriangle = function(x0, y0, x1, y1, cw) {
    var width = Math.abs(x1 - x0);
    var height = Math.abs(y1 - y0);
    var diagRatio = width/height;
    
    
    
    var boolArray = [];
    for(var i = 0; i < height; i++) {
        boolArray[i] = [];
        for(var j = 0; j < width; j++) {
            if(j/i === diagRatio) boolArray[i][j] = Math.random() < 0.5;
            else if(j/i > diagRatio) {
                boolArray[i][j] = true;
            }
            else boolArray[i][j] = false;
        }
    }
    
    if(x0 > x1) boolArray.reverse(); // Flip vertically (should be x not y in if)
    if(y0 > y1) for(var i = 0; i < height; i++) boolArray[i].reverse();
    
    if(cw === false) {
        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) boolArray[i][j] = !boolArray[i][j];
        }
    }
    
    return boolArray;
};

Polygon.prototype.trirrayFromBoolArray = function(boolArray) {
    var width = boolArray[0].length;
    var treight = Math.ceil(boolArray.length/3);
    
    if(boolArray.length % 3 !== 0){
        var falseRow = [];
        for(var i = 0; i < width; i++) falseRow[i] = false;
        boolArray.push(falseRow);
        if(boolArray.length % 3 !== 0) boolArray.unshift(falseRow);
    }
    
    var trirray = [];
    for(var i = 0; i < treight; i++) {
        trirray[i] = [];
        for(var j = 0; j < width; j++) {
            var char = 0;
            if(boolArray[3*i][j]) char += 4;
            if(boolArray[3*i+1][j]) char += 2;
            if(boolArray[3*i+2][j]) char += 1;
            trirray[i][j] = char;
        }
    }
    
//    this.consoleTrirray(trirray);
    
    return trirray;
};

Polygon.prototype.gridFromTrirray = function(trirray) {
    var subGrid = new Grid(trirray[0].length, trirray.length);
    
    var chars = [this.charsLight, this.charsMedium, this.charsDark];
    subGrid.setEach(function(x,y){
        var rand = Math.floor(3*Math.random());
        return chars[rand][trirray[y][x]];
    });
    
    return subGrid;
};

Polygon.prototype.consoleBoolArray = function(boolArray) {
    var log = "";
    for(var i = 0; i < boolArray.length; i++) {
        var line = "";
        for(var j = 0; j < boolArray[0].length; j++) {
            line += boolArray[i][j] ? "#" : "~";
        }
        log += line+"\n";
    }
    console.log(log);
};

Polygon.prototype.consoleTrirray = function(trirray) {
    var log = "";
    for(var i = 0; i < trirray.length; i ++) {
        var line = "";
        for(var j = 0; j < trirray[0].length; j++) {
            line += trirray[i][j];
        }
        log += line+"\n";
    }
    console.log(log);
};



Polygon.prototype.update = function(updateTime) {
    
    for(var i = 0; i < this.polX.length; i++) {
        this.polX[i] += Math.round((2*Math.random() - 1)*0.01*updateTime);
        this.polY[i] += Math.round((2*Math.random() - 1)*0.01*updateTime);
    }
    
    // Handle input
    
    if(game.input.isPressed["space"]) game.gameState.setState("mainMenu");
};

Polygon.prototype.draw = function(updateTime) { /*this.enter();*/ };

Polygon.prototype.enter = function(prevState) {
    var xs = this.triXs(this.zeroOffset(this.polX));
    var ys = this.triYs(this.zeroOffset(this.polY));
    
    var polBoolArray = this.boolArrayPolygon(xs, ys);
    var polTrirray = this.trirrayFromBoolArray(polBoolArray);
    var polGrid = this.gridFromTrirray(polTrirray);
    
    this.grid.clear();
    this.grid.addCenter(polGrid);
};

Polygon.prototype.leave = function(nextState) {};
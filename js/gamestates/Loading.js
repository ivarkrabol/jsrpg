function Loading(grid, chars){
    this.grid = grid;
    this.chars = chars;
    
    this.time = 0;
}

Loading.prototype.loopy = function(x, y, t) {
    var s = Math.sin(Math.pow(x*x + y*y, Math.sin(0.001*t)) - 0.003*t)/2 + 0.5;
    if (s == 1) s -= 0.0000000001;
    return s;
}

Loading.prototype.swirl = function(x, y, t) {
    var s = Math.sin(Math.pow(x*x + y*y, Math.sin(-0.001*t)) + 4*(Math.atan(y/x)) - 0.003*t)/2 + 0.5;
    if (s == 1) s -= 0.0000000001;
    return s;
}

Loading.prototype.noise = function(x, y, t) {
    return Math.random();
}

Loading.prototype.fade = function(x, y, t) {
    var s = Math.sin(0.0005*t)/2 + 0.5;
    if (s == 1) s -= 0.0000000001;
    return s;
}

Loading.prototype.update = function(updateTime) {
    
    // Handle input
    
    if(game.input.isPressed["space"]) game.gameState.setState("mainMenu");
}

Loading.prototype.draw = function(updateTime) {
    this.time += updateTime;
    var time = this.time;
    var loading = this;
    this.grid.setEach(function(j,i){
        var y = (i - loading.grid.rows/2)/loading.grid.colW;
        var x = (j - loading.grid.cols/2)/loading.grid.rowH;
        var s = 0.7;
        
        var typenum = Math.cos(0.0005 * time);
        var typebase = (typenum > 0 ? "loopy" : "swirl");
        var type = (Math.pow(Math.random(), 2) > 2*Math.abs(typenum) ? "fade" : typebase);
        
        switch (type) {
            case "loopy":
                s = loading.loopy(x, y, time);
                break;
            case "swirl":
                s = loading.swirl(x, y, time);
                break;
            case "noise":
                s = loading.noise(x, y, time);
                break;
            case "fade":
                s = loading.fade(x, y, time);
                break;
        }
        return loading.chars.charAt(Math.floor(s * loading.chars.length));

    });

    var bigLoading = bigText("LOADING"); 
    this.grid.addCenter(bigLoading);
};

Loading.prototype.enter = function() {};

Loading.prototype.leave = function() {};
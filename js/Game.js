function Game(offsetTime) {
    this.FRAMERATE = 12;
    
    this.offsetTime = offsetTime;
    this.gameTime = 0;
}

Game.prototype.init = function () {

    // Calculate grid size etc.:

    main = document.getElementById("main");
    main.innerHTML = "#";
    main.style.position = "absolute";
    main.style.margin = "0";
    main.style.padding = "0";

    var windowW = window.innerWidth;
    var windowH = window.innerHeight;

    var mainW = main.offsetWidth;
    var mainH = main.offsetHeight;

    main.innerHTML = "##\n##";

    var colW = main.offsetWidth - mainW;
    var rowH = main.offsetHeight - mainH;

    var cols = Math.ceil(windowW / colW);
    var rows = Math.ceil(windowH / rowH);

    main.innerHTML = "";
    main.style.width = cols * colW + "px";
    main.style.height = rows * rowH + "px";
    main.style.left = (cols * colW - windowW) / 2;
    main.style.top = (rows * rowH - windowH) / 2;

    // Define char-strings

    this.chars = {
        shade: " ~+$#",
        weight: " .,~-_|:;+!icornuvazxeswmljbdfghkpqty$IUCODQVJLYGTEABFHKMNPRSWXZ#",
        
        posL: " ¸-n'¦¬|",
        posM: " .~o¨:†$",
        posD: " ,+x^I×M"
    };

    // Initialize grid

    this.grid = new Grid(cols, rows, colW, rowH);
    
    // Initialize input handler
    
    this.input = new InputHandler();
    
    // Initialize game states
    
    this.gameState = new GameStateHandler(this);

};

Game.prototype.update = function (updateTime) {
    
    // Update input handler
    
    this.input.update();
    
    // Update game state
    
    this.gameState.update(updateTime);
};

Game.prototype.draw = function (updateTime) {
    
    this.gameState.draw(updateTime);
    
    var content = "";

    this.grid.getEach(function(elem, x, y){
        content += elem;
        if (y+1 === game.grid.rows) return;
        if (x+1 === game.grid.cols) content += "\n";
    });

    main.innerHTML = content;
};
function main() {
    
    game = new Game(new Date().getTime());
    
    game.init();
    
    game.update(0);
    game.draw(0);
    
    window.setInterval(function() {
        var newTime = new Date().getTime() - game.offsetTime;
        var updateTime = newTime - game.gameTime;
        game.gameTime = newTime;
        game.update(updateTime);
        game.draw(updateTime);
    }, 1000/game.FRAMERATE);
}

window.onload = main;
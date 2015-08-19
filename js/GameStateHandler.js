function GameStateHandler (game) {
    this.game = game;
    
    this.mainMenu = new MainMenu(game.grid, game.input);
    this.loading = new Loading(game.grid, game.chars.shade);
    this.transition = new Transition(game.grid, game.chars.weight);
    this.polygon = new Polygon(game.grid, game.chars.posL, game.chars.posM, game.chars.posD);
    
    this.state = this.mainMenu;
}

GameStateHandler.prototype.setState = function(newState, enter, leave) {
    this.state.leave(enter);
    this.state = this[newState];
    this.state.enter(leave);
};

GameStateHandler.prototype.update = function(updateTime) {
    this.state.update(updateTime);
};

GameStateHandler.prototype.draw = function(updateTime) {
    this.state.draw(updateTime);
};
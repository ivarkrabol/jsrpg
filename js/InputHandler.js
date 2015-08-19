function InputHandler() {
    window.onkeydown = this.keyDown;
    window.onkeyup = this.keyUp;
    
    this.keys = ["a","s","d","w","ctrl","shift","space"];
    
    this.isDown = {};
    this.isDownPrev = {};
    this.isPressed = {};
    this.isReleased = {};
    for(var i = 0; i < this.keys.length; i++) {
        var key = this.keys[i];
        this.isDown[key] = false;
        this.isDownPrev[key] = false;
        this.isPressed[key] = false;
        this.isReleased[key] = false;
    }
    
    InputHandler.prototype.instance = this;
}

InputHandler.prototype.keyFromEvent = function(e) {
    if (e.keyCode == 17) return "ctrl";
    if (e.keyCode == 16) return "shift";
    if (e.keyCode == 32) return "space";
    return String.fromCharCode(e.keyCode + 32);
}

InputHandler.prototype.keyDown = function(e) {
    var input = InputHandler.prototype.instance;
    input.isDown[input.keyFromEvent(e)] = true;
}

InputHandler.prototype.keyUp = function(e) {
    var input = InputHandler.prototype.instance;
    input.isDown[input.keyFromEvent(e)] = false;
}

InputHandler.prototype.update = function() {
    for(var i = 0; i < this.keys.length; i++) {
        var key = this.keys[i];
        
        this.isPressed[key] = false;
        this.isReleased[key] = false;
        if (this.isDown[key] && !this.isDownPrev[key]) {
            this.isPressed[key] = true;
        } else if (!this.isDown[key] && this.isDownPrev[key]) {
            this.isReleased[key] = true;
        }
        
        this.isDownPrev[key] = this.isDown[key];
    }
}
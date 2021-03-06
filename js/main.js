function Main(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 11;
    this.music = new Audio("audio/intro.mp3");
    this.reset();
    this.SetListeners();
};

var KEY_CODES = {
    87: "w",
    37: "left",
    38: "up",
    39: "right",
    65: "a",
    68: "d",
    13: "enter",
    86: "v"
};
var KEY_STATUS = {};
  
Main.prototype.SetListeners = function() {
    for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
    }
    document.onkeydown = function(e) {
      var keyCode = e.keyCode;
      if (KEY_CODES[keyCode]) {
        KEY_STATUS[KEY_CODES[keyCode]] = true;
      }
    };
    document.onkeyup = function(e) {
      var keyCode = e.keyCode;
      if (KEY_CODES[keyCode]) {
        KEY_STATUS[KEY_CODES[keyCode]] = false;
      }
    };
};

Main.prototype.start = function() {
    this.interval = setInterval(
      function() {
        this.clear();
        this.music.play();
        this.music.loop = true;
        this.framesCounter++;
        //frameCounter control
        if (this.framesCounter > 1000) {
          this.framesCounter = 0;
        }
        this.moveAll();
        this.draw();
  
      }.bind(this),
      1000 / this.fps
    );
};

Main.prototype.stop = function() {
    clearInterval(this.interval);
    this.music.pause();
};

Main.prototype.reset = function() {
    this.background = new Background(this, 3);
    this.mode0 = new Mode(this, 0);
    this.mode1 = new Mode(this, 1);
    this.mode2 = new Mode(this, 2);
    this.mode3 = new Mode(this, 3);
    this.arrow = new Arrow(this);
  
    for (code in KEY_CODES) {
      KEY_STATUS[KEY_CODES[code]] = false;
    };
    this.framesCounter = 0;
};

Main.prototype.startGame = function(mode) {
    var game = new Game("canvas", this, mode);
    game.start();
};

Main.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Main.prototype.draw = function() {
    this.background.draw();
    this.mode0.draw();
    this.mode1.draw();
    this.mode2.draw();
    this.arrow.draw();
    this.mode3.select();
};

Main.prototype.moveAll = function() {
    this.arrow.move();
};
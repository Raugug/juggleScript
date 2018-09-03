function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.lastDownTarget;
  
    this.reset();
}

KEY_CODES = {
    87: 'w',
    37: 'left',
    38: 'up',
    39: 'right',
    65: 'a',
    68: 'd',
  }

KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[ KEY_CODES[ code ]] = false;
}

document.onkeydown = function(e) {
    var keyCode = e.keyCode;
    if (KEY_CODES[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
}
document.onkeyup = function(e) {
    var keyCode = e.keyCode;
    if (KEY_CODES[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
}

Game.prototype.start = function() {
    this.interval = setInterval(function() {
      //this.clear();
  
      this.framesCounter++;
  
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
  
      // controlamos la velocidad de generación de obstáculos
      if (this.framesCounter % 50 === 0) {
        //this.generateObstacle();
      } 
  
      this.score += 0.01;
      
      this.moveAll();
      this.draw();
  
      // eliminamos obstáculos fuera del canvas
      //this.clearObstacles();
  
      /*if (this.isCollision()) {
        this.gameOver();
      }*/
    }.bind(this), 1000 / this.fps);
};
  
Game.prototype.stop = function() {
    clearInterval(this.interval);
};

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.handLeft = new HandLeft(this);
    this.handRight = new HandRight(this);
    this.framesCounter = 0;
    //this.obstacles = [];
    //this.score = 0;
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.draw = function() {
    this.background.draw();
    this.handLeft.draw();
    this.handRight.draw();
    //this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
    //this.drawScore();  
};

Game.prototype.moveAll = function() {
    //this.background.move();
    this.handLeft.movealt();
    this.handRight.movealt();
    //this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};
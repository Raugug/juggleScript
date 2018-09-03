function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.lastDownTarget;

  this.reset();
}

var KEY_CODES = {
  87: "w",
  37: "left",
  38: "up",
  39: "right",
  65: "a",
  68: "d"
};

var KEY_STATUS = {};
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

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
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
    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.handLeft = new HandLeft(this);
  this.handRight = new HandRight(this);
  this.ball = new Ball(this);
  this.framesCounter = 0;
  //this.obstacles = [];
  //this.score = 0;
};

Game.prototype.isGrabbedByRight = function(ball) {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  return (
    this.ball.x >= this.handRight.x &&
    this.ball.x <= this.handRight.x + this.handRight.w &&
    this.ball.y >= this.handRight.y
  );
};

Game.prototype.isGrabbedByLeft = function(ball) {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  return (
    this.ball.x >= this.handLeft.x &&
    this.ball.x <= this.handLeft.x + this.handLeft.w &&
    this.ball.y >= this.handLeft.y
  );
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.handLeft.draw();
  this.handRight.draw();
  this.ball.draw();
  //this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  //this.drawScore();
};

Game.prototype.moveAll = function() {
  //this.background.move();
    this.handLeft.movealt();
    this.handRight.movealt();

    if (this.ball.onairToL) {
    this.ball.moveToL();
    }
    if (this.ball.onairToR) {
    this.ball.moveToR();
    }
  
    if (this.isGrabbedByRight()) {
      this.ball.translateR();
    }
    if (this.isGrabbedByLeft()) {
      this.ball.translateL();
    }
  

  //
  //this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};

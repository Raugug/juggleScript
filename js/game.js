function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.lastDownTarget;
  this.balls = [];

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
//var balls = [];

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
  //Ball(game, x, color, y0)
  this.ballG = new Ball(this, this.handLeft.x, '#9F3', this.handLeft.y, true, false);
  this.ballY = new Ball(this, this.handLeft.x - 1, '#FF0', this.handLeft.y, true, false);
  this.ballB = new Ball(this, this.handRight.x, '#00F', this.handRight.y, false, true);
  this.balls.push(this.ballG); 
  this.balls.push(this.ballY); 
  this.balls.push(this.ballB);
  console.log(this.balls); 
  this.framesCounter = 0;
  //this.obstacles = [];
  //this.score = 0;
};

Game.prototype.isGrabbedByRight = function(ball) {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  //console.log("ENTRA EN GRABBED BY R");
  //console.log(ball);
    return (
        ball.x >= this.handRight.x &&
        ball.x <= this.handRight.x + this.handRight.w &&
        ball.y >= this.handRight.y
    );
};

Game.prototype.isGrabbedByLeft = function(ball) {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  return (
    ball.x >= this.handLeft.x &&
    ball.x <= this.handLeft.x + this.handLeft.w &&
    ball.y >= this.handLeft.y
  );
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.handLeft.draw();
  this.handRight.draw();
  this.ballG.draw();
  this.ballY.draw();
  this.ballB.draw();
  //this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  //this.drawScore();
};

Game.prototype.moveAll = function() {
    
    this.handLeft.movealt();
    this.handRight.movealt();

    this.balls.forEach(function(ball) {
        
        if (ball.onairToL) {
            ball.onRight = false;
            ball.moveToL();
        }
        if (ball.onairToR) {
            ball.onLeft = false;
            ball.moveToR();
        }
    
        if (this.isGrabbedByRight(ball)) {
            ball.onRight = true;
            //console.log("ENTRA");
            ball.translateR();
        }
        if (this.isGrabbedByLeft(ball)) {
            ball.onLeft = true;
            ball.translateL();
        }
    }.bind(this));
  
};

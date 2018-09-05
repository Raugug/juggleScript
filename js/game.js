function Game(canvasId, menu) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  //this.canvas = menu.menu;
  //this.ctx = menu.ctx;
  this.menu = menu;
  this.fps = 50;
  this.balls = [];
  this.ballsOnair = [];

  this.reset();
  this.SetListeners();
}

var KEY_CODES = {
  87: "w",
  37: "left",
  38: "up",
  39: "right",
  65: "a",
  68: "d",
  13: "enter"
};
var KEY_STATUS = {};

Game.prototype.SetListeners = function() {
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

}

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();

      this.framesCounter++;
      //controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      this.score += 0.05;
      //console.log(this.score);
      if (this.score > 50 && this.score <= 50.05){
        console.log("CREA 4a")
        this.createForth();
      }
      
      this.moveAll();
      this.draw();
      //GAVE OVER CONDITIONS
      if (this.handLeft.ballsIn.length > 1 || this.handRight.ballsIn.length > 1) {
        this.gameOver();
      }
      this.balls.forEach(function(ball) {
        if (this.outOfScreen(ball)) {this.gameOver();} 
      }.bind(this))

    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();
  this.menu.start();
  
  //if(confirm("GAME OVER. Play again?")) {
  //    this.reset();
  //    this.start();
  //}
};

Game.prototype.reset = function() {
  this.background = new Background(this, 0);
  this.handLeft = new HandLeft(this);
  this.handRight = new HandRight(this);

  for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
  }

  this.ballG = new Ball(this, this.handLeft.x, '#9F3', this.handLeft.y, true, false, false, false);
  this.ballY = new Ball(this, this.handLeft.x, '#FF0', this.handLeft.y, true, false, true, false);
  this.ballB = new Ball(this, this.handRight.x, '#00F', this.handRight.y, false, true, false, false);
  //this.ballP = new Ball(this, this.handRight.x, '#F6F', (this.handRight.y - 1), false, true, false, true);
  this.balls.push(this.ballG); 
  this.balls.push(this.ballY); 
  this.balls.push(this.ballB);
  //this.balls.push(this.ballP);
  this.handLeft.ballsIn.push(this.ballG);
  this.ballsOnair.push(this.ballY);
  //this.ballsOnair.push(this.ballP);
  this.handRight.ballsIn.push(this.ballB);
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.createForth = function() {
  this.ballP = new Ball(this, this.handRight.x, '#F6F', (this.handRight.y - 1), false, true, false, true);
  this.balls.push(this.ballP);
  this.ballsOnair.push(this.ballP);
}

Game.prototype.isGrabbedByRight = function(ball) {
  // colishions RIGHT
    return (
        ball.x >= this.handRight.x &&
        ball.x <= this.handRight.x + this.handRight.w &&
        ball.y >= this.handRight.y
    );
};

Game.prototype.isGrabbedByLeft = function(ball) {
  // colishions LEFT
  return (
    ball.x >= this.handLeft.x &&
    ball.x <= this.handLeft.x + this.handLeft.w &&
    ball.y >= this.handLeft.y
  );
};

Game.prototype.outOfScreen = function(ball) {
  // colishions BORDERS
  return (
    ball.x - ball.radius/2 <= 0 ||
    ball.x + ball.radius/2 >= this.canvas.width ||
    ball.y - ball.radius/2 <= 0 ||
    ball.y + ball.radius/2 >= this.canvas.height
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
  if (this.score > 50) {this.ballP.draw();}
  this.drawScore();
};

Game.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
}

Game.prototype.moveAll = function() {
    this.handLeft.move();
    this.handRight.move();

    this.balls.forEach(function(ball) {   
        if (ball.onairToL) {
            ball.moveToL();
        }
        if (ball.onairToR) { 
            ball.moveToR();
        }
        if (this.isGrabbedByRight(ball)) {
            ball.translateR();
        }
        if (this.isGrabbedByLeft(ball)) {
            ball.translateL();
        }

    }.bind(this));
};
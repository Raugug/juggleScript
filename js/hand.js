function Hand(game, side) {
    this.game = game;
    this.side = side;
    this.img = new Image();
    this.srcArray = ['img/Left1.png', 'img/Right1.png'];
    //POSITION BY SIDE
    if (this.side == 'left'){
        this.x = this.game.canvas.width * 0.1; 
        //posición original
        this.y0 = this.game.canvas.height * 0.8;
        this.y = this.y0;
        this.img.src = this.srcArray[0];
    }
    if (this.side == 'right'){
        this.x = this.game.canvas.width * 0.8;
        //posición original
        this.y0 = this.game.canvas.height * 0.8;
        this.y = this.y0;
        this.img.src = this.srcArray[1];
    }
    // medidas de la imagen
    this.w = 100;
    this.h = 88;
    this.vy = 1;
    this.ballsIn = [];
    //CONTROLS
}

Hand.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

Hand.prototype.move = function() {
    if (this.side == 'left'){  
        if (KEY_STATUS.a || KEY_STATUS.d || KEY_STATUS.w) {
            if (KEY_STATUS.a && this.x >= 0) {
                this.x -= 5;
            }
            if (KEY_STATUS.d && this.x + this.w <= this.game.canvas.width/2) {
                this.x += 5;
            }
            //THROW
            if (KEY_STATUS.w) {
                if (this.ballsIn.length == 1){
                    var ballonair = this.ballsIn.pop();
                    ballonair.onLeft = false;
                    ballonair.onairToR = true;
                    this.game.ballsOnair.push(ballonair);
                }
            }
        }
    } else {
        if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.up) {
            if (KEY_STATUS.left && this.x >= this.game.canvas.width/2) {
                this.x -= 5;
            }
            if (KEY_STATUS.right && this.x + this.w <= this.game.canvas.width) {
                this.x += 5;
            }
            //THROW
            if (KEY_STATUS.up) {
              if (this.ballsIn.length == 1) {
                  var ballonair = this.ballsIn.pop();
                  ballonair.onRight = false;
                  ballonair.onairToL = true;
                  this.game.ballsOnair.push(ballonair);
              }
    
            }
        }
    }
}
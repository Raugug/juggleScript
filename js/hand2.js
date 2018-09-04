function HandRight(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.8;
    //posición original
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
  
    this.img = new Image();
    this.img.src = 'img/Right1.png';
    // medidas de la imagen
    this.w = 100;
    this.h = 88;
    this.vy = 1;
    this.ballsIn = [];
}

HandRight.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

HandRight.prototype.move = function() {
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
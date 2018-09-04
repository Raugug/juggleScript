function HandLeft(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.1; 
    //posición original
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
  
    this.img = new Image();
    this.img.src = 'img/Left1.png';
    // medidas de la imagen
    this.w = 100;
    this.h = 88;
    this.vy = 1;
    this.ballsIn = [];
}

HandLeft.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

HandLeft.prototype.move = function() {   
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
} 
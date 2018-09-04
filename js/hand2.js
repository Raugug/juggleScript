function HandRight(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.8;
    // guardar posición original
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
  
    this.img = new Image();
    this.img.src = 'img/Right1.png';
    // medidas de la imagen a representar en el canvas
    this.w = 100;
    this.h = 88;
    this.vy = 1;
    this.howmany = 1;
    this.ballsIn = [];
}

var TOP_KEY_RH = 38; //up arrow
var LEFT_KEY_RH = 37; //left arrow
var RIGHT_KEY_RH = 39; //right arrow

HandRight.prototype.draw = function() {
    // Documentación drawImage:
    // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

HandRight.prototype.setListeners = function() {
    document.onkeydown = function(event) {
      if (event.keyCode === RIGHT_KEY_RH && this.x + this.w <= this.game.canvas.width) {
        this.x += 10;
      }
    }.bind(this);
};



HandRight.prototype.move = function() {
    if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.up) {
        if (KEY_STATUS.left && this.x >= this.game.canvas.width/2) {
            this.x -= 5;
          }
          if (KEY_STATUS.right && this.x + this.w <= this.game.canvas.width) {
            this.x += 5;
          }
          //POR IMPLEMENTAR
          if (KEY_STATUS.up) {
            if (this.ballsIn.length == 1){
                var ballonair = this.ballsIn.pop();
                ballonair.onRight = false;
                ballonair.onairToL = true;
                this.game.ballsOnair.push(ballonair);
            }

          }
    }
}
          

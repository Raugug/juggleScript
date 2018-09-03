function HandLeft(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.1;
  
    // guardar posición original (suelo)
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
  
    this.img = new Image();
    this.img.src = 'img/Left1.png';
    
    // número de imágenes diferentes
    //this.img.frames = 3;
    //this.img.frameIndex = 0;
  
    // medidas de la imagen a representar en el canvas
    this.w = 100;
    this.h = 88;
  
    this.vy = 1;
    this.howmany = 2;
  
    //this.bullets = [];
  
    //this.setListeners();
}
  
var TOP_KEY_LH = 87; //w
var LEFT_KEY_LH = 65; //a
var RIGHT_KEY_LH = 68; //d

HandLeft.prototype.draw = function() {
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

HandLeft.prototype.setListeners = function() {
    document.onkeydown = function(event) {
      if (event.keyCode === LEFT_KEY_LH && this.x >= 0) {
        this.x -= 5;
        //this.vy -= 10;
      }
    }.bind(this);
};



HandLeft.prototype.movealt = function() {
    if (KEY_STATUS.a || KEY_STATUS.d || KEY_STATUS.w) {
        if (KEY_STATUS.a && this.x >= 0) {
            this.x -= 5;
        }
        if (KEY_STATUS.d && this.x + this.w <= this.game.canvas.width/2) {
            this.x += 5;
        }
        //POR IMPLEMENTAR
        

        //this.game.balls.forEach(function(ball) {
        for (var i = 0; i < this.game.balls.length; i++){ //
            //console.log(i + "FOR"); //this.game.balls[i]
            if (this.game.balls[i].onLeft) {    
                if (KEY_STATUS.w ) { // || ball.onairToR
                    //console.log("if en for");
                    this.game.balls[i].moveToR();
                    this.game.balls[i].onLeft = false;
                    this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    
                }
                
            }
        } 
        
        //}.bind(this));
    }
}
  
function HandLeft(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.1;
  
    // guardar posición original
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
  
    this.img = new Image();
    this.img.src = 'img/Left1.png';
    // medidas de la imagen a representar en el canvas
    this.w = 100;
    this.h = 88;
  
    this.vy = 1;
    this.howmany = 2;
    this.launched = 0;
  
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



HandLeft.prototype.move = function() {
    
    if (KEY_STATUS.a || KEY_STATUS.d || KEY_STATUS.w) {
        //this.launched = 0;
        if (KEY_STATUS.a && this.x >= 0) {
            this.x -= 5;
        }
        if (KEY_STATUS.d && this.x + this.w <= this.game.canvas.width/2) {
            this.x += 5;
        }
        //REPASAR: BUSCAR ALTERNATIVAS
    //}
        console.log('Launched Before '+this.launched);
        if (KEY_STATUS.w && this.launched == 0)  {
            
            switch (this.howmany){
                case 1:
                    console.log("ENTRA POR 1");
                    if (this.game.balls[0].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA VERDE");
                        this.game.balls[0].onairToR = true;
                        this.game.balls[0].onLeft = false;
                        this.game.balls[0].moveToR();
                        this.launched = 1;
                        this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;
                        
                    } else if (this.game.balls[2].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA AZUL");
                        this.game.balls[2].onairToR = true;
                        this.game.balls[2].onLeft = false;
                        this.game.balls[2].moveToR();
                        this.launched = 1;
                        this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;

                    } else if (this.game.balls[1].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA AMARILLA");
                        this.game.balls[1].onairToR = true;
                        this.game.balls[1].onLeft = false;
                        this.game.balls[1].moveToR();
                        this.launched = 1;
                        this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break; 
                    }
                    break;
                case 2:
                    console.log("ENTRA POR 2");
                    //if (KEY_STATUS.w){
                        if (this.game.balls[1].onLeft && this.game.balls[2].onLeft) {
                            console.log("ENTRA POR 2 Y TIRA AZUL");
                            this.game.balls[2].onairToR = true;
                            this.game.balls[2].onLeft = false;
                            this.game.balls[2].moveToR();
                            //this.launched = 1;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                        if (this.game.balls[0].onLeft && this.game.balls[2].onLeft) {
                            console.log("ENTRA POR 2 Y TIRA AZUL");
                            this.game.balls[2].onairToR = true;
                            this.game.balls[2].onLeft = false;
                            this.game.balls[2].moveToR();
                            //this.launched = 1;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                        if (this.game.balls[0].onLeft && this.game.balls[1].onLeft) {
                            console.log("ENTRA POR 2 Y TIRA AMARILLA");
                            this.game.balls[1].onairToR = true;
                            this.game.balls[1].onLeft = false;
                            this.game.balls[1].moveToR();
                            //this.launched = 1;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                    //}
                    break;
                case 3:
                    console.log("ENTRA POR 3");
                    if (this.game.balls[2].onLeft) {
                        console.log("ENTRA POR 3 Y TIRA AZUL");
                        //this.launched = 1;
                        //this.howmany--;
                        this.game.balls[2].onairToR = true;
                        this.game.balls[2].onLeft = false;
                        this.game.balls[2].moveToR();
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;
                    }
                    break;
            }
            
            //console.log('Launched After '+this.launched);
        }
    
    }
}
  
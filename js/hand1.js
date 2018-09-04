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
    this.ballsIn = [];
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
        if (KEY_STATUS.a && this.x >= 0) {
            this.x -= 5;
        }
        if (KEY_STATUS.d && this.x + this.w <= this.game.canvas.width/2) {
            this.x += 5;
        }
        //REPASAR: BUSCAR ALTERNATIVAS
    //}
        if (KEY_STATUS.w) {
            if (this.ballsIn.length > 0){
                var ballonair = this.ballsIn.pop();
                ballonair.onairToR = true;
                this.game.balls.push(ballonair);
            }
        }
        /*
        if (KEY_STATUS.w)  {           
            switch (this.howmany){
                case 1:
                    console.log("ENTRA POR 1");
                    if (this.game.balls[0].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA VERDE");
                        this.game.balls[0].onairToR = true;
                        this.game.balls[0].onLeft = false;
                        //this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;
                        
                    } else if (this.game.balls[2].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA AZUL");
                        this.game.balls[2].onairToR = true;
                        this.game.balls[2].onLeft = false;
                        //this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;

                    } else if (this.game.balls[1].onLeft) {
                        console.log("ENTRA POR 1 Y TIRA AMARILLA");
                        this.game.balls[1].onairToR = true;
                        this.game.balls[1].onLeft = false;
                        //this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break; 
                    }
                    break;
                case 2:
                    console.log("ENTRA POR 2");
                        if (this.game.balls[1].onLeft && this.game.balls[2].onLeft){
                            console.log("ENTRA POR 2 Y TIRA AZUL");
                            this.game.balls[2].onairToR = true;
                            this.game.balls[2].onLeft = false;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                        if (this.game.balls[0].onLeft && this.game.balls[2].onLeft) {
                            console.log("ENTRA POR 2 Y TIRA AZUL");
                            this.game.balls[2].onairToR = true;
                            this.game.balls[2].onLeft = false;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                        if (this.game.balls[0].onLeft && this.game.balls[1].onLeft) {
                            console.log("ENTRA POR 2 Y TIRA AMARILLA");
                            this.game.balls[1].onairToR = true;
                            this.game.balls[1].onLeft = false;
                            //this.howmany--;
                            console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                            break;
                        }
                    break;
                case 3:
                    console.log("ENTRA POR 3");
                    if (this.game.balls[2].onLeft) {
                        console.log("ENTRA POR 3 Y TIRA AZUL");
                        //this.launched = 1;
                        this.game.balls[2].onairToR = true;
                        this.game.balls[2].onLeft = false;
                        //this.howmany--;
                        console.log(this.howmany + " DEBERÍA RESTAR LEFT");
                        break;
                    }
                    break;
                default:
                    break;
            }
        }*/
    }
}
            /*
            switch (this.howmany){
                case 1:
                    if (this.game.balls[2].onLeft) {
                        console.log("Si está la azul la lanza");
                        this.game.balls[2].onLeft = false;
                        this.game.balls[2].onairToR = true;
                        //this.howmany--;
                        //console.log(this.howmany + " DEBERÍA RESTAR LEFT AZUL");
                    } else if (this.game.balls[1].onLeft) {
                        console.log("Si no azul, si está la amarilla la lanza");
                        this.game.balls[1].onairToR = true;
                        this.game.balls[1].onLeft = false;
                        //this.howmany--;
                        //console.log(this.howmany + " DEBERÍA RESTAR LEFT AMARILLA");
                    } else if (this.game.balls[0].onLeft) {
                        console.log("Si no azul ni amarilla, si está la verde la lanza");
                        this.game.balls[0].onairToR = true;
                        this.game.balls[0].onLeft = false;
                        //this.howmany--;
                        //console.log(this.howmany + " DEBERÍA RESTAR LEFT VERDE");
                    }
                    break;
            }*/

  
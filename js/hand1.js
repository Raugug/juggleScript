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
        if (KEY_STATUS.a && this.x >= 0) {
            this.x -= 5;
        }
        if (KEY_STATUS.d && this.x + this.w <= this.game.canvas.width/2) {
            this.x += 5;
        }
        //REPASAR: BUSCAR ALTERNATIVAS
        
        switch (this.howmany){
            case 1:
                console.log("ENTRA POR 1");
                if (KEY_STATUS.w && !this.game.balls[0].onairToR && this.game.balls[0].onLeft) { // || ball.onairToR
                    console.log("PULSAS Y TIRA LA VERDE");
                    this.game.balls[0].moveToR();
                    this.game.balls[0].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    break;
                    
                } else if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                    this.game.balls[2].moveToR();
                    this.game.balls[2].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    break;

                } else if (KEY_STATUS.w && !this.game.balls[1].onairToR && this.game.balls[1].onLeft) { // || ball.onairToR
                    this.game.balls[1].moveToR();
                    this.game.balls[1].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    break;   
                }
                break;
            case 2:
                console.log("ENTRA POR 2");

                if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                    this.game.balls[2].moveToR();
                    this.game.balls[2].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT"); 
                    //break;  
                } else if (KEY_STATUS.w && !this.game.balls[1].onairToR && this.game.balls[1].onLeft) { // || ball.onairToR
                    console.log("PULSAS Y TIRA LA AMARILLA");
                    this.game.balls[1].moveToR();
                    this.game.balls[1].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    //break;   
                }
                break;
            case 3:
                if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                    console.log("ENTRA POR 3 Y TIRA AZUL");
                    this.game.balls[2].moveToR();
                    this.game.balls[2].onLeft = false;
                    //this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    break;
                }
                break;
        }
        //if (resta){this.howmany--;}
        //console.log(this.howmany + " AT LEFT");
        
        /*
        if (this.howmany == 1) {
            console.log("ENTRA POR 1");
            if (KEY_STATUS.w && !this.game.balls[0].onairToR && this.game.balls[0].onLeft) { // || ball.onairToR
                console.log("PULSAS Y TIRA LA VERDE");
                this.game.balls[0].moveToR();
                //this.game.balls[0].onLeft = false;
                this.howmany--;
                console.log(this.howmany + "RESTA LEFT");
                
            } else if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                
                //this.game.balls[2].moveToR();
                //this.game.balls[2].onLeft = false;
                //this.howmany--;
                console.log(this.howmany + "RESTA LEFT");   
            } else if (KEY_STATUS.w && !this.game.balls[1].onairToR && this.game.balls[1].onLeft) { // || ball.onairToR
                
                //this.game.balls[1].moveToR();
                //this.game.balls[1].onLeft = false;
                //this.howmany--;
                console.log(this.howmany + "RESTA LEFT");   
            }

        } else if (this.howmany == 2) {
            console.log("ENTRA POR 2");

            if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                
                //this.game.balls[2].moveToR();
                //this.game.balls[2].onLeft = false;
                //this.howmany--;
                console.log(this.howmany + "RESTA LEFT");   
            } else if (KEY_STATUS.w && !this.game.balls[1].onairToR && this.game.balls[1].onLeft) { // || ball.onairToR
                console.log("PULSAS Y TIRA LA AMARILLA");
                this.game.balls[1].moveToR();
                //this.game.balls[1].onLeft = false;
                this.howmany--;
                console.log(this.howmany + "RESTA LEFT");   
            }

        } else if (this.howmany == 3) {
            if (KEY_STATUS.w && !this.game.balls[2].onairToR && this.game.balls[2].onLeft) { // || ball.onairToR
                console.log("ENTRA POR 3 Y TIRA AZUL");
                this.game.balls[2].moveToR();
                this.game.balls[2].onLeft = false;
                this.howmany--;
                console.log(this.howmany + "RESTA LEFT");   
            }
        }
        */

        //this.game.balls.forEach(function(ball) {
            /*
        for (var i = 0; i < this.game.balls.length; i++){ //
            //console.log(i + "FOR"); //this.game.balls[i]
            if (this.game.balls[i].onLeft) {    
                if (KEY_STATUS.w && !this.game.balls[i].onairToR) { // || ball.onairToR
                    //console.log("if en for");
                    this.game.balls[i].moveToR();
                    this.game.balls[i].onLeft = false;
                    this.howmany--;
                    console.log(this.howmany + "RESTA LEFT");
                    
                }
                
            }
        } */
        
        //}.bind(this));
    }
}
  
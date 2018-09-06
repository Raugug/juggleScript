function Arrow(menu) {
    this.menu = menu;
   
    this.x = this.menu.canvas.width * 0.215; 
    this.y = this.menu.canvas.height * 0.4 + 150;
  
    this.img = new Image();
    this.img.src = 'img/play-button.png'
    // medidas de la imagen
    this.w = 128;
    this.h = 128;
}

Arrow.prototype.draw = function() {
    this.menu.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

Arrow.prototype.move = function() {
    var positions = [this.menu.canvas.width * 0.215, this.menu.canvas.width * 0.215 + 600]   
    if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.enter) {
        if (KEY_STATUS.left) {
            this.x = positions[0];
        }
        if (KEY_STATUS.right) {
            this.x = positions[1];
        }
        //THROW
        if (KEY_STATUS.enter) {
            if (this.x == positions[0]){
                console.log("ENTER NORMAL MODE");
                this.menu.stop();
                this.menu.startGame(0);
            } else {
                console.log("ENTER SKULL MODE");
                this.menu.stop();
                this.menu.startGame(1);
            } 
        }
    }
}
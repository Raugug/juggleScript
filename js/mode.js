function Mode(menu, src) {
    this.menu = menu;

    this.x = this.menu.canvas.width * 0.215 + (300 * src); 
    this.y = this.menu.canvas.height * 0.4;
    
    this.img = new Image();
    this.srcArray = ['img/juggler.png', 'img/pirate-skull.png', 'img/iron.png'];
    this.img.src = this.srcArray[src];
    // medidas de la imagen
    this.w = 128;
    this.h = 128;
}

Mode.prototype.draw = function() {
    this.menu.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}
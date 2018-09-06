function Background(game, src) {
    this.game = game;
  
    this.img = new Image();
    this.src = ['img/bg1.jpg', 'img/bg3.jpg', 'img/grave.jpg']
    this.img.src = this.src[src];
  
    this.x = 0;
    this.y = 0;
  
    //this.dx = 10;
}

Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
    //this.menu.ctx.drawImage(this.img, this.x, this.y, this.menu.canvas.width, this.menu.canvas.height);
    //this.menu.ctx.drawImage(this.img, this.x + this.menu.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);
  };
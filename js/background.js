function Background(game, src) {
    this.game = game;
    this.img = new Image();
    this.src = ['img/bg1.jpg', 'img/grave.jpg', 'img/icover.jpg', 'img/bg3.jpg']
    this.img.src = this.src[src];
    this.x = 0;
    this.y = 0;
}

Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
};
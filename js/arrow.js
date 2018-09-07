function Arrow(menu) {
    this.menu = menu;
    this.x = this.menu.canvas.width * 0.215; 
    this.y = this.menu.canvas.height * 0.4 + 150;
    this.w = 128;
    this.h = 128;
    this.img = new Image();
    this.img.src = 'img/play-button.png'
}

Arrow.prototype.draw = function() {
    this.menu.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}

Arrow.prototype.move = function() {
    var positions = [this.menu.canvas.width * 0.215,
                     this.menu.canvas.width * 0.215 + 300, 
                     this.menu.canvas.width * 0.215 + 600
                    ];

    if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.enter) {
        if (KEY_STATUS.left && this.x == positions[1]) {this.x = positions[0];}
        if (KEY_STATUS.left && this.x == positions[2]) {this.x = positions[1];}
        if (KEY_STATUS.right && this.x == positions[1]) {this.x = positions[2];}
        if (KEY_STATUS.right && this.x == positions[0]) {this.x = positions[1];}
        //THROW
        if (KEY_STATUS.enter) {
            if (this.x == positions[0]){
                this.menu.stop();
                this.menu.startGame(0);
            } else if (this.x == positions[1]) {
                this.menu.stop();
                this.menu.startGame(1);
            } else if (this.x == positions[2]) {
                this.menu.stop();
                this.menu.startGame(2);
            }
        }
    }
}
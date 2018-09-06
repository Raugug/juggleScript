function Ball(game, x, color, y0, onLeft, onRight, onairToR, onairToL, src) {
    this.game = game;
    this.x = x;
    this.y = this.game.handLeft.y;
    this.vy = 1;
    this.radius = 20;
    this.color = color;
    this.onairToR = onairToR;
    this.onairToL = onairToL;
    this.onLeft = onLeft;
    this.onRight = onRight;
    this.y0 = y0;
    this.y = this.y0;
    this.angle = 0;
    this.src = ['img/juan.jpeg', 'img/giorgio.jpeg', 'img/gabi.jpeg', 'img/diego.jpeg', 'img/anna.jpeg', 'img/marc.jpeg'];
    this.img = new Image();
    if (this.game.mode == 1){
        this.img.src = 'img/skull.png';
        this.w = 64;
        this.h = 80;
    } else if (this.game.mode == 2) {
        this.img.src = this.src[src];
        this.w = 90;
        this.h = 90;
    }


}

Ball.prototype.draw = function() {
    if (this.game.mode == 0){
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.closePath();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fill();
    } else {
        if (!this.onairToR && !this.onairToL){
        this.game.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
          );
        } else {
            if (this.game.mode == 1){this.angle+=25;} else {this.angle+=10;}
            this.game.ctx.save();
            this.game.ctx.translate(this.x + this.w/2, this.y + this.h/2);
            this.game.ctx.rotate(this.angle*Math.PI/180);
            this.game.ctx.drawImage(this.img,
                                    this.x -this.x-this.w/2,
                                    this.y -this.y-this.h/2,
                                    this.w,
                                    this.h);
            this.game.ctx.translate(-this.x - this.w/2, -this.y - this.h/2);
            this.game.ctx.restore();
        }
    }
}

Ball.prototype.moveToR = function() {
    if (this.game.isGrabbedByRight(this)){
        this.game.ballsOnair.pop();
        this.game.handRight.ballsIn.push(this);
        this.onRight = true;
        this.onairToR = false;
        
    } else {
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            var variation = Math.random() * (9 + 1)-1;
            this.x += variation;
            //GRAVITY ON AIR
            if (this.y >= this.y0) {
                this.vy = 1;
                this.y = this.y0;
            } else {
                this.vy += gravity;
                this.y += this.vy;
            }
        }
    }
}

Ball.prototype.moveToL = function() {
    if (this.game.isGrabbedByLeft(this)){
        this.game.ballsOnair.pop();
        this.game.handLeft.ballsIn.push(this);
        this.onLeft = true;
        this.onairToL = false;
        
    } else { 
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            var variation = Math.random() * (9 + 1) - 1;
            this.x -= variation;
            //GRAVITY ON AIR
            if (this.y >= this.y0) {
                this.vy = 1;
                this.y = this.y0;
            } else {
                this.vy += gravity;
                this.y += this.vy;
            }
        }
    }
}

Ball.prototype.translateR = function() {
    this.x = this.game.handRight.x + this.game.handRight.w / 2;
}
Ball.prototype.translateL = function() {
    if (this.game.mode == 0){
        this.x = this.game.handLeft.x + this.game.handLeft.w / 2;
    } else {
        this.x = this.game.handLeft.x + this.game.handLeft.w / 10;
    }
}
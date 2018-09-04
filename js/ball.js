function Ball(game, x, color, y0, onLeft, onRight) {
    this.game = game;
    this.x = x;
    this.y = this.game.handLeft.y;
    this.vy = 1;
    this.radius = 20;
    this.color = color;
    this.onairToR = false;
    this.onairToL = false;
    this.onLeft = onLeft;
    this.onRight = onRight;
    //this.launched = 1;
    this.y0 = y0;
    this.y = this.y0;

}

Ball.prototype.draw = function() {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.game.ctx.closePath();
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fill();
}

Ball.prototype.moveToR = function() {
    if (this.game.isGrabbedByRight(this)){
        console.log("GRABBED BY RIGHT");
        this.game.handRight.howmany++;
        console.log(this.game.handRight.howmany);
        this.game.handLeft.howmany--;
        console.log(this.game.handLeft.howmany + " RESTA LEFT");
        this.onRight = true;
        this.onairToR = false;
        
    } else {
        
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            var variation = Math.random() * (10 + 2) - 2;
            this.x += variation;
            //SOLO LE SUMA LA GRAVEDAD CUANDO ESTÁ EN EL AIRE
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
        console.log("GRABBED BY LEFT");
        this.game.handLeft.howmany++;
        console.log(this.game.handLeft.howmany);
        //this.game.handLeft.howmany--;
        //console.log(this.game.handLeft.howmany + " RESTA LEFT");
        this.onLeft = true;
        this.onairToL = false;
        
    } else {
        
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            var variation = Math.random() * (10 + 2) - 2;
            this.x -= variation;
            //SOLO LE SUMA LA GRAVEDAD CUANDO ESTÁ EN EL AIRE
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
    this.x = this.game.handLeft.x + this.game.handLeft.w / 2;
}
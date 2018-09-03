function Ball(game) {
    this.game = game;
    this.x = this.game.handLeft.x;
    this.y = this.game.handLeft.y;
    this.vy = 1;
    this.radius = 25;
    this.color = '#9F3';
    this.onairToR = false;
    this.onairToL = false;

    this.y0 = this.game.handLeft.y;
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
    //console.log("Ball moves!!");
    if (this.game.isGrabbedByRight()){
        console.log("GRABBED BY RIGHT");
        this.onairToR = false;
        
    } else {
        this.onairToR = true;
        //console.log(this.onair + " EN MOVE")
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            //this.vy -= 2;
            var variation = Math.random() * (7 - 1) + 1;
            console.log(variation);
            this.x += variation;
            //SOLO LE SUMA LA GRAVEDAD CUANDO ESTÁ EN EL AIRE
            if (this.y >= this.y0) {
                this.vy = 1;
                this.y = this.y0;
            } else {
                
                //console.log("!!");
                this.vy += gravity;
                this.y += this.vy;
            }
        }
    }
}

Ball.prototype.moveToL = function() {
    //console.log("Ball moves!!");
    if (this.game.isGrabbedByLeft()){
        console.log("GRABBED BY LEFT");
        this.onairToL = false;
        
    } else {
        this.onairToL = true;
        //console.log(this.onair + " EN MOVE")
        var gravity = 0.1;
        if (this.y >= 0) {
            this.y -= 11;
            //this.vy -= 2;
            var variation = Math.random() * (7 - 1) + 1;
            console.log(variation);
            this.x -= variation;
            //SOLO LE SUMA LA GRAVEDAD CUANDO ESTÁ EN EL AIRE
            if (this.y >= this.y0) {
                this.vy = 1;
                this.y = this.y0;
            } else {
                
                //console.log("!!");
                this.vy += gravity;
                this.y += this.vy;
            }
        }
    }
}

Ball.prototype.translateR = function() {
    //console.log("GRABBED!!!!!!!!!!!");
    this.onair = false;
    this.x = this.game.handRight.x + this.game.handRight.w / 2;
}

Ball.prototype.translateL = function() {
    //console.log("GRABBED!!!!!!!!!!!");
    this.onair = false;
    this.x = this.game.handLeft.x + this.game.handLeft.w / 2;
}
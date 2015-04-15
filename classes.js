function Paddle() {
	this.x = 400;
	this.y = 550;
	this.w = 40;
	this.h = 10;
}

Paddle.prototype.draw = function(c) {
	c.fillStyle = 'red';
    c.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
}

Paddle.prototype.move = function(speed) {
	this.x += speed;
}

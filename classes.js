function Paddle(x, y) {
	this.x = x;
	this.y = y;
	this.w = Paddle.width;
	this.h = Paddle.height;
}
Paddle.width = 70;
Paddle.height = 12;

Paddle.prototype.draw = function(c) {
	c.fillStyle = 'red';
	c.fillRect(this.x, this.y, this.w, this.h);
}

Paddle.prototype.move = function(speed) {
	this.x += speed;
}


function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
}
Ball.radius = 6;
Ball.speed = 10;

Ball.prototype.draw = function(c) {
	c.beginPath()
	c.fillStyle = 'black';
	c.arc(this.x, this.y, Ball.radius, 0, 2*Math.PI);
	c.fill();
}


function Brick(x, y) {
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 14;
}

Brick.prototype.draw = function(c) {
	c.fillStyle = 'blue';
	c.fillRect(this.x, this.y, this.w, this.h);
}


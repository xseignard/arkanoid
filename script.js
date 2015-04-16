var LEFT = 37, RIGHT = 39;
var WIDTH = 600; HEIGHT = 600;

var canvas, c;
var paddle, ball, bricks;

var keyL = false, keyR = false;

window.onload = function() {
	canvas = document.getElementById('canvas');
	c = canvas.getContext('2d');

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);

	init();

	window.setInterval(loop, 30);
}

function init() {
	paddle = new Paddle(WIDTH/2 - Paddle.width/2, 550);
	ball = new Ball(paddle.x + Paddle.width/2, paddle.y - Ball.radius);
	bricks = []
	for (x = 55; x < WIDTH - 50; x += 50) {
		for (y = 50; y < 100; y += 24) {
			bricks.push(new Brick(x, y));
		}
	}
}

function loop() {
	input();
	logic();
	draw();
}

function input() {
	if (keyL && !keyR) paddle.move(-9);
	else if(keyR && !keyL) paddle.move(9);
}

function logic() {

}

function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);

	// frame
	c.strokeRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
	c.moveTo(WIDTH, 0);
	c.lineTo(WIDTH, HEIGHT);
	c.stroke();

	paddle.draw(c);
	ball.draw(c);
	for (i = 0; i < bricks.length; i++) {
		bricks[i].draw(c);
	}
}

function keydown(e) {
	if (e.keyCode == LEFT) keyL = true;
	else if (e.keyCode == RIGHT) keyR = true;
}

function keyup(e) {
	if (e.keyCode == LEFT) keyL = false;
	else if (e.keyCode == RIGHT) keyR = false;
}

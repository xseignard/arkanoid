var LEFT = 37, RIGHT = 39;

var canvas, c;
var paddle, ball, bricks;
var direction = 0;

window.onload = function() {
	canvas = document.getElementById('canvas');
	c = canvas.getContext('2d');

	paddle = new Paddle();

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);

	window.setInterval(loop, 30);
}

function loop() {
	if (direction == LEFT) paddle.move(-9);
	else if(direction == RIGHT) paddle.move(9);

	draw();
}

function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.strokeRect(0, 0, 800, 600); // frame

	paddle.draw(c);
}

function keydown(e) {
	if (e.keyCode == LEFT) direction = LEFT;
	else if (e.keyCode == RIGHT) direction = RIGHT;
}

function keyup(e) {
	if (e.keyCode == LEFT || e.keyCode == RIGHT) direction = 0;
}

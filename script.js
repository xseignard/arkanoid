var LEFT = 37, RIGHT = 39;

var canvas, c;
var paddle, ball, bricks;
var direction = 0;

window.onload = function() {
	canvas = document.getElementById('canvas');
	c = canvas.getContext('2d');

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);

	c.strokeRect(0, 0, 800, 600); // frame

	c.fillStyle = 'red';
	c.fillRect(500, 500, 40, 10);

	window.setInterval(loop, 3000);
}

function loop() {
	console.log('loop' + direction);
}

function keydown(e) {
	if (e.keyCode == LEFT) direction = LEFT;
	else if (e.keyCode == RIGHT) direction = RIGHT;
}

function keyup(e) {
	if (e.keycode == LEFT || e.keyCode == RIGHT) direction = 0;
}

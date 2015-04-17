var LEFT = 37, RIGHT = 39;
var SPACEBAR = 32;
var WIDTH = 600; HEIGHT = 600;

var States = {
	STARTING: 1,
	PLAYING: 2,
	OVER: 3
}
var gameState = States.STARTING;

var canvas, c;
var paddle, ball, bricks;

var keyL = false, keyR = false;

window.onload = function() {
	canvas = document.getElementById('canvas');
	c = canvas.getContext('2d');

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);

	init();
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
	window.setInterval(loop, 30);
}

function start() {
	var angle = Math.random() * Math.PI / 2 + Math.PI / 4; // 45° - 135°
	ball.speedX = Math.cos(angle) * Ball.speed;
	ball.speedY = -Math.sin(angle) * Ball.speed; // we start in top left corner
}

function loop() {
	input();
	if (gameState == States.PLAYING) logic();
	draw();
}

function input() {
	if (gameState == States.OVER) return;

	if (keyL && !keyR) paddle.move(-9);
	else if(keyR && !keyL) paddle.move(9);

	if (paddle.x < 0) paddle.x = 0;
	else if	(paddle.x + paddle.w > WIDTH) paddle.x = WIDTH - paddle.w;
}

function logic() {
	ball.x += ball.speedX;
	ball.y += ball.speedY;
	if (ball.x < 0) ball.speedX = -ball.speedX;
	if (ball.x > WIDTH) ball.speedX = -ball.speedX;
	if (ball.y < 0) ball.speedY = -ball.speedY;

	if (ball.y > HEIGHT) {
		ball.speedX = 0;
		ball.speedY = 0;
		gameState = States.OVER;
	}
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
	for (i = 0; i < bricks.length; i++) {
		bricks[i].draw(c);
	}
	if (gameState != States.OVER) ball.draw(c);
	else {
		text = "Game Over";
		c.font = '50px monospace';
		c.fillStyle = 'black';
		width = c.measureText(text).width;
		c.fillText(text, WIDTH/2 - width/2, HEIGHT/2);
	}
}

function keydown(e) {
	if (gameState == States.STARTING && e.keyCode == SPACEBAR) {
		gameState = States.PLAYING;
		start();
	}

	if (e.keyCode == LEFT) keyL = true;
	else if (e.keyCode == RIGHT) keyR = true;
}

function keyup(e) {
	if (e.keyCode == LEFT) keyL = false;
	else if (e.keyCode == RIGHT) keyR = false;
}

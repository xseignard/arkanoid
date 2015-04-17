var LEFT = 37, RIGHT = 39;
var SPACEBAR = 32;
var WIDTH = 600; HEIGHT = 600;

var States = {
	STARTING: 1,
	PLAYING: 2,
	OVERTIME: 3,
	OVER: 4
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
		for (y = 50; y < 60; y += 24) {
			bricks.push(new Brick(x, y));
		}
	}
	//bricks.push(new Brick(100, 100));
	window.setInterval(loop, 17);
}

function start() {
	var angle = Math.random() * Math.PI / 2 + Math.PI / 4; // 45° - 135°
	ball.speedX = Math.cos(angle) * Ball.speed;
	ball.speedY = -Math.sin(angle) * Ball.speed; // we start in top left corner
}

function loop() {
	input();
	logic();
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
	if (gameState == States.OVER) return;

	// move
	ball.x += ball.speedX;
	ball.y += ball.speedY;

	// walls
	if (ball.x - 2*Ball.radius < 0 && ball.speedX < 0) ball.speedX = -ball.speedX;
	if (ball.x + 2*Ball.radius > WIDTH && ball.speedX > 0) ball.speedX = -ball.speedX;
	if (ball.y - 2*Ball.radius < 0 && ball.speedY < 0) ball.speedY = -ball.speedY;

	// paddle
	if (ball.y + Ball.radius + ball.speedY > paddle.y &&
			ball.y + Ball.radius <= paddle.y &&
			paddle.x <= ball.x + Ball.radius &&
			ball.x - Ball.radius <= paddle.x + paddle.w) {
		// new angle based on impact position
		var dist = (ball.x - paddle.x) / paddle.w;
		var angle = Math.PI / 6 + Math.PI * 2/3 * dist;
		ball.speedX = -Math.cos(angle) * Ball.speed;
		ball.speedY = -Math.sin(angle) * Ball.speed;
	}

	// game over
	if (ball.y > HEIGHT) {
		ball.speedX = 0;
		ball.speedY = 0;
		gameState = States.OVER;
	}

	// bricks
	edgeX = ball.x + Ball.radius * Math.sign(ball.speedX);
	edgeY = ball.y + Ball.radius * Math.sign(ball.speedY);
	for (i = 0; i < bricks.length; i++) {
		var brick = bricks[i];

		// hit?
		if (edgeX >= brick.x && edgeX <= brick.x + brick.w &&
				edgeY >= brick.y && edgeY <= brick.y + brick.h) {
			if (ball.x < brick.x || ball.x < brick.x + brick.w) ball.speedY = -ball.speedY;
			if (ball.y < brick.y || ball.y < brick.y + brick.h) ball.speedX = -ball.speedX;
			bricks.splice(i, 1);

			if (bricks.length == 0) {
				gameState = States.OVERTIME;
			}
		}
	}
}

function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);

	// frame
	c.strokeStyle = 'black';
	c.strokeRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
	c.moveTo(WIDTH, 0);
	c.lineTo(WIDTH, HEIGHT);
	c.stroke();

	paddle.draw(c);

	for (i = 0; i < bricks.length; i++) {
		bricks[i].draw(c);
	}

	if (gameState == States.OVERTIME) {
		centerText("You're not supposed to win", 30, HEIGHT/2 - 20);
		centerText("Keep going", 30, HEIGHT/2 + 20);
	}

	if (gameState != States.OVER) ball.draw(c);
	else centerText("Game Over", 50, HEIGHT / 2);
}

function centerText(text, size, height) {
	c.font = size + 'px monospace';
	c.fillStyle = 'black';
	width = c.measureText(text).width;
	c.fillText(text, WIDTH/2 - width/2, height);
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

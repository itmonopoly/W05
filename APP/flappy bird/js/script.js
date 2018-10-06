var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var playerX = 10;
var playerY = 150;
var pipes = [];
var distance = 90;
var score = 0;

var bird = new Image();
var background = new Image();
var ground = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

pipes.push({
	x: canvas.width,
	y: 0
})

/*
pipes[0] // {x: 288, y: 0}
pipes[0].x // 288
*/

function drawPipes() {
	for(var i = 0; i < pipes.length; i++) {
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + distance);
		pipes[i].x--;

		if(pipes[i].x == 150) {
			pipes.push({
				x: canvas.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}

		if(pipes[i].x == 0) {
			score++;
		}
	}
}

bird.src = "img/bird.png";
background.src = "img/bg.png";
ground.src = "img/ground.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0 ,0);
	drawPipes();
	ctx.drawImage(ground, 0, canvas.height - ground.height);
	drawScore();
	ctx.drawImage(bird, playerX, playerY);
	playerY++;
	requestAnimationFrame(draw)
}

function drawScore() {
	ctx.fillStyle = "black";
	ctx.font = "24px Arial";
	ctx.fillText("Score: " + score, 10, canvas.height - 20)
}

function jump(e) {
	if(e.keyCode == 32) {
		playerY -= 25;
	}
}

document.addEventListener("keydown", jump);

pipeBottom.onload = draw;
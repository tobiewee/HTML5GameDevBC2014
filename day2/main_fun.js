function main(){
	var canvas = document.getElementById('layer2');
	var ctx = canvas.getContext('2d');
	var SCREEN_WIDTH = canvas.width;
	var SCREEN_HEIGHT = canvas.height;

	//define Ball constructor
	function Ball(){
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.radius = 40;
	}
	Ball.prototype.draw = function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = "#f00";
		ctx.beginPath();
		ctx.arc(0,0,this.radius, 0, (Math.PI*2), true);
		ctx.fill();
		ctx.restore();
	}

	//create ball and set position
	var ball = new Ball();
	ball.x = SCREEN_WIDTH/2;
	ball.y = SCREEN_HEIGHT/2;

	function drawFrame(){
		//create loop
		//use in place of while loop!
		//setTimeout is the alternative, but for games, use req anim frame.
		window.requestAnimationFrame(drawFrame);
		//clear canvas
		//optimize later by explicitly saying where to clear
		ctx.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
		//draw
		ball.x += 2*ball.vx;
		ball.y += 2*ball.vy;
		ball.draw(ctx);
	}

	drawFrame();

	//event listener on keypress
	window.addEventListener('keydown', function(event){
		switch(event.keyCode){
			case 37: //left
				ball.vx -= 1;
				break;
			case 39: //right
				ball.vx += 1;
				break;
			case 38: //up
				ball.vy -= 1;
				break;
			case 40: //down
				ball.vy += 1;
				break;
			case 27: //escape
				ball.vx = 0;
				ball.vy = 0;
				ball.x = SCREEN_WIDTH/2;
				ball.y = SCREEN_HEIGHT/2;				
			default:
				ball.vx = 0;
				ball.vy = 0;
				break;
		}
	})
}
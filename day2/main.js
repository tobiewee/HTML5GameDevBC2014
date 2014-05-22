function main(){
	var canvas = document.getElementById('layer2');
	var ctx = canvas.getContext('2d');
	var SCREEN_WIDTH = canvas.width;
	var SCREEN_HEIGHT = canvas.height;

	//create ball and set position
	var sprite = new Sprite('./assets/character/girl1.png', {
		//options for the sprite
		cols: 4, 
		rows: 4,
		width: 32,
		height: 32,
		cellWidth: 32,
		cellHeight: 48,
		cellOffsetX: -16,
		cellOffsetY: 0
	});
	sprite.x = SCREEN_WIDTH/2;
	sprite.y = SCREEN_HEIGHT/2;
	/*var sprite1 = new Sprite('./assets/character/guy1.png', {
		//options for the sprite
		cols: 4, 
		rows: 4,
		width: 32,
		height: 32,
		cellWidth: 32,
		cellHeight: 48,
		cellOffsetX: -16,
		cellOffsetY: 0
	});
	sprite1.x = SCREEN_WIDTH/2;
	sprite1.y = SCREEN_HEIGHT/2;*/

	function drawFrame(){
		//create loop
		//use in place of while loop!
		//setTimeout is the alternative, but for games, use req anim frame.
		window.requestAnimationFrame(drawFrame);
		//clear canvas
		//optimize later by explicitly saying where to clear
		ctx.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
		//draw
		sprite.draw(ctx);
		//sprite1.draw(ctx);
	}

	drawFrame();

	//event listener on keypress
	window.addEventListener('keydown', function(event){
		var row = 0;
		switch(event.keyCode){
			case 37: //left
				sprite.vx = -2;
				sprite.play(1);
				break;
			case 39: //right
				sprite.vx = 2;
				sprite.play(2);
				break;
			case 38: //up
				sprite.vy = -2;
				sprite.play(3);
				break;
			case 40: //down
				sprite.vy = 2;
				sprite.play(0);
				break;
			/*case 27:
				sprite.vx = 0;
				sprite.vy = 0;
				sprite.x = SCREEN_WIDTH/2;
				sprite.y = SCREEN_HEIGHT/2;*/
		}
	})
	window.addEventListener('keyup', function(event){
		sprite.vx = 0;
		sprite.vy = 0;
		sprite.stop();
	})
}
function Bird(game, stage){
	this.game = game;
	this.stage = stage;

	this.height = 40;
	this.width = 40;

	this.x = 80;
	this.y = 150;

	//only vy, cos flappy is fixed position, bg move
	this.velocityY = 0;
	this.terminalVelocityDn = 700;
	this.terminalVelocityUp = -500;

	this.gravity = 780;

	this.color = 'yellow';

	//Sprite
	/*this.sprite = new Sprite('./img/birdie1.png', {
		cols: 14,
		rows: 1,
		x: this.x,
		y: this.y,
		height: this.height,
		cellHeight: 47,
		width: this.width,
		cellWidth: 51.15
	});
	this.sprite.scaleX = 1;
	this.sprite.scaleY = 1;
	this.sprite.play(0);*/
	this.sprite = new Sprite('./img/birdie.png', {
		cols: 14,
		rows: 1,
		x: this.x,
		y: this.y,
		height: this.height,
		cellHeight: 168,
		width: this.width,
		cellWidth: 183,
		cellOffsetX: -60,
		cellOffsetY: -60
	});
	this.sprite.scaleX = .5;
	this.sprite.scaleY = .5;
	this.sprite.play(0);
	this.sprite.rotation = -.5;

	//add event listener
	this.stage.addEventListener('click', this.flap.bind(this));
}

Bird.prototype.flap = function(){
	//console.log('flapping');
	this.velocityY = this.velocityY - 480;
};

Bird.prototype.update = function(delta){
	//update bird falling...
	this.velocityY = this.velocityY + (this.gravity * delta/1000);
	if(this.velocityY > this.terminalVelocityDn){
		this.velocityY = this.terminalVelocityDn;
	} else if(this.velocityY < this.terminalVelocityUp){
		this.velocityY = this.terminalVelocityUp;
	}
	this.y = this.y + (this.velocityY * delta/1000);
	//limit fall
	if(this.y > this.game.height-(this.height/2)){
		this.velocityY = 0;
		this.y = this.game.height-(this.height/2);
	} else if(this.y < (this.height/2)){
		this.velocityY = 0;
		this.y = 0+(this.height/2);
	}

	//update rotation
	//this.sprite.rotation = 
	this.sprite.rotation = .5*(this.velocityY/this.terminalVelocityDn);
	this.sprite.x = this.x - this.width/2;
	this.sprite.y = this.y - this.height/2;
};

Bird.prototype.draw = function(ctx){
	/*ctx.beginPath();
	//position (x,y), radius is height/2, degree of rotation is 360deg
	ctx.arc(this.x, this.y, this.height/2, 0, Math.PI*2, true);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();*/

	//draw sprite instead
	this.sprite.draw(ctx);
};
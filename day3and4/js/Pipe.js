function Pipe(game, stage){
	this.game = game;
	this.stage = stage;

	this.height = 30+(Math.random()*100);
	this.width = 100;

	this.x = this.game.width;
	this.y = this.game.height - this.height;

	this.color = 'green';

	this.velocityX = -200;

	this.gapHeight = 150;

	this.image = new Image();
	this.image.onload = this.imageLoaded.bind(this);
	this.image.src = './img/small-pipe.png';
	this.image1 = new Image();
	this.image1.onload = this.imageLoaded1.bind(this);
	this.image1.src = './img/small-pipe-up.png';

	this.active = false;
}

Pipe.prototype.imageLoaded = function(){
	this.loaded = true;
}
Pipe.prototype.imageLoaded1 = function(){
	this.loaded1 = true;
}

Pipe.prototype.animate = function(){
	this.active = true;
}

Pipe.prototype.update = function(delta){
	if(this.active === true){
		this.x = this.x + (this.velocityX * (delta/1000));
		if(this.x < -this.width){
			this.recycle();
		}
	}
};

Pipe.prototype.recycle = function(){
	this.x = this.game.width;
	this.color = 'green';
	this.height = 30+(Math.random()*100);
	this.y = this.game.height - this.height;
};

Pipe.prototype.draw = function(ctx){
	ctx.fillStyle = this.color;
	//ctx.fillRect(this.x, this.y, this.width, this.height);
	//ctx.fillRect(this.x, 0, this.width, this.y-this.gapHeight);
	if(this.loaded&&this.loaded1){
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.fillRect(this.x, 0, this.width, this.y-this.gapHeight);
		ctx.drawImage(this.image1, this.x, 0, this.width, this.y-this.gapHeight);
	}
};
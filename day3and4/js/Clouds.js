function Cloud(stage){
	this.stage = stage;
	this.x = 300;
	this.y = 150;
	this.width = 170;
	this.height = 100;

	this.vx=-200;
	this.vy= 0;

	this.image = new Image();
	this.image.onload = this.imageLoaded.bind(this);
	this.image.src = './img/large-cloud.png';
}

Cloud.prototype.imageLoaded = function(){
	this.loaded = true;
};

Cloud.prototype.update = function(delta){
	this.y = this.y + (this.vy*(delta/1000));
	this.x = this.x + (this.vx*(delta/1000));
};

Cloud.prototype.draw = function(ctx){
	if(this.loaded){
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
};
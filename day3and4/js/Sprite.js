function Sprite(imageURL, options){
	//parse options
	if(!options) options = {};
	
	this.x=0;
	this.y=0;

	this.width = options.width || 0;
	this.height = options.height || 0;
	this.rows = options.rows || 0;
	this.cols = options.cols || 0;

	this.vx =0;
	this.vy=0;
	this.radius = 40;

	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	
	this.imageLoaded = false;
	this._image = null;
	this.setImage(imageURL);
	
	this.cellWidth = options.cellWidth || this.width;
	this.cellHeight = options.cellHeight || this.height;
	this.cellOffsetX = options.cellOffsetX || 0;
	this.cellOffsetY = options.cellOffsetY || 0;
	
	this._spritesheetOffsetX = 0;
	this._spritesheetOffsetY = 0;
	
	this.isPlaying = false;
	this.counter = 0; //updated every tick a sequence is played
	this.sampleRate = 5; //amount of ticks to play each cel
	//next change point on timeline that causes a sample transition
	this.samepleChange = this.sampleRate; 
	this.sampleEnd = this.sampleRate * this.cols; //end of timeline
	
}//end of Sprite()

Sprite.prototype.setImage = function(imgURL){
	//this = sprite here
	this._image = new Image();
	this._image.onload = function (){ //bind returns a function
		//this is now sprite (was image)
		this.imageLoaded = true;
		this.width = this._image.width;
		this.height = this._image.height;
	}.bind(this); //pass sprite
	 //end of image onload
	
	this._image.src = imgURL;
	
}//end of Sprite prototype setImage

Sprite.prototype.draw = function(ctx){
	this.x += this.vx;
	this.y += this.vy;
	
	if(this.imageLoaded) {
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.rotation);
		ctx.scale(this.scaleX, this.scaleY);
		
		if(this.isPlaying) {
			this.tick();	
		}//end of isplayingif
		
		ctx.drawImage(this._image, 
					  this._spritesheetOffsetX, 
					  this._spritesheetOffsetY, 
					  this.cellWidth, 
					  this.cellHeight,
					  this.cellOffsetX,
					  this.cellOffsetY,
					  this.cellWidth,
					  this.cellHeight);
					  
		ctx.restore();
	}//end of imageloaded if

	
	/* for circle testing
	ctx.fillStyle = "#F00";
	ctx.beginPath();
	ctx.arc(0, 0, this.radius, 0, (Math.PI*2), true);
	ctx.fill(); */
	
}//end of sprite prototype draw


Sprite.prototype.play = function(row) {
	this._spritesheetOffsetY = row * this.cellHeight;
	
	this.isPlaying = true;
	
}// end of play function

Sprite.prototype.stop = function(){
	this.isPlaying = false;
	this.resetCounter();	
	
};//end of stop function



Sprite.prototype.tick = function(){
	if(this.counter === this.sampleEnd){
		this.resetCounter();
	} else if (this.counter === this.sampleChange){
		this._spritesheetOffsetX += this.cellWidth;
		this.sampleChange += this.sampleRate;
	}
	
	this.counter += 1;
	
}//end of tick function
	

//resets the counter and x-offset of animation sequence	
Sprite.prototype.resetCounter = function (){
	
	this.counter = 0;
	this._spritesheetOffsetX = 0;
	this.sampleChange = this.sampleRate;
	
}//end of reset counter function
function Score(stage, el){
	//in case needed.
	//not used here.
	this.stage = stage;
	this.el = el;

	this.timeElapsed=0;
}

Score.prototype.update = function(delta){
	this.timeElapsed = this.timeElapsed + delta;
	this.el.textContent = this.timeElapsed/1000 | 0;
};

Score.prototype.reset = function(){
	this.timeElapsed = 0;
};
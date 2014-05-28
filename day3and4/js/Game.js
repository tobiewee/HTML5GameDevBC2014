function Game(stage){
	this.stage = stage;
	this.ctx = stage.getContext('2d');

	this.height = this.stage.height;
	this.width = this.stage.width;

	//Birdie!
	this.bird = new Bird(this, this.stage);

	//Pipes
	this.pipes = [];
	for(var i =0; i<3; i++){
		this.pipes[i] = new Pipe(this, this.stage);
		setTimeout(function(p){
			p.animate();
		}.bind(this, this.pipes[i]), i * 1000);
	}

	//Collider
	this.collider = new Collider(this, this.bird, this.pipes);

	//Score
	this.score = new Score(this.stage, document.getElementById("score"));

	//Cloud
	this.cloud = new Cloud(this.stage);

	this.lastTick = Date.now();
	//kick off the ticking
	this.tick();
}

//game tick
Game.prototype.tick = function(){
	//console.log('ticking');
	//setup delta
	var now=Date.now();
	var delta = Date.now() - this.lastTick;
	this.lastTick = now;


	//clear canvas
	this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);

	//draw bird
	this.bird.update(delta);
	this.bird.draw(this.ctx);
	//draw pipe
	for(var i=0; i<this.pipes.length; i++){
		this.pipes[i].update(delta);
		this.pipes[i].draw(this.ctx);
	}

	this.collider.checkCollision();

	this.score.update(delta);

	this.cloud.update(delta);
	this.cloud.draw(this.ctx);
	//the browser will call the function as a new object, 
	//so we need to bind it with the current game
	requestAnimationFrame(this.tick.bind(this));
};

Game.prototype.die = function(){
	this.score.reset();
};

window.addEventListener('DOMContentLoaded', function(){
	new Game(document.getElementById('stage'));
});
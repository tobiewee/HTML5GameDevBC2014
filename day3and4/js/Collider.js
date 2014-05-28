function Collider(game, bird, pipes){
	this.game = game;
	this.bird  = bird;
	this.pipes = pipes;

	//for bbox cd
	this.leftX = this.bird.x-this.bird.width/2;
	this.rightX = this.bird.x+this.bird.width/2;
}

Collider.prototype.checkCollision = function() {
	for(var i=0; i<this.pipes.length; i++){
		//pipe x and y are upper lh corner.
		var pipe = this.pipes[i];
		if((pipe.x+pipe.width > this.leftX && pipe.x < this.rightX)){
			if((this.bird.y > pipe.y-(this.bird.height/2)) || 
				(this.bird.y < (pipe.y-pipe.gapHeight)+(this.bird.height/2))){
				pipe.color = 'red';
				this.game.die();
			}
		}
		/*else{
			pipe.color = 'green';
		}*/
	}
};
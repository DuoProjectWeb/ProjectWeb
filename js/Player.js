var Player = function(scene){	
	Character.call(this, scene, "Player", {
		idle : 
		{
			img : "img/player.png",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	
	var self = this;
	this.canMove = false;
	this.speed = 500/1000;
	this.bulletInterval = 200;
	this.bulletTimer = 0;
	
	this.game.canvas.addEventListener("mousedown", function(e){
		self.canMove = true;
		//console.log("mouse down");
	});
	
	this.game.canvas.addEventListener("mousemove", function(e){
		//console.log("try to move");
		if(self.canMove){
			var offset = getGlobalOffset(self.game.canvas);
			self.moveTo(e.clientX - offset.left - scene.playerStartOffset_X, e.clientY - offset.top - scene.playerStartOffset_Y);
			//console.log("moved");
		}
	});
	
	this.game.canvas.addEventListener("mouseup", function(e){
		self.canMove = false;
		//console.log("mouse up");
	});
	
	/*this.game.canvas.addEventListener("click", function(e){
		self.fire();
	});*/
};

Player.prototype = new Character();

Player.prototype.fire = function(){			
	//console.log("fire");
	var bullet = new Bullet(this.x, this.y - this.currentSprite.spriteHeight * 0.4);
	this.scene.addEntity(bullet, "bullet");
	this.scene.destroyEntityWithDelay(bullet, "bullet", 3);
};

Player.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	//this.y += this.speed * tpf;
	
	this.bulletTimer += tpf;
	if(this.bulletTimer >= this.bulletInterval){
		this.bulletTimer = 0;
		//fire something
		this.fire();
	}
};
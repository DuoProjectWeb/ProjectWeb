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
	this.speed = 600;
	this.bulletInterval = 0.35;
	this.bulletTimer = 0;

	//temp
	this.boundingVolume = new BoundingSphere(this, this.x, this.y, 50, this.onCollision);
	
	this.game.canvas.addEventListener("mousedown", function(e){
		self.canMove = true;
		self.game.time.timeScale = 1;
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
		self.game.time.timeScale = 0.1;
		//console.log("mouse up");
	});
	
	/*this.game.canvas.addEventListener("click", function(e){
		self.fire();
	});*/

	this.score = 0;

	var img = new Image();
	img.src = "img/flame.png";
	this.emitter = new ParticleEmitter(
		{
			"position" : new Vector2(100, 200),
			"emitterShape" : EmitterShape.Circle({"radius" : 50, "emitFrom" : EmitFrom.Shell}),
			"nbMaxParticles" : 300,
			"nbParticlesPerSec" : 0,
			"minLife" : 2,
			"maxLife" : 2,
			"speed" : 20,
			"color" : new Color(255, 0, 0, 1.0)
		}
	);//, new Sprite(img, 2, 2, true));
	//this.emitter.influencers.push(new ColorInfluencer(new Color(255, 0, 0, 1.0), new Color(255, 0, 0, 0.1)));	
	//this.emitter.influencers.push(new GravityInfluencer(new Vector2(0.0, 9.81)));
	//this.emitter.influencers.push(new DestinationInfluencer(new Vector2(30, 60)));
	//this.emitter.influencers.push(new SizeInfluencer(new Vector2(5, 5), new Vector2(1, 1)));
	//this.emitter.influencers.push(new SpeedInfluencer(0.1, 50));
	//this.emitter.influencers.push(new RotationInfluencer(180.0));
	//this.emitter.influencers.push(new SizePulsingInfluencer(new Vector2(2, 2), new Vector2(20, 20), 4));
	//this.emitter.influencers.push(new SpriteAnimationInfluencer(SpriteMode.Random, SpriteChangeEvent.EachTime(0.1)));
	this.emitter.emitAllParticles();
	ParticleEmitterManager.add(this.emitter);	
};

Player.prototype = new Character();

Player.prototype.fire = function(){			
	//console.log("fire");
	var bullet = new Bullet(this.x, this.y - this.currentSprite.spriteHeight * 0.4, this, function(collider){
		if(collider.name == "Enemy"){
			this.score += 25;
		}
	});
	this.scene.addEntity(bullet, "bullet");
	this.scene.destroyEntityWithDelay(bullet, "bullet", 3); 
};

Player.prototype.render = function(g){
	Character.prototype.render.call(this, g);
	g.fillStyle = "rgb(255, 255, 255)";
	g.textAlign = "center";
	g.fillText(this.score, g.width * 0.5, 50);

	if(!this.canMove){
		g.fillStyle = "rgb(0, 200, 255)";
		g.fillText(this.health / this.maxHealth * 100 + "%", this.x, this.y + 75);
	}
}

Player.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	//this.y += this.speed * tpf;
	
	this.bulletTimer += tpf;
	if(this.bulletTimer >= this.bulletInterval){
		this.bulletTimer = 0;
		//fire something
		this.fire();
	}
	this.emitter.position.set(this.x, this.y);
};

Player.prototype.takeDamage = function(amount) {
	Character.prototype.takeDamage.call(this, amount);
	//shield
};


Player.prototype.onCollision = function(collider) {
	if(collider.name == "Enemy"){
		console.log("collide with enemy");
		this.takeDamage(10);
	}
};
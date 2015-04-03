var Player = function(scene){	
	Character.call(this, scene, "Player", {
		idle : 
		{
			img : "player",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	
	var self = this;
	this.canMove = false;
	this.speed = 600;
	this.scale = 0.15;
	this.bulletInterval = 0.15;
	this.bulletTimer = -1.0;

	this.setPosition(this.scene.game.canvas.width / 2 , this.scene.game.canvas.height);

	//temp
	this.boundingVolume = new BoundingSphere(this, this.x, this.y, 15, this.onCollision);
	
	this.game.canvas.addEventListener("mousedown", function(e){
		//console.log("mouse down");
		switch(e.which){
			case 1:
			//left
				var offset = getGlobalOffset(self.game.canvas);
				var b = self.getBonusClicked(e.clientX - offset.left - self.x, e.clientY - offset.top - self.y);
				if(b){
					console.log("bonus clicked");
					b.start();
				}else{
					self.canMove = true;
					self.game.time.timeScale = 1;
				}
				break;
			case 2:
			//middle			
				self.fireBomb();
				break;
			case 3:
			//right
				break;
			default:
				console.log("Error unknown mouse button");
		}
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

	this.bonus = [new Bomb(this.scene, 0, 0, 5.0), new Bomb(this.scene, 0, 0, 2.0), new Bomb(this.scene, 0, 0, 1.0)];

	this.propulsionEmitter = new ParticleEmitter(
		{
			"position" : new Vector2(0, 0),
			"emitterShape" : EmitterShape.Point(VelocityMode.None),
			"nbMaxParticles" : 80,
			"nbParticlesPerSec" : 40,
			"minLife" : 2,
			"maxLife" : 2,
			"size" : new Vector2(10, 10),
			"loop" : true
		}
	);
	this.propulsionEmitter.influencers.push(new ColorInfluencer(new Color(255, 131, 0, 1.0), new Color(255, 255, 0, 0.1)));	
	this.propulsionEmitter.influencers.push(new GravityInfluencer(new Vector2(0.0, 9.81)));
	this.propulsionEmitter.influencers.push(new SizeInfluencer(new Vector2(3, 3), new Vector2(0.8, 0.8)));
	ParticleEmitterManager.add(this.propulsionEmitter);	
};

Player.prototype = new Character();

Player.prototype.fire = function(){			
	//console.log("fire");
	var bullet = new Bullet(this.x, this.y - this.currentSprite.spriteHeight * 0.8 * this.scale, this, function(collider){
		this.scene.destroyEntity(bullet, "bullet");
		if(collider.name == "Enemy"){
			this.score += 25;
		}
	});
	this.scene.addEntity(bullet, "bullet");
	this.scene.destroyEntityWithDelay(bullet, "bullet", 3.0);
	audioManager.playOneShot("shoot2");
};

Player.prototype.fireBomb = function() {
	var bomb = new Bomb(this.scene, this.x, this.y);
	this.activateBonus(bomb);
	this.scene.addEntity(bomb, "bomb");
	this.scene.destroyEntityWithDelay(bomb, "bomb", 5.0);
};

Player.prototype.getBonusClicked = function(x, y) {
	var angle = Utils.toRad( 360.0 / this.bonus.length) * -1;
	for (var i = 0; i < this.bonus.length; i++) {
		var rotatedPosX = 50 * Math.cos(angle * i) - 0 * Math.sin(angle * i);
		var rotatedPosY = 50 * Math.sin(angle * i) + 0 * Math.cos(angle * i);
		if(Utils.distanceSquared(x, y, rotatedPosX, rotatedPosY) <= 20 * 20){
			return this.bonus[i];
		}
	}
	return false;
};

Player.prototype.render = function(g){
	Character.prototype.render.call(this, g);
	g.fillStyle = "rgb(255, 255, 255)";
	g.textAlign = "center";
	g.fillText(this.score, g.width * 0.5, 50);

	if(!this.canMove){
		g.save();
		g.translate(this.x, this.y);
		g.fillStyle = "rgb(0, 200, 255)";
		g.fillText(Math.floor(this.health / this.maxHealth * 100) + "%", 0, 100);		
			var angle = 360.0 / this.bonus.length;
			for (var i = 0; i < this.bonus.length; i++) {
				var b = this.bonus[i];				
				b.renderIcon(g);
				g.rotate(Utils.toRad(angle) * -1);
			}
		g.restore();
	}
}

Player.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	
	this.bulletTimer += tpf;
	if(this.bulletTimer >= this.bulletInterval){
		this.bulletTimer = 0;
		//fire something
		this.fire();
	}
	this.propulsionEmitter.position.set(this.x + 1, this.y + 16);
};

Player.prototype.addBonus = function(b) {
	this.bonus.push(b);
};

Player.prototype.takeDamage = function(amount) {
	Character.prototype.takeDamage.call(this, amount);
	//shield
	if(this.health <= 0){
		this.death();
	}
};

Player.prototype.death = function() {
	console.log("player death");
	deathEmitter = new ParticleEmitter(
		{
			"position" : new Vector2(this.x, this.y),
			"emitterShape" : EmitterShape.Point(VelocityMode.Normal),
			"nbMaxParticles" : 10,
			"nbParticlesPerSec" : 0,
			"minLife" : 3,
			"maxLife" : 3,
			"sprite" : new Sprite(assetManager.getImage("playerExplosion"), 3, 3, false)
		}
	);
	//this.emitter.influencers.push(new ColorInfluencer(new Color(255, 0, 0, 1.0), new Color(255, 0, 0, 0.1)));
	deathEmitter.influencers.push(new SizeInfluencer(new Vector2(1, 1), new Vector2(0.1, 0.1)));
	deathEmitter.influencers.push(new SpeedInfluencer(20, 5));
	deathEmitter.influencers.push(new RotationInfluencer(250.0, true));
	deathEmitter.influencers.push(new SpriteAnimationInfluencer(SpriteMode.Random, SpriteChangeEvent.AtCreation()));
	deathEmitter.emitAllParticles();
	ParticleEmitterManager.add(deathEmitter);
	audioManager.playOneShot("death");
	this.respawn();
};

Player.prototype.respawn = function() {
	this.health = this.maxHealth;
	this.score = 0;
	console.log("respawn");
};

Player.prototype.onCollision = function(collider) {
	if(collider.name == "Enemy"){
		//console.log("collide with enemy");
		this.takeDamage(10);
	}
};
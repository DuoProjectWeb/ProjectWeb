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
	this.bulletInterval = 1.0/4.0;
	this.bulletTimer = -1.0;
	this.life = 1;
	this.respawnTimer = 0.0;

	this.setPosition(this.scene.game.canvas.width / this.game.scale / 2 , this.scene.game.canvas.height / this.game.scale);

	//temp
	this.boundingVolume = new BoundingSphere(this, this.x, this.y, 15, this.onCollision);
	
	this.game.canvas.addEventListener("mousedown", function(e){
		//console.log("mouse down");
		switch(e.which){
			case 1:
			//left
			self.onEventDown(e.clientX, e.clientY);
				break;
			case 2:
			//middle
				break;
			case 3:
			//right
				break;
			default:
				console.log("Error unknown mouse button");
		}
	});
	
	this.game.canvas.addEventListener("mousemove", function(e){
		//console.log("mouse move");
		self.onEventMove(e.clientX, e.clientY);
	});

	this.game.canvas.addEventListener("mouseup", function(e){
		//console.log("mouse up");
		self.onEventUp();
	});

	this.game.canvas.addEventListener("touchstart", function(e){
		//console.log("touch start");
		e.preventDefault();
		self.onEventDown(e.touches[0].clientX, e.touches[0].clientY);
	});

	this.game.canvas.addEventListener("touchmove", function(e){
		//console.log("touch move");
		e.preventDefault();
		self.onEventMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	});

	this.game.canvas.addEventListener("touchend", function(e){
		//console.log("touch end");
		e.preventDefault();
		self.onEventUp();
	});
	
	/*this.game.canvas.addEventListener("click", function(e){
		self.fire();
	});*/

	this.score = 0;
	this.lastScore;

	this.bonus = [new Bomb(this.scene, 280, 2.0), new FireRate(this.scene, 0.05), new Shield(this.scene, 25, 100, 6.0)];

	this.propulsionEmitter = new ParticleEmitter(
		{
			"position" : new Vector2(0, 0),
			"emitterShape" : EmitterShape.Box({"width" : 3, "height" : 1, "velocityMode" : VelocityMode.None}),
			"nbMaxParticles" : 80,
			"nbParticlesPerSec" : 40,
			"minLife" : 1,
			"maxLife" : 2,
			"size" : new Vector2(10, 10),
			"loop" : true
		}
	);
	this.propulsionEmitter.influencers.push(new ColorInfluencer(new Color(255, 131, 0, 1.0), new Color(255, 255, 0, 0.1)));	
	this.propulsionEmitter.influencers.push(new GravityInfluencer(new Vector2(0.0, 7)));
	this.propulsionEmitter.influencers.push(new SizeInfluencer(new Vector2(2, 2), new Vector2(0.8, 0.8)));
	ParticleEmitterManager.add(this.propulsionEmitter);	
};

Player.prototype = new Character();

Player.prototype.onEventDown = function(x, y) {
	var offset = getGlobalOffset(this.game.canvas);
	var b = this.getBonusClicked(
		(x - offset.left) / this.game.scale - this.x,
		(y - offset.top) / this.game.scale - this.y
	);
	if(b){
		console.log("bonus clicked");
		b.start();
	}else{
		this.canMove = true;
		this.game.time.timeScale = 1;
	}
};

Player.prototype.onEventMove = function(x, y) {
	if(this.canMove){
		var offset = getGlobalOffset(this.game.canvas);
		this.moveTo(
			(x - offset.left) / this.game.scale - this.scene.playerStartOffset_X,
			(y - offset.top) / this.game.scale - this.scene.playerStartOffset_Y
		);
	}
};

Player.prototype.onEventUp = function() {
	this.canMove = false;
	this.game.time.timeScale = 0.1;
};

Player.prototype.fire = function(){			
	//console.log("fire");
	var bullet = new Bullet(this.x, this.y - this.currentSprite.spriteHeight * 0.8 * this.scale, 300, this, function(collider){		
		if(collider.name == "Enemy"){
			this.scene.destroy(bullet);
			this.score += 25;
		}
	});
	this.scene.destroyWithDelay(bullet, 3.0);
	this.scene.add(bullet);	
	audioManager.playOneShot("shoot");
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

Player.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);

	this.bulletTimer += tpf;
	if(this.bulletTimer >= this.bulletInterval){
		this.bulletTimer = 0;
		//fire something
		this.fire();
	}
	this.propulsionEmitter.position.set(this.x, this.y + 16);

	if(this.respawning){
		this.respawnTimer += tpf;		
		if(this.respawnTimer >= 3.0){
			this.respawning = false;
		}
	}
};

Player.prototype.render = function(g){
	if(this.respawning){
		g.globalAlpha = Easing.cycleSin(this.respawnTimer, 3.0) ;
		Character.prototype.render.call(this, g);
		g.globalAlpha = 1.0;
	}else{		
		Character.prototype.render.call(this, g);
	}
	g.fillStyle = "rgb(255, 255, 255)";
	g.fillText("Life : "  + this.life, 10, 50);
	g.textAlign = "center";
	g.fillText("Score : " + this.score, g.width / this.game.scale * 0.5, 50);


	if(!this.canMove){
		g.save();
		g.fillStyle = "rgba(0, 0, 0, 0.5)";
		g.fillRect(0, 0, g.width / this.game.scale, g.height / this.game.scale);
		g.translate(this.x, this.y);
		g.fillStyle = "rgb(255, 0, 0)";
		g.font = "11px Arial";
		g.fillText(Math.floor(this.health / this.maxHealth * 100) + "%", 0, -16);		
			var angle = 360.0 / this.bonus.length;
			for (var i = 0; i < this.bonus.length; i++) {
				var b = this.bonus[i];				
				b.renderIcon(g);
				g.rotate(Utils.toRad(angle) * -1);
			}
		g.restore();
	}	
}

Player.prototype.incFireRate = function(value) {
	this.bulletInterval = Utils.clamp(this.bulletInterval - value, 0.1, Number.POSITIVE_INFINITY);
};

Player.prototype.addBonus = function(b) {
	this.bonus.push(b);
};

Player.prototype.takeDamage = function(amount) {
	if(this.respawning){
		return;
	}
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
			"emitterShape" : EmitterShape.Point({"velocityMode" : VelocityMode.Normal}),
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

	this.life -= 1;
	if(this.life <= 0){
		/*if(typeof(Storage) !== "undefined") {
			//temp
			sessionStorage.score = this.score;
			//final
			//localStorage.score = this.score;
		} else {
		    // Sorry! No Web Storage support..
		}*/

		Storage.putInt("LastScore", this.score);

		var _tempHightScore = Storage.getObject("Highscore");
		if (_tempHightScore  === "undefined" || _tempHightScore < this.score) {
		    Storage.putInt("Highscore", this.score);
		}

		this.game.time.timeScale = 1;
	}else{
		this.respawn();
	}
};

Player.prototype.isAlive = function(){
	return this.life > 0;
};

Player.prototype.respawn = function() {
	this.respawning = true;
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
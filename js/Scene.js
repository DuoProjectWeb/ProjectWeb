var Scene = function(game){
	var self = this;
	this.background = assetManager.getImage("sceneBackground");

	this.yOffset = 0;

	this.game = game;
	
	this.playerStartOffset_X = 0;
	this.playerStartOffset_Y = 0;
	
	this.player = new Player(this);
	this.player.moveTo(this.game.canvas.width / 2, this.game.canvas.height * (70 / 100));
	
	this.player.addMovementListener(function(x, y){
		self.onPlayerMove(x, y);
	});		
	
	this.targetX = this.playerStartOffset_X;
	this.targetY = this.playerStartOffset_Y;
	
	this.entities = [];	
	this.enemies = [];
	this.bullets = [];
	this.delayedDestroy = [];
	this.physicEntities = [];

	this.addEntity(this.player, "player");

	this.spawner = new Spawner(this, 0.5, 0, Game.WIDTH, -10, -10);

	//audioManager.playMusic("backgroundMusic", true);
};

Scene.prototype = new DrawableControl();

var ParticleEmitterManager = new ParticleEmitterManager();

Scene.CAMERA_SPEED = 0.008;
Scene.BACKGROUND_SPEED = 100;

Scene.prototype.addEntity = function(entity, type){
	if(entity instanceof DrawableControl){
		this.entities.push(entity);
		switch(type){
			case "enemy":
				this.enemies.push(entity);
			break;
			case "bullet":
				this.bullets.push(entity);
			break;			
		}
	}else{
		console.log("Can't add an object which is not a DrawableControl");
	}	
	if(entity.boundingVolume){
		this.addPhysic(entity);
	}
};

Scene.prototype.destroyEntity = function(entity, type){
	//console.log("destroy entity : " + entity.name);
	switch(type){
		case "enemy":
			this.enemies.splice(this.enemies.indexOf(entity), 1);
			break;	
		case "bullet":
			this.bullets.splice(this.bullets.indexOf(entity), 1);
			break;	
	}
	
	this.entities.splice(this.entities.indexOf(entity), 1);
	if(entity.boundingVolume){
		this.removePhysic(entity);
	}
	
	for(var i = this.delayedDestroy.length -1 ; i >= 0 ; i--){
		var e = this.delayedDestroy[i];
		if (e.entity === entity){
			this.delayedDestroy.splice(i, 1);
			break;
		}
	}
	delete entity;
};

Scene.prototype.destroyEntityWithDelay = function(entity, type, delay){
	//console.log("requested delay = " + d + " seconds");
	if(entity instanceof DrawableControl){
		this.delayedDestroy.push({
			"time" : this.game.time.localTime,
			"entity" : entity,
			"type" : type,
			"delay" : delay
		});
	}
	//console.log("entity registered to destroy");	
};

Scene.prototype.addPhysic = function(entity) {
	this.physicEntities.push(entity);
};

Scene.prototype.removePhysic = function(entity) {
	var index;
	if(typeof(entity) == "number"){
		index = entity;
	}else{
		index = this.physicEntities.indexOf(entity);
	}
	if(index >= 0){
		this.physicEntities.splice(index, 1);
	}else{
		console.log("remove physic error, index = " + index, entity);
	}
};

Scene.prototype.update = function(tpf){
	DrawableControl.prototype.update.call(this, tpf);
	
	this.yOffset -= Scene.BACKGROUND_SPEED * tpf;

	if (this.yOffset <= -this.background.height) {
	    this.yOffset = 0;
	}
	
	var time = this.game.time.localTime;
	for(var i = this.delayedDestroy.length-1; i>=0;i--){
		var e = this.delayedDestroy[i];
		//console.log("now = " + time + ", >= registered time = " + e.time + ", + delay = " + e.delay);
		//console.log("passedTime = " + (time - e.time));
		if(time >= e.time + e.delay){
			this.destroyEntity(e.entity, e.type);
		}
	}

	for(var i = 0; i<this.entities.length;i++){
		var e = this.entities[i];
		e.update(tpf);
	}
	
	this.spawner.update(tpf);
	this.checkCollisions();

	ParticleEmitterManager.update(tpf);
};

Scene.prototype.checkCollisions = function(){
	for (var i = this.physicEntities.length - 1; i >= 0; i--) {
		var e = this.physicEntities[i];
		if(!e){
			continue;
		}
		for (var j = this.physicEntities.length - 1; j >= 0; j--) {
			var e2 = this.physicEntities[j];
			if(i == j || !e2){
				continue;
			}
			if(this.collide(e, e2)){
				break;
			}
		}
	}
	/*for(var i = this.bullets.length-1 ; i >= 0 ; i--){
		var bullet = this.bullets[i];
		for(var j = this.enemies.length-1 ; j >= 0 ; j--){
			var e = this.enemies[j];
			if(this.collide(bullet, e)){	
				this.destroyEntity(bullet, "bullet");
				this.destroyEntity(e, "enemy");	
				audioManager.playOneShot("explosion");
				var explosionEmitter = new ParticleEmitter(
					{
						"position" : new Vector2(e.x, e.y),
						"emitterShape" : EmitterShape.Point(VelocityMode.Normal),
						"nbMaxParticles" : 10,
						"nbParticlesPerSec" : 0,
						"minLife" : 0.4,
						"maxLife" : 0.4,
						"loop" : false,
						"size" : new Vector2(0.5, 0.5),
						"sprite" : new Sprite(assetManager.getImage("flame"), 2, 2, false),
						"duration" : 1.0,
						"speed" : 50
					}
				);
				explosionEmitter.influencers.push(new RotationInfluencer(50.0));
				explosionEmitter.influencers.push(new SpriteAnimationInfluencer(SpriteMode.Random, SpriteChangeEvent.AtCreation()));
				explosionEmitter.emitAllParticles();
				ParticleEmitterManager.add(explosionEmitter);
				
				break;
			}
		}
	}
	for(var i = this.enemies.length - 1; i >= 0 ; i--){
	var e = this.enemies[i];
		if(this.collide(e, this.player)){
			this.destroyEntity(e, "enemy");
			/*this.destroyEntity(this.player, "player");
			break;*/
		//}
	//}
};

Scene.prototype.collide = function(e1, e2){
	if(e1.boundingVolume && e1.boundingVolume instanceof BoundingVolume
		&& e2.boundingVolume  && e2.boundingVolume instanceof BoundingVolume){
		return e1.boundingVolume.intersects(e2.boundingVolume);
	}else{
		//console.log("No collider between " + e1.name +" and " + e2.name);
		return false;
	}
};

Scene.prototype.render = function(g){
	DrawableControl.prototype.render.call(this, g);
	g.save();
		//g.translate(this.playerStartOffset_X, this.playerStartOffset_Y);
		//g.drawImage(this.background, 0, 0, g.width, g.height);

	g.drawImage(this.background, 0, -this.yOffset, g.width, g.height);
	g.drawImage(this.background, 0, -this.yOffset - this.background.height + 1, g.width, g.height);

		for(var i = 0; i<this.entities.length;i++){
			var e = this.entities[i];			
			e.render(g);
		}
		
	g.restore();

	ParticleEmitterManager.render(g);
};

Scene.prototype.onPlayerMove = function(x, y){
	this.targetX = -x + this.game.canvas.width /2;
	this.targetY = -y + this.game.canvas.height * 0.8;
};

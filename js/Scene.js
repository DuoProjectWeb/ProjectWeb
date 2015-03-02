var Scene = function(game){
	var self = this;
	this.background = new Image();
	this.background.src = "img/sceneBackground.jpg";
	
	this.game = game;	
	
	this.playerStartOffset_X = -0;
	this.playerStartOffset_Y = -0;
	
	this.player = new Player(this);
	p = this.player;
	this.player.setPosition(100, 100);
	
	this.player.addMovementListener(function(x, y){
		self.onPlayerMove(x, y);
	});		
	
	this.targetX = this.playerStartOffset_X;
	this.targetY = this.playerStartOffset_Y;
	
	this.entities = [];
	this.addEntity(this.player, "player");
	this.enemies = [];
	this.bullets = [];
	this.delayedDestroy = [];
	
	this.spawner = new Spawner(this, 10000, 0, 600, 0, 100);
	
};

Scene.prototype = new DrawableControl();

Scene.CAMERA_SPEED = 0.008;

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
};

Scene.prototype.destroyEntity = function(entity, type){
	console.log("destroy entity : " + entity.name);
	switch(type){
		case "enemy":
			this.enemies.splice(this.enemies.indexOf(entity), 1);
		break;	
		case "bullet":
			this.bullets.splice(this.bullets.indexOf(entity), 1);
		break;	
	}
	
	this.entities.splice(this.entities.indexOf(entity), 1);
	
	for(var i = this.delayedDestroy.length -1 ; i >= 0 ; i--){
		var e = this.delayedDestroy[i];
		if (e.entity == entity){
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
			time : Date.now(),
			entity : entity,
			type : type,
			delay : delay * 1000
		});
	}
	//console.log("entity registered to destroy");	
};

Scene.prototype.update = function(tpf){
	DrawableControl.prototype.update.call(this, tpf);
	
	/*if(this.playerStartOffset_X != this.targetX){
		var inc = (this.targetX - this.playerStartOffset_X) * Scene.CAMERA_SPEED * tpf;
		//inc = Math.pow(inc, 0.6);
		this.playerStartOffset_X += inc;
		if(Math.abs(this.targetX - this.playerStartOffset_X) <= Game.EPSILON){
			this.playerStartOffset_X = this.targetX;
		}
	}
	
	if(this.playerStartOffset_Y != this.targetY){
		var inc = (this.targetY - this.playerStartOffset_Y) * Scene.CAMERA_SPEED * tpf;
		//inc = Math.pow(inc, 0.6);
		this.playerStartOffset_Y += inc;
		if(Math.abs(this.targetY - this.playerStartOffset_Y) <= Game.EPSILON){
			this.playerStartOffset_Y = this.targetY;
		}
	}*/
	
	var time = Date.now();
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
};

Scene.prototype.checkCollisions = function(){
	for(var i = this.bullets.length-1 ; i >= 0 ; i--){
		var bullet = this.bullets[i];
		for(var j = this.enemies.length-1 ; j >= 0 ; j--){
			var e = this.enemies[j];
			if(this.collide(bullet, e)){	
				this.destroyEntity(bullet, "bullet");
				this.destroyEntity(e, "enemy");
				break;
			}
		}
	}
	/*for(var i = 0;i<this.enemies.length;i++){
	var e = this.enemies[i];
		if(this.isColliding(e, this.player)){				
			//temp
			this.destroyEntityWithDelay(e, "enemy");
			this.destroyEntityWithDelay(this.player, "player");
		}
	}*/
};

/*Scene.prototype.isColliding = function(e1, e2){
	if(this.distanceSquared(e1.x, e1.y, e2.x, e2.y) <= Math.pow(e1.collisionRadius + e2.collisionRadius, 2)){
		//collide
		console.log("collide");
		return true;
	}
	return false;
};*/

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
		g.drawImage(this.background, 0, 0);
		
		for(var i = 0; i<this.entities.length;i++){
			var e = this.entities[i];			
			e.render(g);
		}
		
	g.restore();
};

Scene.prototype.onPlayerMove = function(x, y){
	this.targetX = -x + this.game.canvas.width /2;
	this.targetY = -y + this.game.canvas.height * 0.8;
};

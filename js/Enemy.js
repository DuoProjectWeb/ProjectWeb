var Enemy = function(scene, moveBehaviour){
	Character.call(this, scene, "Enemy", {
		idle : 
		{
			img : "player",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	this.moveBehaviour = moveBehaviour;
	this.scale = -0.2;
	this.speed = 300;
	this.target = scene.player;

	this.boundingVolume = new BoundingSphere(this, this.x, this.y, 20, this.onCollision);
};

Enemy.prototype = new Character();

Enemy.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	this.moveBehaviour(this);
};

Enemy.prototype.onCollision = function(collider) {	
	if(collider.name != "enemy"){		
		this.scene.destroyEntity(this, "enemy");
	}
};

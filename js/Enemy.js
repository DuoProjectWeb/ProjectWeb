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
	this.moveBehaviour(this, tpf);
};

Enemy.prototype.onCollision = function(collider) {	
	if(collider.name !== "Enemy"){
		audioManager.playOneShot("explosion");
		var explosionEmitter = new ParticleEmitter(
			{
				"position" : new Vector2(this.x, this.y),
				"emitterShape" : EmitterShape.Point(VelocityMode.Normal),
				"nbMaxParticles" : 4,
				"nbParticlesPerSec" : 0,
				"minLife" : 0.2,
				"maxLife" : 0.4,
				"loop" : false,
				"size" : new Vector2(0.5, 0.5),
				"sprite" : new Sprite(assetManager.getImage("flame"), 2, 2, false),
				"duration" : 1.0,
				"speed" : 50
			}
		);
		explosionEmitter.influencers.push(new RotationInfluencer(50.0));
		explosionEmitter.influencers.push(new SpriteAnimationInfluencer(SpriteMode.Random, SpriteChangeEvent.EachTime(0.1)));
		explosionEmitter.influencers.push(new SizeInfluencer(new Vector2(0.8, 0.8), new Vector2(0.2, 0.2)));
		explosionEmitter.emitAllParticles();
		ParticleEmitterManager.add(explosionEmitter);
		this.scene.destroy(this);
	}
};

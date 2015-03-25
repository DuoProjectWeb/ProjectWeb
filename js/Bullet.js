var Bullet = function(x, y, owner, collisionCallback){
	
	var self = this;
	this.speed = 200;
	var img = new Image();
	img.src = "img/bullet.png";
	img.addEventListener("load", function(){
		self.sprite = new Sprite(img, 1, 1, false);
	});
	this.x = x;
	this.y = y;
	this.scale = 0.5;
	this.collisionRadius = 13;
	this.boundingVolume = new BoundingSphere(this, this.x, this.y, this.collisionRadius, this.onCollision);
	this.name = "Bullet";
	this.owner = owner;
	this.collisionCallback = collisionCallback;
};

Bullet.prototype = new DrawableControl();

Bullet.prototype.update = function(tpf){
	DrawableControl.prototype.update.call(this, tpf);	
	this.y -= this.speed * tpf;
	this.boundingVolume.setPosition(this.x, this.y);
};

Bullet.prototype.render = function(g){
	DrawableControl.prototype.update.call(this, g);
	if(this.boundingVolume){
		this.boundingVolume.render(g);
	}
	if(this.sprite){
		g.save();				
		g.translate(this.x, this.y);						
		g.scale(this.scale, this.scale);
		g.translate(-this.sprite.spriteWidth * 0.5, -this.sprite.spriteHeight * 0.5);		
		this.sprite.render(g);
		g.restore();
	}	
};

Bullet.prototype.onCollision = function(collider) {
	this.collisionCallback.call(this.owner, collider);
	/*var explosionEmitter = new ParticleEmitter(
		{
			"position" : new Vector2(this.x, this.y),
			"emitterShape" : EmitterShape.Circle({"radius" : this.collisionRadius, "emitFrom" : EmitFrom.Shell}),
			"nbMaxParticles" : 50,
			"nbParticlesPerSec" : 0,
			"minLife" : 0.35,
			"maxLife" : 0.45,
			"speed" : 5.0,
			"loop" : false,
			"size" : new Vector2(3, 3)
		}
	);
	explosionEmitter.influencers.push(new ColorInfluencer(new Color(255, 0, 0, 0.8), new Color(255, 0, 0, 0.1)));	
	explosionEmitter.emitAllParticles();
	ParticleEmitterManager.add(explosionEmitter);*/
	
};
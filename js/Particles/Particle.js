var Particle = function(sprite){
	this.active = false;
	this.color = new Color();
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.rotation = 0;
	this.rotationVelocity = 0;
	this.lifeTime = 0.0;
	this.currentLife = 0.0;
	this.scale = new Vector2(1, 1);
	this.progress = 0.0;
	this.sprite = sprite;
};

Particle.prototype = new DrawableControl();

Particle.prototype.activate = function(lifeTime){
	//console.log("activate particle");
	this.active = true;
	this.lifeTime = lifeTime;
	this.currentLife = this.lifeTime;
	this.position.zero();
	this.color.reset();
	this.rotation = 0.0;
	this.rotationVelocity = 0.0;
	this.scale.set(1, 1);
};

Particle.prototype.update = function(tpf) {
	this.progress = 1 - this.currentLife / this.lifeTime;
	this.position.addVec2Local(this.velocity.multScalar(tpf));
};

Particle.prototype.render = function(g) {
	//console.log("particle render");
	g.fillStyle = this.color.toString();
	g.save();		
		g.translate(this.position.x, this.position.y);
		g.rotate(this.rotation);	
		g.scale(this.scale.x, this.scale.y);			
		if(this.sprite){
			g.translate(-0.5 * this.sprite.spriteWidth, -0.5 * this.sprite.spriteHeight);
			this.sprite.render(g);
		}else{
			g.fillRect(-0.5, -0.5, 1, 1);
		}	
	g.restore();	
};
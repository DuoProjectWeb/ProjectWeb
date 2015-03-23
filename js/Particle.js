var Particle = function(img){
	this.active = false;
	this.color = new Color();
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.rotation = 0;
	this.rotationVelocity = 0;
	this.lifeTime = 0;
	this.currentLife = 0;
	this.speed = 10;
	this.scale = new Vector2(5, 5);
	this.progress = 0;
	if(img){
		this.sprite = new Sprite(img, 2, 2, true);
	}
};

Particle.prototype = new DrawableControl();

Particle.prototype.activate = function(lifeTime){
	//console.log("activate particle");
	this.active = true;
	this.lifeTime = lifeTime;
	this.currentLife = this.lifeTime;
	this.position.zero();
	this.color.reset();
	//temp
	this.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1);
	this.velocity.normalizeLocal();
};

Particle.prototype.update = function(tpf) {
	this.progress = this.currentLife / this.lifeTime;
	var inc = this.velocity.multScalar(this.speed * tpf);
	this.position.addLocal(inc.x, inc.y);
};

Particle.prototype.render = function(g) {
	//console.log("particle render");
	g.fillStyle = this.color.toString();
	if(this.sprite){
		/*g.drawImage(this.img, this.position.x - this.img.width * this.scale.x * 0.5,
			this.position.y - this.img.height * this.scale.y * 0.5,
			this.img.width * this.scale.x,
			this.img.height * this.scale.y);*/
		g.save();
			g.translate(this.position.x, this.position.y);
			g.scale(this.scale.x, this.scale.y);
			this.sprite.render(g);
		g.restore();
	}else{
		g.fillRect(this.position.x - this.scale.x * 0.5, this.position.y - this.scale.y * 0.5, 1 * this.scale.x, 1 * this.scale.y);
	}	
};
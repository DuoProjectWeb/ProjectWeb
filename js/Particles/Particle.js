var Particle = function(img, nbCol, nbRow, spriteLoop){
	this.active = false;
	this.color = new Color();
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.rotation = 0;
	this.rotationVelocity = 0;
	this.lifeTime = 0.0;
	this.currentLife = 0.0;
	this.speed = 0.0;
	this.scale = new Vector2(1, 1);
	this.progress = 0.0;
	if(img){
		this.sprite = new Sprite(img, nbCol, nbRow, spriteLoop);
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
	this.speed = 0.0;
	this.rotation = 0.0;
	this.scale.set(10, 10);
	//temp
	this.velocity.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
	this.velocity.normalizeLocal();
};

Particle.prototype.update = function(tpf) {
	this.progress = 1 - this.currentLife / this.lifeTime;
	var inc = this.velocity.multScalar(tpf);
	this.position.addLocal(inc.x, inc.y);
};

Particle.prototype.render = function(g) {
	//console.log("particle render");
	g.fillStyle = this.color.toString();
	g.save();		
		g.translate(this.position.x, this.position.y);
		g.scale(this.scale.x, this.scale.y);
		g.rotate(this.rotation);		
		if(this.sprite){
			/*g.drawImage(this.img, this.position.x - this.img.width * this.scale.x * 0.5,
				this.position.y - this.img.height * this.scale.y * 0.5,
				this.img.width * this.scale.x,
				this.img.height * this.scale.y);*/
				this.sprite.render(g);
		}else{
			g.fillRect(- this.scale.x * 0.5, - this.scale.y * 0.5, 1, 1);
		}	
	g.restore();	
};
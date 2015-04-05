var Bomb = function(scene, explosionSpeed, duration){
	Bonus.call(this, scene, duration);
	this.scale = 0;
	this.explosionSpeed = explosionSpeed;
	this.boundingVolume = new BoundingSphere(this, 0, 0, 0, this.onCollision);
};

Bomb.prototype = new Bonus();

Bomb.prototype.onCollision = function(collider) {
	/*if(collider.name == "Enemy"){
		this.scene.destroyEntityWithDelay(collider, "enemy", 0.1);
	}*/
};

Bomb.prototype.start = function() {
	Bonus.prototype.start.call(this);
	this.scale = 0;
	this.boundingVolume.radius = this.scale;
	this.boundingVolume.setPosition(this.scene.player.x, this.scene.player.y);
};

Bomb.prototype.update = function(tpf) {
	Bonus.prototype.update.call(this, tpf);
	this.scale += this.explosionSpeed * tpf;
	this.boundingVolume.radius = this.scale;
};

Bomb.prototype.renderIcon = function(g) {
	Bonus.prototype.renderIcon.call(this, g);
	g.fillStyle = "rgba(255, 255, 255, 1.0)";
	g.fillRect(45, -5, 10, 10);
};

Bomb.prototype.render = function(g) {
	Bonus.prototype.render.call(this, g);
	this.boundingVolume.render(g);
	/*g.save();
		g.translate(this.x, this.y);
		g.scale(this.scale, this.scale);
		g.fillStyle = "rgba(0, 254, 220, 0.3)";
		g.strokeStyle = "rgb(0, 254, 220)";
		g.beginPath();
		g.arc(0, 0, this.scale, 0, Math.PI * 2);
		g.fill();	
		g.stroke();		
	g.restore();*/
};
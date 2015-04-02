var Bomb = function(scene, x, y){
	this.scene = scene;
	this.scale = 0;
	this.explosionSpeed = 200;
	this.boundingVolume = new BoundingSphere(this, x, y, 0, this.onCollision);
};

Bomb.prototype = new DrawableControl();

Bomb.prototype.onCollision = function(collider) {
	if(collider.name == "Enemy"){
		this.scene.destroyEntityWithDelay(collider, "enemy", 0.1);
	}
};

Bomb.prototype.update = function(tpf) {
	this.scale += this.explosionSpeed * tpf;
	this.boundingVolume.radius = this.scale;
};

Bomb.prototype.render = function(g) {
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
var Shield = function(scene, size, value, duration){
	Bonus.call(this, scene, duration);
	this.value = value;
	this.boundingVolume = new BoundingSphere(this, 0, 0, size, this.onCollision);
};

Shield.prototype = new Bonus();

Shield.prototype.onCollision = function(collider) {
	if(collider.name != "Player"){
		this.currentValue -= 15;
		if(this.currentValue <= 0){
			this.end();
		}
	}	
};

Shield.prototype.start = function() {
	Bonus.prototype.start.call(this);
	this.currentValue = this.value;
	this.boundingVolume.setPosition(this.scene.player.x, this.scene.player.y);
};

Shield.prototype.update = function(tpf) {
	Bonus.prototype.update.call(this, tpf);
	this.boundingVolume.setPosition(this.scene.player.x, this.scene.player.y);
};

Shield.prototype.renderIcon = function(g) {
	Bonus.prototype.renderIcon.call(this, g);
	g.fillStyle = "rgba(255, 255, 255, 0.3)";
	g.strokeStyle = "rgba(255, 255, 255, 1.0)";
	g.beginPath();
	g.arc(50, 0, 10, 0, Math.PI * 2);
	g.fill();	
	g.stroke();	
};

Shield.prototype.render = function(g) {
	Bonus.prototype.render.call(this, g);
	g.save();
		g.translate(this.scene.player.x, this.scene.player.y);
		g.fillStyle = "rgba(255, 255, 0, 0.3)";
		g.strokeStyle = "rgb(255, 255, 0)";
		g.beginPath();
		g.arc(0, 0, 30, 0, Math.PI * 2);
		g.fill();	
		g.stroke();		
	g.restore();
};
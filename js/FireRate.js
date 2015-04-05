var FireRate = function(scene, value, duration){
	Bonus.call(this, scene, duration);
	this.value = value || 1;
};

FireRate.prototype = new Bonus();

FireRate.prototype.start = function() {
	Bonus.prototype.start.call(this);
	this.scene.player.incFireRate(this.value);
};

FireRate.prototype.renderIcon = function(g) {
	Bonus.prototype.renderIcon.call(this, g);
	g.fillStyle = "rgba(255, 255, 255, 1.0)";
	g.fillRect(45, -5, 1, 10);
};
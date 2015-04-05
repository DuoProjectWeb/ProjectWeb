var Bonus = function(scene, duration, interval){
	this.scene = scene;
	this.duration = duration;
	this.interval = interval || 0.0;
	this.currentTime = 0.0;
};

Bonus.prototype = new DrawableControl();

Bonus.prototype.start = function() {
	this.active = true;
	this.currentTime = 0.0;
	this.scene.addEntity(this);
};

Bonus.prototype.update = function(tpf) {
	if(this.active){
		this.currentTime += tpf;				
		this.checkEnd();
		if(this.interval > 0.0 && this.currentTime >= this.interval){
			this.currentTime = 0.0;
			this.onTick();
		}
	}
};

Bonus.prototype.checkEnd = function() {
	if(this.duration){
		if(this.currentTime >= this.duration){
			this.end();
		}
	}	
};

Bonus.prototype.onTick = function() {
	
};

Bonus.prototype.render = function(g) {
	g.fillText(0, 0, "B");
};

Bonus.prototype.renderIcon = function(g) {
	g.fillStyle = "rgb(0, 200, 255)";
	g.beginPath();
	g.arc(50, 0, 20, 0, Math.PI * 2);
	g.fill();
};

Bonus.prototype.end = function() {
	this.active = false;
	this.scene.destroyEntity(this);
};
var Spawner = function(scene, interval, xMin, xMax, yMin, yMax){
	if(typeof(scene)=="undefined"){
		return;
	}
	this.scene = scene;
	this.xMin = xMin;
	this.xMax = xMax;
	this.yMin = yMin;
	this.yMax = yMax;
	
	this.passedTime = 0;
	this.setInterval(interval);
	spawner = this;
};

Spawner.prototype.setInterval = function(interval){
	this.interval = interval;
}

Spawner.prototype.spawn = function () {
	var enemy = new Enemy(this.scene, MoveBehaviour.Straight);
	enemy.setPosition(Math.random() *(this.xMax - this.xMin) + this.xMin, Math.random()*(this.yMax - this.yMin) + this.yMin);	
	//enemy.moveTo(Math.random() *(this.xMax - this.xMin) + this.xMin, Math.random()*(this.yMax - this.yMin) + this.yMin);		
	this.scene.destroyEntityWithDelay(enemy, "enemy", 10.0);
	this.scene.addEntity(enemy, "enemy");	
	//console.log("ennemy spawned");
};

Spawner.prototype.update = function(tpf){
	this.passedTime += tpf;
	if(this.passedTime >= this.interval){
		this.passedTime = 0;
		this.spawn();
	}
};
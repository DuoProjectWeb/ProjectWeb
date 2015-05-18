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
	if(this.scene.player.respawning){
		return;
	}
	var rand = Math.random();
	var enemy = new Enemy(this.scene, rand > 0.75 ? MoveBehaviour.None : (rand < 0.25 ? MoveBehaviour.Follow : MoveBehaviour.Straight));
	enemy.setPosition(Math.random() *(this.xMax - this.xMin) + this.xMin, Math.random()*(this.yMax - this.yMin) + this.yMin);	
	//enemy.moveTo(Math.random() *(this.xMax - this.xMin) + this.xMin, Math.random()*(this.yMax - this.yMin) + this.yMin);		
	this.scene.destroyWithDelay(enemy, 10.0);
	this.scene.add(enemy);	
	//console.log("ennemy spawned");
};

Spawner.prototype.update = function(tpf){
	this.passedTime += tpf;
	if(this.passedTime >= this.interval){
		this.passedTime = 0;
		this.spawn();
	}
};
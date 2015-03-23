var ParticleEmitterManager = function(){
	this.emitters = [];
};

ParticleEmitterManager.prototype = new DrawableControl();

ParticleEmitterManager.prototype.add = function(emitter) {
	this.emitters.push(emitter);
};

ParticleEmitterManager.prototype.remove = function(emitter) {
	this.emitters.splice(this.emitters.indexOf(emitter), 1);
};

ParticleEmitterManager.prototype.update = function(tpf) {
	for(var i = 0;i<this.emitters.length;i++){
		var emitter = this.emitters[i];
		emitter.update(tpf);
	}
};

ParticleEmitterManager.prototype.render = function(g) {
	for(var i = 0;i<this.emitters.length;i++){
		var emitter = this.emitters[i];
		emitter.render(g);
	}
};
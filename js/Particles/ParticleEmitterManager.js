var ParticleEmitterManager = function(){
	this.emitters = [];
};

ParticleEmitterManager.prototype = new DrawableControl();

ParticleEmitterManager.prototype.add = function(emitter) {
	this.emitters.push(emitter);
	emitter.currentTime = 0.0;
};

ParticleEmitterManager.prototype.remove = function(emitter) {
	this.emitters.splice(this.emitters.indexOf(emitter), 1);
};

ParticleEmitterManager.prototype.update = function(tpf) {
	for(var i = 0;i<this.emitters.length;i++){
		var emitter = this.emitters[i];
		emitter.update(tpf);
		emitter.currentTime += tpf;
		if(emitter.currentTime >= emitter.duration){
			//console.log("emitter end");
			if(emitter.loop){
				//console.log("restart emitter");
				emitter.currentTime = 0.0;
				if(emitter.nbParticlesPerSec <= 0.0){
					emitter.emitAllParticles(true);
				}
			}else{
				//console.log("kill emitter");
				this.remove(emitter);
			}
		}
	}
};

ParticleEmitterManager.prototype.render = function(g) {
	for(var i = 0;i<this.emitters.length;i++){
		var emitter = this.emitters[i];
		emitter.render(g);
	}
};
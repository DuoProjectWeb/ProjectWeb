var ParticleEmitterManager = function(){
	this.canvasStack = [];
	this.emitters = [];
};

ParticleEmitterManager.prototype = new DrawableControl();

ParticleEmitterManager.prototype.add = function(emitter) {
	this.emitters.push(emitter);
	emitter.currentTime = 0.0;
	var layer = Layers.createLayer();
	this.canvasStack.push({
		"emitter" : emitter,
		"layer" : layer
	});
};

ParticleEmitterManager.prototype.remove = function(emitter) {
	var index = this.emitters.indexOf(emitter);
	if(index >= 0){		
		this.emitters.splice(index, 1);
	}
	for (var i = this.canvasStack.length - 1; i >= 0 ; i--) {
		var layer = this.canvasStack[i];
		if(layer.emitter === emitter){
			this.canvasStack.splice(i, 1);
			Layers.destroyLayer(layer.layer);
			break;
		}
	};
};

ParticleEmitterManager.prototype.update = function(tpf) {
	for(var i = 0;i<this.emitters.length;i++){
		var emitter = this.emitters[i];
		emitter.update(tpf);
		emitter.currentTime += tpf;
		if(emitter.currentTime >= emitter.duration){
			if(emitter.loop){
				emitter.currentTime = 0.0;
				if(emitter.nbParticlesPerSec <= 0.0){
					emitter.emitAllParticles(true);
				}
			}else{
				this.remove(emitter);
			}
		}
	}
};

ParticleEmitterManager.prototype.render = function(g) {
	for(var i = 0;i<this.canvasStack.length;i++){
		var layer = this.canvasStack[i];
		layer.emitter.render(g);//layer.layer.getContext("2d"));
	}
};
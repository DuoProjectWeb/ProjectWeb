var ParticleEmitterManager = function(){
	/*this.parentElement = document.getElementById("Canvas");
	this.canvas = [];*/
	this.emitters = [];
};

ParticleEmitterManager.prototype = new DrawableControl();

ParticleEmitterManager.prototype.add = function(emitter) {
	this.emitters.push(emitter);
	emitter.currentTime = 0.0;
	/*var c = document.createElement("Canvas");
	this.parentElement.appendChild(c);
	this.canvas.push({
		"emitter" : emitter,
		"canvas" : c
	});*/
};

ParticleEmitterManager.prototype.remove = function(emitter) {
	this.emitters.splice(this.emitters.indexOf(emitter), 1);
	/*for (var i = this.canvas.length; i >= 0 ; i--) {
		var c = this.canvas[i];
		if(c.emitter === emitter){
			this.canvas.splice(i, 1);
			this.parentElement.removeChild(c.canvas);
			break;
		}
	};*/
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
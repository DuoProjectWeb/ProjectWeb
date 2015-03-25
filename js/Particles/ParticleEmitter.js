var ParticleEmitter = function(params){//vec2, emitterShape, nbMaxParticles, nbParticlesPerSec, minLife, maxLife, sprite){//todo: list aprams for intial default values
	this.particles = [];
	this.duration = params["duration"] || 5.0;
	this.loop = params["loop"];
	if(typeof(this.loop) == 'undefined'){
		this.loop = true;
	}
	console.log(this.loop);
	this.position = params["position"] || new Vector2();
	this.emitterShape = params["emitterShape"] || EmitterShape.Point();
	this.nbMaxParticles = params["nbMaxParticles"] || 50;
	this.nbParticlesPerSec = params["nbParticlesPerSec"] || 0;
	this.minLife = params["minLife"] || 5;
	this.maxLife = params["maxLife"] || 5;
	this.accumulatedTime = 0;
	this.emissionInterval = 1.0 / this.nbParticlesPerSec;
	this.influencers = [];

	//default Params
	this.startScale = params["size"];
	this.startColor = params["color"];
	this.startRotation = params["rotation"];
	this.startRotationVelocity = params["rotationVelocity"];
	this.startSpeed = params["speed"];

	for(var i = 0 ;  i < this.nbMaxParticles;i++){
		this.particles.push(new Particle(params["sprite"]));
	}
};

ParticleEmitter.prototype = new DrawableControl();

ParticleEmitter.prototype.emitAllParticles = function(killBefore){
	if(killBefore){
		this.killAllParticles();
	}
	for(var i = 0; i <this.particles.length;i++){
		var p = this.particles[i];
		this.emitParticle(p);
	}
};

ParticleEmitter.prototype.getActiveParticlesCount = function() {
	var count = 0;
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		if(p.active){
			count ++;
		}
	};
	return count;
};

ParticleEmitter.prototype.setup = function(p) {
	if(this.startSpeed){
		p.velocity.multScalarLocal(this.startSpeed);
	}
	if(this.startScale){
		p.scale.copy(this.startScale);
	}
	if(this.startColor){
		p.color.copy(this.startColor);
	}
	if(this.startRotation){
		p.rotation = this.startRotation;
	}
	if(this.startRotationVelocity){
		p.rotationVelocity = this.startRotationVelocity;
	}
};

ParticleEmitter.prototype.killParticle = function(p) {
	p.active = false;
};

ParticleEmitter.prototype.killAllParticles = function() {
	for(var i = 0 ;i <this.particles.length;i++){
		var p = this.particles[i];
		this.killParticle(p);
	}
};

ParticleEmitter.prototype.emitParticle = function(p){
	p.activate(Math.random() * (this.maxLife - this.minLife) + this.minLife);
	this.emitterShape(p);
	this.setup(p);

	//console.log("emit particle");
	for(var i = 0; i <this.influencers.length;i++){
		var influencer = this.influencers[i];
		influencer.initialize(p);
	}
};

ParticleEmitter.prototype.emitNextparticle = function() {
	for(var i = 0 ;  i < this.particles.length;i++){
		var p = this.particles[i];
		if(!p.active){
			this.emitParticle(p);
			return true;
		}
	}
	return false;
};

ParticleEmitter.prototype.update = function(tpf){
	this.accumulatedTime += tpf;
	var nbParticlesToSpawn = parseInt(this.accumulatedTime / this.emissionInterval);
	this.accumulatedTime -= this.emissionInterval * nbParticlesToSpawn;
	while(nbParticlesToSpawn-- > 0){
		if(!this.emitNextparticle()){
			break;
		}
	}

	for(var i = 0 ;  i < this.particles.length;i++){
		var p = this.particles[i];
		if(p.active){
			p.currentLife -= tpf;
			if(p.currentLife <= 0.0){
				this.killParticle(p);
				//console.log("Particle death");
			}else{				
				for(var j = 0; j <this.influencers.length;j++){
					var influencer = this.influencers[j];
					influencer.influence(p, tpf);
				}
				p.update(tpf);
			}
		}
	}
};

ParticleEmitter.prototype.render = function(g){
	g.save();
		g.translate(this.position.x, this.position.y);
		for(var i = 0 ;  i < this.particles.length;i++){
			var p = this.particles[i];
			if(p.active){
				p.render(g);
			}
		}
	g.restore();
};
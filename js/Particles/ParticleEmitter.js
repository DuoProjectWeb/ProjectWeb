var ParticleEmitter = function(vec2, nbMaxParticles, nbParticlesPerSec, minLife, maxLife, img){
	this.particles = [];
	this.position = vec2;
	this.nbMaxParticles = nbMaxParticles;
	this.nbParticlesPerSec = nbParticlesPerSec;
	this.minLife = minLife;
	this.maxLife = maxLife;
	this.accumulatedTime = 0;
	this.emissionInterval = 1.0 / this.nbParticlesPerSec;
	this.influencers = [];

	for(var i = 0 ;  i < nbMaxParticles;i++){
		this.particles.push(new Particle(img));
	}
};

ParticleEmitter.prototype = new DrawableControl();

ParticleEmitter.prototype.emitAllPArticles = function(){
	for(var i = 0; i <this.particles.length;i++){
		var p = this.particles[i];
		this.emitParticle(p);
	}
};

ParticleEmitter.prototype.emitParticle = function(p){
	p.activate(Math.random() * (this.maxLife - this.minLife) + this.minLife);
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
				p.active = false;
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
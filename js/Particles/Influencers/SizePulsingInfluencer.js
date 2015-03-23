var SizePulsingInfluencer = function(startSize, endSize, nbCycles){
	this.startSize = startSize;
	this.endSize = endSize;
	this.nbCycles = nbCycles || 0;
	this.progressMult = Math.PI * this.nbCycles;
};

SizePulsingInfluencer.prototype = new ParticuleInfluencer();

SizePulsingInfluencer.prototype.initialize = function(p) {
	p.scale.copy(this.startSize);
};

SizePulsingInfluencer.prototype.influence = function(p, tpf) {
	var temp = this.endSize.multScalar((Math.sin(p.progress * this.progressMult) + 1) * 0.5);
	p.scale.set(temp.x + this.startSize.x, temp.y + this.startSize.y);
};
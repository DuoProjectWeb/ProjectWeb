var SizePulsingInfluencer = function(minSize, maxSize, nbCycles){
	this.minSize = minSize;
	this.maxSize = maxSize;
	this.nbCycles = nbCycles || 0;
	this.progressMult = Math.PI * this.nbCycles;
};

SizePulsingInfluencer.prototype = new ParticuleInfluencer();

SizePulsingInfluencer.prototype.initialize = function(p) {
	p.scale.copy(this.minSize);
};

SizePulsingInfluencer.prototype.influence = function(p, tpf) {
	p.scale.copy(this.minSize.addVec2(this.maxSize.substractVec2(this.minSize).multScalarLocal((Math.sin(p.progress * this.progressMult) + 1) * 0.5)));
};
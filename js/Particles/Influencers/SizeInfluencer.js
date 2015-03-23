var SizeInfluencer = function(startSize, endSize){
	this.startSize = startSize;
	this.endSize = endSize;
};

SizeInfluencer.prototype = new ParticuleInfluencer();

SizeInfluencer.prototype.initialize = function(p) {
	p.scale.copy(this.startSize);
};

SizeInfluencer.prototype.influence = function(p, tpf) {
	p.scale.interpolateLocalBetween(this.startSize, this.endSize, p.progress);
};
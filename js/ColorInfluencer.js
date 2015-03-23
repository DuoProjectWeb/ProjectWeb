var ColorInfluencer = function(startColor, endColor){
	this.startColor = startColor;
	this.endColor = endColor;
};

ColorInfluencer.prototype = new ParticuleInfluencer();

ColorInfluencer.prototype.initialize = function(p) {
	p.color.copy(this.startColor);
};

ColorInfluencer.prototype.influence = function(p, tpf) {
	p.color.interpolateLocal(this.startColor, this.endColor, p.progress);
	//console.log(p.color.toString());
};
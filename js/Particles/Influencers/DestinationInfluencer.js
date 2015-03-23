var DestinationInfluencer = function(destinationVec2){
	this.destinationVec2 = destinationVec2;
};

DestinationInfluencer.prototype = new ParticuleInfluencer();

/*DestinationInfluencer.prototype.initialize = function(p) {
};*/

DestinationInfluencer.prototype.influence = function(p, tpf) {
	p.velocity.interpolateLocal(this.destinationVec2.substract(p.position.x, p.position.y), p.progress);
};
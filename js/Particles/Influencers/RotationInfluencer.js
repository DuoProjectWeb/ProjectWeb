var RotationInfluencer = function(rotationVelocity, flipVelocity){
	this.rotationVelocity = rotationVelocity || 0;
	this.rotationVelocity = Utils.toRad(this.rotationVelocity);
	this.flipVelocity = flipVelocity;
};

RotationInfluencer.prototype = new ParticuleInfluencer();

RotationInfluencer.prototype.initialize = function(p) {
	p.rotationVelocity = (this.flipVelocity ? (Math.random() >= 0.5 ? 1 : -1) : 1 ) *  this.rotationVelocity;
};

RotationInfluencer.prototype.influence = function(p, tpf) {
	p.rotation +=  p.rotationVelocity * tpf;
};
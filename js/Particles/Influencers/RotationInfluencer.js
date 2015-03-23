var RotationInfluencer = function(rotationVelocity){
	this.rotationVelocity = rotationVelocity || 0;
	this.rotationVelocity = Utils.toRad(this.rotationVelocity);
};

RotationInfluencer.prototype = new ParticuleInfluencer();

RotationInfluencer.prototype.initialize = function(p) {
};

RotationInfluencer.prototype.influence = function(p, tpf) {
	p.rotation += this.rotationVelocity * tpf;
};
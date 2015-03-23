var SpeedInfluencer = function(startSpeed, endSpeed){
	this.startSpeed = startSpeed;
	this.endSpeed = endSpeed;
};

SpeedInfluencer.prototype = new ParticuleInfluencer();

SpeedInfluencer.prototype.initialize = function(p) {
	p.velocity.normalizeLocal().multScalarLocal(this.startSpeed);
};

SpeedInfluencer.prototype.influence = function(p, tpf) {
	p.velocity.normalizeLocal().multScalarLocal((this.endSpeed - this.startSpeed) * p.progress + this.startSpeed);
};
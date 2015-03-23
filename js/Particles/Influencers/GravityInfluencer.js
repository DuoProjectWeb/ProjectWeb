var GravityInfluencer = function(gravityVec2){
	this.gravity = gravityVec2;
};

GravityInfluencer.prototype = new ParticuleInfluencer();

/*GravityInfluencer.prototype.initialize = function(p) {
};*/

GravityInfluencer.prototype.influence = function(p, tpf) {	
	var inc = this.gravity.multScalar(tpf);
	p.velocity.addLocal(inc.x, inc.y);
};
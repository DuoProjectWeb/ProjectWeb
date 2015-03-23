var ColorInfluencer = function(){

};

ColorInfluencer.prototype = new ParticuleInfluencer();

ColorInfluencer.prototype.initialize = function(p) {
	p.color.reset();
};

ColorInfluencer.prototype.influence = function(p, tpf) {
	//p.color.a -= tpf * 0.005;
};
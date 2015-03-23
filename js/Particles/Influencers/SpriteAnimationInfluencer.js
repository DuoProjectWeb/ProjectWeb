var SpriteAnimationInfluencer = function(spriteMode, endColor){
	this.startColor = startColor;
	this.endColor = endColor;
};

SpriteAnimationInfluencer.prototype = new ParticuleInfluencer();

SpriteAnimationInfluencer.prototype.initialize = function(p) {
};

SpriteAnimationInfluencer.prototype.influence = function(p, tpf) {
};

var SpriteMode = {
	Normal: function(){

	},
	Random: function(){

	},
};
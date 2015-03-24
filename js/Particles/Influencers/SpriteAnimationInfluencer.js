var SpriteAnimationInfluencer = function(spriteMode, spriteChangeEvent){
	this.spriteMode = spriteMode;
};

SpriteAnimationInfluencer.prototype = new ParticuleInfluencer();

SpriteAnimationInfluencer.prototype.initialize = function(p) {
	
};

SpriteAnimationInfluencer.prototype.influence = function(p, tpf) {
};

SpriteAnimationInfluencer.prototype.next = function() {
	switch(this.spriteMode){
		case Normal:

		break;
		case Random:
		
		break;
		default:
	}
};

var SpriteMode = {
	Normal: function(){

	},
	Random: function(){

	}
};

var SpriteChangeEvent = {
	AtCreation: function(){

	},
	EachFrame: function(){

	},
	EachSeconde: function(){

	},
	EachTime: function(interval){
		this.interval = interval;
	}
};
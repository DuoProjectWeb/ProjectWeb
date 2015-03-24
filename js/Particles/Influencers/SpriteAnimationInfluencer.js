var SpriteAnimationInfluencer = function(spriteMode, spriteChangeEvent){
	this.spriteMode = spriteMode;
	this.spriteChangeEvent = spriteChangeEvent;
};

SpriteAnimationInfluencer.prototype = new ParticuleInfluencer();

SpriteAnimationInfluencer.prototype.initialize = function(p) {
	if(p.sprite){
		switch(this.spriteMode){
			case SpriteMode.Normal:
				p.sprite.reset();
			break;
			case SpriteMode.Random:
				p.sprite.randomFrame();
			break;
			default:
				p.sprite.reset();
		}
	}
};

SpriteAnimationInfluencer.prototype.influence = function(p, tpf) {
	if(p.sprite){
		if(this.spriteChangeEvent(tpf)){
			this.next(p);
		}
	}
};

SpriteAnimationInfluencer.prototype.next = function(p) {
	switch(this.spriteMode){
		case SpriteMode.Normal:
			p.sprite.nextFrame();
		break;
		case SpriteMode.Random:
			p.sprite.randomFrame();
		break;
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
		function canEmit(){
			return false;
		}
		return canEmit;
	},
	EachFrame: function(){
		function canEmit(){
			return true;
		}
		return canEmit;
	},
	EachSeconde: function(){
		var accumulatedTime = 0.0;
		function canEmit(tpf){
			accumulatedTime += tpf;
			if(accumulatedTime >= 1.0){
				accumulatedTime = 0.0;
				return true;
			}
			return false;
		}
		return canEmit;
	},
	EachTime: function(interval){
		var updateDelay = interval || 1.0;
		var accumulatedTime = 0.0;
		function canEmit(tpf){
			accumulatedTime += tpf;
			if(accumulatedTime >= updateDelay){
				accumulatedTime = 0.0;
				return true;
			}
			return false;
		}
		return canEmit;
	}
};
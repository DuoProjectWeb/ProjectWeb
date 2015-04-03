var Bonus = function(duration, interval){
	this.duration = duration || 1.0;
	this.interval = interval || 0.0;
	this.currentTime = 0.0;

    /*SpeedBonus: function (entity) {

    },

    FireRate: function (entity) {

    }*/
};

Bonus.prototype = new DrawableControl();

Bonus.prototype.start = function() {
	this.active = true;
	this.currentTime = 0.0;
};

Bonus.prototype.update = function(tpf) {
	if(this.active){
		this.currentTime += tpf;
		if(this.interval > 0.0 && this.currentTime >= this.interval){
			this.currentTime = 0.0;
			this.onTick();
		}
	}
};

Bonus.prototype.onTick = function() {
	
};

Bonus.prototype.render = function(g) {
	
};

Bonus.prototype.end = function() {
	this.active = false;
};
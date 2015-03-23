var Enemy = function(scene){
	Character.call(this, scene, "Enemy", {
		idle : 
		{
			img : "img/player.png",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	this.scale = -0.4;
	this.target = scene.player;
};

Enemy.prototype = new Character();

Enemy.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	
	if(this.target){
		this.moveTo(this.target.x, this.target.y);
	}
};

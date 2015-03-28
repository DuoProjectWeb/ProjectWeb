var Enemy = function(scene, moveBehaviour){
	Character.call(this, scene, "Enemy", {
		idle : 
		{
			img : "player",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	this.moveBehaviour = moveBehaviour;
	this.scale = -0.4;
	this.target = scene.player;
};

Enemy.prototype = new Character();

Enemy.prototype.update = function(tpf){
	Character.prototype.update.call(this, tpf);
	this.moveBehaviour(this);
};

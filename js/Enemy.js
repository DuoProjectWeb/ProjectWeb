var Enemy = function(scene){
	Character.call(this, scene, "Enemy", {
		idle : 
		{
			img : "img/player.jpg",
			nbCol : 1,
			nbRow : 1,
			loop : false
		}
	});
	this.scale = -0.4;
};

Enemy.prototype = new Character();

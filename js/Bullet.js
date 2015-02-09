var Bullet = function(x, y){
	
	var self = this;
	this.speed = 200/1000;
	var img = new Image();
	img.src = "img/bullet.jpg";
	img.addEventListener("load", function(){
		self.sprite = new Sprite(img, 1, 1, false);
	});
	this.x = x;
	this.y = y;
	this.scale = 0.5;
	this.collisionRadius = 25;
};

Bullet.prototype = new DrawableControl();

Bullet.prototype.update = function(tpf){
	DrawableControl.prototype.update.call(this, tpf);
	this.y -= this.speed * tpf;
};

Bullet.prototype.render = function(g){
	DrawableControl.prototype.update.call(this, g);
	if(this.sprite){
		g.save();		
			g.translate(this.x, this.y);		
			g.scale(this.scale, this.scale);
			g.translate(-this.sprite.spriteWidth * 0.5, 0);		
			this.sprite.render(g);
		g.restore();
	}
	
};
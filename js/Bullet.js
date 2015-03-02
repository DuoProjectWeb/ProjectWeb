var Bullet = function(x, y){
	
	var self = this;
	this.speed = 200/1000;
	var img = new Image();
	img.src = "img/bullet.png";
	img.addEventListener("load", function(){
		self.sprite = new Sprite(img, 1, 1, false);
	});
	this.x = x;
	this.y = y;
	this.scale = 0.5;
	this.collisionRadius = 13;
	this.boundingVolume = new BoundingSphere(this.x, this.y, this.collisionRadius);
	this.name = "Bullet";
};

Bullet.prototype = new DrawableControl();

Bullet.prototype.update = function(tpf){
	DrawableControl.prototype.update.call(this, tpf);	
	this.y -= this.speed * tpf;
	this.boundingVolume.setPosition(this.x, this.y);
};

Bullet.prototype.render = function(g){
	DrawableControl.prototype.update.call(this, g);
	if(this.boundingVolume){
		this.boundingVolume.render(g);
	}
	if(this.sprite){
		g.save();				
		g.translate(this.x, this.y);						
		g.scale(this.scale, this.scale);
		g.translate(-this.sprite.spriteWidth * 0.5, -this.sprite.spriteHeight * 0.5);		
		this.sprite.render(g);
		g.restore();
	}
	
};
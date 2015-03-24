var Sprite = function(img, nbCol, nbRow, loop){
	this.img = img;
	this.nbCol = nbCol;
	this.nbRow = nbRow;
	if(loop){
		this.loop = loop ;
	}else{
		this.loop = false;
	}
	this.frameCount = this.nbCol * this.nbRow;
	this.spriteWidth = this.img.width/this.nbCol;
	this.spriteHeight = this.img.height/this.nbRow;
	this.currentFrame = 0;
	this.currentCol = 0;
	this.currentRow = 0;
};

Sprite.prototype = new Drawable();

Sprite.prototype.nextFrame = function() {
	this.currentFrame++;
	this.clampFrame();
	this.updateGridPosition();
};

Sprite.prototype.previousFrame = function() {
	this.currentFrame--;
	this.clampFrame();
	this.updateGridPosition();
};

Sprite.prototype.clampFrame = function() {
	if(this.currentFrame >= this.frameCount){
		this.currentFrame = this.loop ? this.currentFrame % this.frameCount : this.frameCount - 1;
	}else if(this.currentFrame < 0){
		this.currentFrame = this.loop ? this.frameCount - 1 : 0;
	}
};

Sprite.prototype.reset = function() {
	this.currentFrame = 0;
	this.currentRow = 0;
	this.currentCol = 0;
};

Sprite.prototype.randomFrame = function() {
	this.currentFrame = Math.floor(Math.random() * this.frameCount);
	this.updateGridPosition();
};

Sprite.prototype.updateGridPosition = function() {
	this.currentRow = Math.floor(this.currentFrame / this.nbCol);
	this.currentCol = Math.floor(this.currentFrame - (this.nbCol * this.currentRow));
};

Sprite.prototype.render = function(g){
	g.drawImage(this.img, 
		this.currentCol * this.spriteWidth, this.currentRow * this.spriteHeight, this.spriteWidth, this.spriteHeight,
		0, 0, this.spriteWidth, this.spriteHeight);
};


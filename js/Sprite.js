var Sprite = function(img, nbCol, nbRow, loop){
	this.img = img;
	this.nbCol = nbCol;
	this.nbRow = nbRow;
	this.loop = loop;
	this.frameCount = this.nbCol * this.nbRow;
	this.spriteWidth = this.img.width/this.nbCol;
	this.spriteHeight = this.img.height/this.nbRow;
	this.setFrameRate(16);
	this.currentFrame = 0;
	this.lastFrameUpdate = 0;
};

Sprite.prototype = new Drawable();

Sprite.prototype.setFrameRate = function(fps){
	this.frameRate = fps;
	this.frameDuration = 1 / this.frameRate * 1000;
};

Sprite.prototype.render = function(g){

	var passedTime = g.time.localTime - this.lastFrameUpdate;
	if(passedTime >= this.frameDuration){
		this.lastFrameUpdate = g.time.localTime;
		var nbPassedFrames = Math.floor(passedTime / this.frameDuration);
		this.currentFrame = (this.currentFrame + nbPassedFrames) % this.frameCount;
	}
	
	this.row = Math.floor(this.currentFrame / this.nbCol);
	this.col = Math.floor(this.currentFrame - (this.nbCol * this.row));
	this.row *= this.spriteHeight;
	this.col *= this.spriteWidth;
	g.drawImage(this.img, 
		this.col, this.row, this.spriteWidth, this.spriteHeight,
		0, 0, this.spriteWidth, this.spriteHeight);
};


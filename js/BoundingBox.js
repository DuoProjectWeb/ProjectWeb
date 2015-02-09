var BoundingBox = function(x, y, width, height){
	BoundingVolume.call(this, x, y);
	this.width = width;
	this.height = height;
};

BoundingBox.prototype = new BoundingVolume();

BoundingBox.prototype.render = function(g){
	g.save();
		g.translate(this.x, this.y);
		g.fillStyle = "rgba(0, 254, 220, 0.3";
		g.strokeStyle = "rgb(0, 254, 220)";
		g.fillRect(0, 0, this.width, this.height);	
		g.strokeRect(0, 0, this.width, this.height);
	g.restore();
};


BoundingBox.prototype.intersectsWithBoundingSphere = function(boundingSphere){

};

BoundingBox.prototype.intersectsWithBoundingBox = function(boundingBox){//wrong
	return this.y + this.height > boundingBox.y + boundingBox.height ||
		   this.y - this.height < boundingBox.y - boundingBox.height ||
		   this.x - this.width < boundingBox.x + boundingBox.width ||
		   this.x + this.width > boundingBox.x - boundingBox.width;
};
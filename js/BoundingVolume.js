var BoundingVolume = function(x, y){
	this.x = x;
	this.y = y;
};

BoundingVolume.prototype = new Drawable();

BoundingVolume.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

BoundingVolume.prototype.render = function(g){
};

BoundingVolume.prototype.intersects = function(boundingVolume){
	if(boundingVolume instanceof BoundingBox){
		return this.intersectsWithBoundingBox(boundingVolume);
	}else if(boundingVolume instanceof BoundingSphere){
		return this.intersectsWithBoundingSphere(boundingVolume);
	}else{
		return false;
	}
};

BoundingVolume.prototype.intersectsWithBoundingSphere = function(boundingSphere){

};

BoundingVolume.prototype.intersectsWithBoundingBox = function(boundingBox){

};


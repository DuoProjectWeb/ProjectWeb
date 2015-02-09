var BoundingVolume = function(x, y){
	this.x = x;
	this.y = y;
};

BoundingVolume.prototype = new Drawable();

BoundingVolume.prototype.render = function(g){

};

BoundingVolume.prototype.intersects = function(boundingVolume){
	if(boundingVolume instanceof BoundingBox){
		return this.intersectWithBoundingBox(boundingVolume);
	}else if(boundingVolume instanceof BoundingSphere){
		return this.intersectWithBoundingSphere(boundingVolume);
	}else{
		return false;
	}
};

BoundingVolume.prototype.intersectsWithBoundingSphere = function(boundingSphere){

};

BoundingVolume.prototype.intersectsWithBoundingBox = function(boundingBox){

};


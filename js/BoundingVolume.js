var BoundingVolume = function(x, y){
	this.x = x;
	this.y = y;
};

BoundingVolume.prototype = new Drawable();

BoundingVolume.prototype.render = function(g){

};

BoundingVolume.prototype.intersects = function(boundingVolume){
    if (boundingVolume instanceof BoundingBox) {
        console.log("box");
	    return this.intersectWithBoundingBox(boundingVolume);

	} else if (boundingVolume instanceof BoundingSphere) {
	    console.log("sphere");
	    return this.intersectWithBoundingSphere(boundingVolume);
	} else {
	    console.log("false");
		return false;
	}
};

BoundingVolume.prototype.intersectsWithBoundingSphere = function(boundingSphere){

};

BoundingVolume.prototype.intersectsWithBoundingBox = function(boundingBox){

};


var BoundingVolume = function(owner, x, y, callback){
	this.owner = owner;
	this.x = x;
	this.y = y;
	this.callback = callback;
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
		if(this.intersectsWithBoundingBox(boundingVolume)){
			this.onCollision(boundingVolume.owner);
			boundingVolume.onCollision(this.owner);
			return true;
		}
	}else if(boundingVolume instanceof BoundingSphere){
		if(this.intersectsWithBoundingSphere(boundingVolume)){
			this.onCollision(boundingVolume.owner);
			boundingVolume.onCollision(this.owner);
			return true;
		}
	}else{
		return false;
	}
};

BoundingVolume.prototype.onCollision = function(collider){
	if(this.callback){
		this.callback.call(this.owner, collider);
	}
}

BoundingVolume.prototype.intersectsWithBoundingSphere = function(boundingSphere){

};

BoundingVolume.prototype.intersectsWithBoundingBox = function(boundingBox){

};


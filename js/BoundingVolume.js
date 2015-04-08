var BoundingVolume = function(owner, x, y, callback){
	this.owner = owner;
	this.x = x;
	this.y = y;
	this.callback = callback;
	this.layer = 0;
	this.ignoredLayers = [];
};

BoundingVolume.prototype = new Drawable();

BoundingVolume.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

BoundingVolume.prototype.setLayer = function(layer) {
	if(typeof(layer) === 'number'){
		this.layer = layer;
	}
};

BoundingVolume.prototype.addIgnoredLayer = function(id) {
	this.ignoredLayers.push(id);
};

BoundingVolume.prototype.removeIgnoredLayer = function(id) {
	this.ignoredLayers.splice(this.ignoredLayers.indexOf(id), 1);
};

BoundingVolume.prototype.clearIgnoredLayers = function() {
	this.ignoredLayers.clear();
};

BoundingVolume.prototype.render = function(g){
};

BoundingVolume.prototype.intersects = function(boundingVolume){
	if(this.ignoredLayers.indexOf(boundingVolume.layer) >= 0 || boundingVolume.ignoredLayers.indexOf(this.layer) >= 0){
		return false;
	}
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


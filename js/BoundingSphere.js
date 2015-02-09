var BoundingSphere = function(x, y, radius){
	BoundingVolume.call(this, x, y);
	this.radius = radius;
};

BoundingSphere.prototype = new BoundingVolume();

BoundingSphere.prototype.render = function(g){
	g.fillStyle = "rgba(0, 254, 220, 0.3";
	g.strokeStyle = "rgb(0, 254, 220)";
	g.beginPath();
	g.arc(0, 0, this.radius, 0, Math.PI * 2);
	g.fill();	
	g.stroke();
};


BoundingSphere.prototype.intersectsWithBoundingSphere = function(boundingSphere){
	return Utils.distanceSquared(this.x, this.y, boundingSphere.x, boundingSphere.y) <= Math.pow(this.radius + boundingSphere.radius, 2);
};

BoundingSphere.prototype.intersectsWithBoundingBox = function(boundingBox){
	//return this.x + this.radius > boundingBox.x - boundingBox.width || this.x - this.radius > boundingBox.x + boundingBox.width)
};

		
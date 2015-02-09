var BoundingSphere = function(x, y, radius){
	BoundingVolume.call(this, x, y);
	this.radius = radius;
	this.currentRadius = -1;
};

BoundingSphere.prototype = new BoundingVolume();

BoundingSphere.prototype.render = function(g){
	if(this.currentRadius > this.radius){
		this.currentRadius = 0;
	}else{
		this.currentRadius +=1;
	}
	g.save();
		g.translate(this.x, this.y);
		g.fillStyle = "rgba(0, 254, 220, 0.3";
		g.strokeStyle = "rgb(0, 254, 220)";
		g.beginPath();
		g.arc(0, 0, this.radius, 0, Math.PI * 2);
		g.fill();	
		g.stroke();
		g.beginPath();
		g.arc(0, 0, this.currentRadius, 0, Math.PI * 2);
		g.fill();		
	g.restore();
};


BoundingSphere.prototype.intersectsWithBoundingSphere = function(boundingSphere){
	return Utils.distanceSquared(this.x, this.y, boundingSphere.x, boundingSphere.y) <= Math.pow(this.radius + boundingSphere.radius, 2);
};

BoundingSphere.prototype.intersectsWithBoundingBox = function(boundingBox){
	//return this.x + this.radius > boundingBox.x - boundingBox.width || this.x - this.radius > boundingBox.x + boundingBox.width)
};

		
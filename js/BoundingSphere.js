var BoundingSphere = function(owner, x, y, radius, callback){
	BoundingVolume.call(this, owner, x, y, callback);
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
		g.fillStyle = "rgba(0, 254, 220, 0.3)";
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
	var top = boundingBox.y - boundingBox.height * 0.5;
	var bottom = boundingBox.y + boundingBox.height * 0.5;
	var left = boundingBox.x - boundingBox.width * 0.5;
	var right = boundingBox.x + boundingBox.height * 0.5;

	if(this.x <= right
		&& this.x >= left
		&& this.y <= bottom
		&& this.y >= top){
		return true;
	}
	
	if(Utils.distanceSquared(this.x, this.y, left, top) <= this.radius * this.radius
		|| Utils.distanceSquared(this.x, this.y, left, bottom) <= this.radius * this.radius
		|| Utils.distanceSquared(this.x, this.y, right, top) <= this.radius * this.radius
		|| Utils.distanceSquared(this.x, this.y, right, bottom) <= this.radius * this.radius){
		return true;
	}
	return false;
};

		
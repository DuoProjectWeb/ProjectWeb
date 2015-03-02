var BoundingBox = function(x, y, width, height){
	BoundingVolume.call(this, x, y);
	this.width = width;
	this.height = height;
	this.progress = -1;
};

BoundingBox.prototype = new BoundingVolume();

BoundingBox.prototype.render = function(g){
	if(this.progress > 100){
		this.progress = 0;
	}else{
		this.progress +=1;
	}
	g.save();
		g.translate(this.x - this.width * 0.5, this.y - this.height * 0.5);
		g.fillStyle = "rgba(0, 254, 220, 0.3";
		g.strokeStyle = "rgb(0, 254, 220)";
		var xProgress = this.progress * this.width / 100;
		var yProgress = this.progress * this.height / 100;
		g.fillRect((this.width - xProgress) * 0.5, 
			(this.height - yProgress) * 0.5, 
			xProgress, 
			yProgress);	
		g.strokeRect(0, 0, this.width, this.height);
	g.restore();
};


BoundingBox.prototype.intersectsWithBoundingSphere = function(boundingSphere){
	var top = this.y - this.height * 0.5;
	var bottom = this.y + this.height * 0.5;
	var left = this.x - this.width * 0.5;
	var right = this.x + this.height * 0.5;

	if(boundingSphere.x <= right
		&& boundingSphere.x >= left
		&& boundingSphere.y <= bottom
		&& boundingSphere.y >= top){
		return true;
	}
	
	if(Utils.distanceSquared(boundingSphere.x, boundingSphere.y, left, top) <= boundingSphere.radius * boundingSphere.radius
		|| Utils.distanceSquared(boundingSphere.x, boundingSphere.y, left, bottom) <= boundingSphere.radius * boundingSphere.radius
		|| Utils.distanceSquared(boundingSphere.x, boundingSphere.y, right, top) <= boundingSphere.radius * boundingSphere.radius
		|| Utils.distanceSquared(boundingSphere.x, boundingSphere.y, right, bottom) <= boundingSphere.radius * boundingSphere.radius){
		return true;
	}
	return false;
};

BoundingBox.prototype.intersectsWithBoundingBox = function(boundingBox){//wrong
	return this.y + this.height > boundingBox.y + boundingBox.height ||
		   this.y - this.height < boundingBox.y - boundingBox.height ||
		   this.x - this.width < boundingBox.x + boundingBox.width ||
		   this.x + this.width > boundingBox.x - boundingBox.width;
};
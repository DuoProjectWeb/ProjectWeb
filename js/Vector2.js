var Vector2 = function(x, y){
	this.set(x, y);
};

Vector2.prototype.set = function(x, y) {
	if(typeof(x) == "number"){
		this.x = x;
	}else{
		this.x = 0.0;
	}
	if(typeof(y) == "number"){
		this.y = y;
	}else{
		this.y = 0.0;
	}
};

Vector2.prototype.copy = function(vec2) {
	this.x = vec2.x;
	this.y = vec2.y;
};

Vector2.prototype.zero = function() {
	this.x = 0.0;
	this.y = 0.0;
};

Vector2.prototype.add = function(x, y){
	return new Vector2(this.x + x, this.y + y);
};

Vector2.prototype.addVec2 = function(vec2){
	return this.add(vec2.x, vec2.y);
};

Vector2.prototype.addLocal = function(x, y){
	this.x+=x;
	this.y+=y;
	return this;
};

Vector2.prototype.addVec2Local = function(vec2){
	this.x += vec2.x;
	this.y += vec2.y;
	return this;
};

Vector2.prototype.substract = function(x, y){
	return new Vector2(this.x - x, this.y - y);
};

Vector2.prototype.substractVec2 = function(vec2){
	return new Vector2(this.x - vec2.x, this.y - vec2.y);
};

Vector2.prototype.substractLocal = function(x, y){
	this.x -= x;
	this.y -= y;
	return this;
};

Vector2.prototype.substractVec2Local = function(vec2){
	this.x -= vec2.x;
	this.y -= vec2.y;
	return this;
};

Vector2.prototype.mult = function(x, y){
	return new Vector2(this.x * x, this.y * y);
};

Vector2.prototype.multVec2 = function(vec2){
	return new Vector2(this.x * vec2.x, this.y * vec2.y);
};

Vector2.prototype.multLocal = function(x, y){
	this.x *= x;
	this.y *= y;
	return this;
};

Vector2.prototype.multVec2Local = function(vec2){
	this.x *= vec2.x;
	this.y *= vec2.y;
	return this;
};

Vector2.prototype.multScalar = function(scalar){
	return new Vector2(this.x * scalar, this.y * scalar);
};

Vector2.prototype.multScalarLocal = function(scalar){
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

Vector2.prototype.divide = function(x, y){
	return new Vector2(this.x / x, this.y / y);
};

Vector2.prototype.divideVec2 = function(vec2){
	return new Vector2(this.x / vec2.x, this.y / vec2.y);
};

Vector2.prototype.divideLocal = function(x, y){
	this.x /= x;
	this.y /= y;
	return this;
};

Vector2.prototype.divideVec2Local = function(vec2){
	this.x /= vec2.x;
	this.y /= vec2.y;
	return this;
};

Vector2.prototype.divideScalar = function(scalar){
	return new Vector2(this.x / scalar, this.y / scalar);
};

Vector2.prototype.divideScalarLocal = function(scalar){
	this.x /= scalar;
	this.y /= scalar;
	return this;
};

Vector2.prototype.length = function(){
	return Math.sqrt(this.lengthSquared());
};

Vector2.prototype.lengthSquared = function(){
	return this.x * this.x + this.y * this.y;
};

Vector2.prototype.normalize = function() {
	var length = this.length();
	return new Vector2(this.x / length, this.y / length);
};

Vector2.prototype.normalizeLocal = function() {
	var length = this.length();
	this.x /= length;
	this.y /= length;
	return this;
};

Vector2.prototype.distance = function(vec2){
	return Math.sqrt(this.distanceSquared(vec2));
};

Vector2.prototype.distanceSquared = function(vec2){
	return Math.pow(vec2.x - this.x, 2) + Math.pow(vec2.y - this.y, 2);
};

Vector2.prototype.interpolateLocalBetween = function(startVec2, endVec2, progress) {
	this.x = (endVec2.x - startVec2.x) * progress + startVec2.x;
	this.y = (endVec2.y - startVec2.y) * progress + startVec2.y;
};

/*Vector2.prototype.interpolateLocal = function(endVec2, progress) {
	this.interpolateLocalBetween(this, endVec2, progress);
};*/
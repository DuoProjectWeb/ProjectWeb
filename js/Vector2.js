var Vector2 = function(x, y){
	if(typeof(x) == "number"){
		this.x = x;
	}else{
		this.x = 0;
	}
	if(typeof(y) == "number"){
		this.y = y;
	}else{
		this.y = 0;
	}
};

Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
};

Vector2.prototype.copy = function(vec2) {
	this.x = vec2.x;
	this.y = vec2.y;
};

Vector2.prototype.zero = function() {
	this.x = 0;
	this.y = 0;
};

Vector2.prototype.add = function(x, y){
	return new Vector2(this.x + x, this.y + y);
};

Vector2.prototype.addLocal = function(x, y){
	this.x += x;
	this.y += y;
	return this;
};

Vector2.prototype.substract = function(x, y){
	return new Vector2(this.x - x, this.y - y);
};

Vector2.prototype.substractLocal = function(x, y){
	this.x -= x;
	this.y -= y;
	return this;
};

Vector2.prototype.mult = function(x, y){
	return new Vector2(this.x * x, this.y * y);
};

Vector2.prototype.multLocal = function(x, y){
	this.x *= x;
	this.y *= y;
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

Vector2.prototype.divideLocal = function(x, y){
	this.x /= x;
	this.y /= y;
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
	length = this.length();
	return new Vector2(this.x / length, this.y / length);
};

Vector2.prototype.normalizeLocal = function() {
	length = this.length();
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
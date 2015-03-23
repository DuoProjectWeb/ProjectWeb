var Color = function(r, g, b, a){
	this.set(r, g, b, a);
};

Color.prototype.set = function(r, g, b, a) {
	if(typeof(r) == "number"){
		this.r = r;
	}else{
		this.r = 0;
	}
	if(typeof(g) == "number"){
		this.g = g;
	}else{
		this.g = 0;
	}
	if(typeof(b) == "number"){
		this.b = b;
	}else{
		this.b = 0;
	}
	if(typeof(a) == "number"){
		this.a = a;
	}else{
		this.a = 1.0;
	}
	return this;
};

Color.prototype.reset = function() {
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1.0;
	return this;
};

Color.prototype.copy = function(c) {
	this.set(c.r, c.g, c.b, c.a);
};

Color.prototype.toString = function() {
	return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
};

Color.prototype.interpolateLocal = function(startColor, endColor, progress){
	this.r = (endColor.r - startColor.r) * progress + startColor.r;
	this.g = (endColor.g - startColor.g) * progress + startColor.g;
	this.b = (endColor.b - startColor.b) * progress + startColor.b;
	this.a = (endColor.a - startColor.a) * progress + startColor.a;
	/*this.r = (1 - progress) * startColor.r + progress + endColor.r;
	this.g = (1 - progress) * startColor.g + progress + endColor.g;
	this.b = (1 - progress) * startColor.b + progress + endColor.b;
	this.a = (1 - progress) * startColor.a + progress + endColor.a;*/
};
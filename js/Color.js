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

Color.prototype.toString = function() {
	return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
};
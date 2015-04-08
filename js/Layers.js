var Layers = function(){
	this.layers = [];
};

Layers.prototype.createLayer = function() {
	var canvas = document.createElement("Canvas");
	this.layers.push(canvas);
	return canvas;
};

Layers.prototype.destroyLayer = function(layer) {
	this.layers.splice(this.layers.indexOf(layer), 1);
};
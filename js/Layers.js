var Layers = function(){
	this.autoId = 0;
	this.defaultCanvas = null;
	this.container = null;
	this.canvases = [];
};

Layers.prototype.initialize = function(parent) {
	this.container = parent;
	this.defaultCanvas = document.createElement("Canvas");
	this.defaultCanvas.style.position = "absolute";
	this.defaultCanvas.width = document.body.clientWidth;
	this.defaultCanvas.height = document.body.clientHeight;
	this.defaultCanvas.style.zIndex = 0;
	this.container.appendChild(this.defaultCanvas);	
	return this.defaultCanvas;
};

Layers.prototype.createLayer = function(zOrder, name) {
	var canvas = document.createElement("Canvas");
	canvas.style.position = "absolute";
	canvas.style.pointerEvents = "none";
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvas.style.zIndex = zOrder || 0;
	this.container.appendChild(canvas);
	this.canvases.push({
		"name" : name || this.autoId++,
		"canvas" : canvas,
		"zOrder" : zOrder || 0
	});
	return canvas;
};

Layers.prototype.destroyLayer = function(layer) {
	this.canvases.splice(this.canvases.indexOf(layer), 1);
	this.container.removeChild(layer);
};

Layers.prototype.getLayer = function(id) {
	for (var i = 0; i < this.canvases.length; i++) {
		var c = this.canvases[i];
		if(c.name == id){
			return c.canvas;
		}
	}
	return this.defaultCanvas;
};

Layers.prototype.getGraphics = function(id) {
	return this.getLayer(id).getContext("2d");
};
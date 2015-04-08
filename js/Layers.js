var Layers = function(){
	this.defaultCanvas = null;
	this.container = null;
	this.canvases = [];
};

Layers.prototype.initialize = function(parent) {
	this.container = parent;
	this.defaultCanvas = document.createElement("Canvas");
	this.defaultCanvas.style.position = "absolute";
	this.defaultCanvas.width = Game.WIDTH;
	this.defaultCanvas.height = Game.HEIGHT;
	this.container.appendChild(this.defaultCanvas);	
	return this.defaultCanvas;
};

Layers.prototype.createLayer = function() {
	var canvas = document.createElement("Canvas");
	canvas.style.position = "absolute";
	canvas.style.pointerEvents = "none";
	canvas.width = Game.WIDTH;
	canvas.height = Game.HEIGHT;
	this.container.appendChild(canvas);
	this.canvases.push(canvas);
	return canvas;
};

Layers.prototype.destroyLayer = function(layer) {
	this.canvases.splice(this.canvases.indexOf(layer), 1);
	this.container.removeChild(layer);
};

Layers.prototype.getLayer = function(id) {
	return this.canvases[id];
};

Layers.prototype.getGraphics = function(id) {
	return this.getLayer(id).getContext("2d");
};
var DrawableControl = function(){
	Drawable.call(this);
};

DrawableControl.prototype = new Drawable();

DrawableControl.prototype.update = function(tpf){
};

DrawableControl.prototype.render = function(g){
	Drawable.prototype.render.call(this, g);
};

var Utils = function(){

};

Utils.distanceSquared = function(x1, y1, x2, y2){
	return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
};

Utils.distance = function(x1, y1, x2, y2){
	return Math.sqrt(Utils.distanceSquared(x1, y1, x2, y2));
};

Utils.clamp = function(value, min, max) {
	return Math.max(Math.min(value, max), min);
};

Utils.toDegree = function(inRad){
	return inRad * 180 / Math.PI; 
};

Utils.toRad = function(inDeg){
	return inDeg * Math.PI / 180;
};
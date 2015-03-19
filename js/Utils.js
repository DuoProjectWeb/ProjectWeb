Utils.distanceSquared = function (x1, y1, x2, y2) {
	return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
};

Utils.distance = function(x1, y1, x2, y2){
	return Math.sqrt(Utils.distanceSquared(x1, y1, x2, y2));
};
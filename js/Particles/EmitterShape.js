var EmitterShape = {
	Point : function(){

		function getEmissionPoint(){
			return new Vector2();
		}
		return getEmissionPoint;
	},
	Box : function(width, height) {
		var w = width || 20;
		var h = height || 20;

		function getEmissionPoint(){
			return  new Vector2(Math.random() * w - w * 0.5, Math.random() * h - h * 0.5);
		}
		return getEmissionPoint;
	},
	Circle : function(radius){
		var r = radius || 20;

		function getEmissionPoint(){
			return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalizeLocal().multScalarLocal(r);
		}
		return getEmissionPoint;
	}
};

var EmitterShape = {
	Point : function(){

		function setup(p){
			p.position.zero();
			p.velocity.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
			p.velocity.normalizeLocal();
		}
		return setup;
	},
	Box : function(params){//width, height, emitFrom, velocityMode) {
		var width = params["width"] || 20;
		var height = params["height"] || 20;
		var velocityMode = params["velocityMode"] || VelocityMode.Normal;
		var emitFrom = params["emitFrom"] || EmitFrom.Volume;

		function setup(p){
			switch(emitFrom){
				case EmitFrom.Center:
					p.position.zero();
					break;
				case EmitFrom.Volume:
					p.position.set(Math.random() * width - width * 0.5, Math.random() * height - height * 0.5);
					break;
				case EmitFrom.Shell:
					var rand = Math.random();
					p.position.set(
						rand >= 0.5 ? width * (Math.random() >= 0.5 ? 0 : 1) - width * 0.5 : Math.random() * width - width * 0.5,
						rand < 0.5 ? height * (Math.random() >= 0.5 ? 0 : 1) - height * 0.5 : Math.random() * height - height * 0.5
						);
					break;
			}
			switch(velocityMode){
				case VelocityMode.Normal:
					p.velocity.copy(p.position.normalize());
					break;
				case VelocityMode.Random:
					p.velocity.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
					p.velocity.normalizeLocal();
					break;
			}
		}
		return setup;
	},
	Circle : function(params){//radius, emitFrom, velocityMode){
		var radius = params["radius"] || 20;
		var velocityMode = params["velocityMode"] || VelocityMode.Normal;
		var emitFrom = params["emitFrom"] || EmitFrom.Volume;

		function setup(p){
			switch(emitFrom){
				case EmitFrom.Center:
					p.position.zero();
					break;
				case EmitFrom.Volume:
					p.position.copy(new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalizeLocal().multScalarLocal(Math.random() * radius));
					break;
				case EmitFrom.Shell:
					p.position.copy(new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalizeLocal().multScalarLocal(radius));
					break;
			}
			switch(velocityMode){
				case VelocityMode.Normal:
					p.velocity.copy(p.position.normalize());
					break;
				case VelocityMode.Random:
					p.velocity.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
					p.velocity.normalizeLocal();
				break;
			}
		}
		return setup;
	}
};

var VelocityMode = {
	Normal : function(){

	},
	Random : function(){

	}
};

var EmitFrom = {
	Center : function(){

	},
	Shell : function(){

	},
	Volume : function(){

	}
};

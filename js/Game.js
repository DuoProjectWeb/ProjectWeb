var Game = function(){
	var self = this;
	this.canvas = document.getElementById("Canvas");
	this.graphics = this.canvas.getContext("2d");
	this.canvas.width = Game.WIDTH;
	this.canvas.height = Game.HEIGHT;
	
	var g = this.graphics;
	/*g.fillStyle = "red";
	g.fillRect(0, 0, this.canvas.width, this.canvas.height);*/

	this.fps = 0;
	this.frameCount = 0;
	this.fpsTimer= 0.0;
	
	this.time = {
		globalDeltaTime : 0,
		globalTime : Date.now(),
		localTime : 0,
		deltaTime : 0
	};
	
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;
	this.graphics.time = this.time;
	
	this.scene = new Scene(this);
		
	requestAnimationFrame(function loop(){
		self.mainLoop();
		requestAnimationFrame(loop);
	});
};

Game.prototype = new DrawableControl();

Game.WIDTH = 400;
Game.HEIGHT = 800;
Game.EPSILON = 1;

Game.prototype.mainLoop = function(){
	var now = Date.now();
	this.time.globalDeltaTime = now - this.time.globalTime;
	this.time.globalTime = now;

	this.time.deltaTime = Math.min(50, this.time.globalDeltaTime);
	this.time.localTime += this.time.deltaTime;
	
	this.update(this.time.deltaTime);//redo tpf, i need tpf in sec => right now tpf = 1000 equals to 1 sec
	this.render(this.graphics);
};

Game.prototype.update = function(tpf){
	this.fpsTimer += tpf;
	if(this.fpsTimer >= 1000){
		this.fpsTimer = 0.0;
		this.fps = this.frameCount;
		this.frameCount = 0;
	}
	DrawableControl.prototype.update.call(this, tpf);
	this.scene.update(tpf);
};

Game.prototype.render = function(g){
	DrawableControl.prototype.render.call(this, g);
	g.clearRect(0, 0, g.width, g.height);
	g.fillStyle = "rgb(255, 0, 0)";
	
	//temp
	//g.fillStyle = "rgb(" + Math.round(Math.random()*255) + ", "+ Math.round(Math.random()*255) + ", "+ Math.round(Math.random()*255) + ")";
	
	g.fillRect(0, 0, g.width, g.height);

	g.fillStyle = "rgb(255, 255, 255)";
	g.font = "30px Arial";
	g.fillText("FPS : " + this.fps, 0, g.height - 5);
	//console.log("FPS : " + this.fps);
	
	this.scene.render(g);
	this.frameCount ++;
};
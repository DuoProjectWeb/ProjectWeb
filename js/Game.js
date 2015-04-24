var Game = function(){
	var self = this;
	this.canvas = document.getElementById("Canvas");
	this.graphics = this.canvas.getContext("2d");

	this.loadingRotatorProgress = 0;

	this.fps = 0;
	this.frameCount = 0;
	this.fpsTimer= 0.0;
	
	this.time = {
		globalDeltaTime : 0,
		globalTime : Date.now(),
		localTime : 0,
		deltaTime : 0,
		timeScale : 1
	};
	this.time.timeScale = 0.1;


	this.toDelete = [];

	audioManager = new AudioManager();
	audioManager.sfxVolume = 0.25;
	assetManager = new AssetManager(
		function(){
			self.onGameLoaded();
		}
	);
	assetManager.initialize(
		{
			"bullet" : "img/bullet.png",
			"sceneBackground" : "img/sceneBackground.jpg",
			"player" : "img/player.png",
			"playerExplosion" : "img/Debris2.png",
			"flame" : "img/flame2.png"
		},
		{
			"backgroundMusic" : "sounds/backgroundMusic.wav",
			"explosion" : "sounds/explosion.wav",
			"shoot" : "sounds/shoot.wav",
			"shoot2" : "sounds/shoot2.wav",
			"death": "sounds/death.wav"
		}
	);

	this.onResize();

	window.addEventListener("resize", function(){
		self.onResize();
	});
		
	requestAnimationFrame(function loop(){
		self.mainLoop();
		requestAnimationFrame(loop);
	});
};

Game.prototype = new DrawableControl();

//var Layers = new Layers();

Game.WIDTH = 400;
Game.HEIGHT = 600;
Game.EPSILON = 1;

Game.prototype.mainLoop = function(){
	var now = Date.now();
	this.time.globalDeltaTime = (now - this.time.globalTime) * 0.001;
	this.time.globalTime = now;

	this.time.deltaTime = Math.min(0.05, this.time.globalDeltaTime) * this.time.timeScale;
	this.time.localTime += this.time.deltaTime;
	this.update(this.time.deltaTime);
	this.render(this.graphics);
};

Game.prototype.destroy = function(obj, delay) {
	this.toDelete.push({
		"time" : this.time.localTime,
		"obj" : obj,
		"delay" : delay || 0.0
	});
};

Game.prototype.update = function(tpf){	
	DrawableControl.prototype.update.call(this, tpf);

	var time = this.time.localTime;
	for (var i = this.toDelete.length - 1; i >= 0; i--) {
		var o = this.toDelete[i];
		if(time >= o.time + o.delay){
			this.toDelete.splice(i, 1);
			delete o.obj;
		}
	};

	if(this.scene){
		this.fpsTimer += tpf;
		if(this.fpsTimer >= 1 * this.time.timeScale){
			this.fpsTimer = 0.0;
			this.fps = this.frameCount;
			this.frameCount = 0;
		}	
		this.scene.update(tpf);
	}	
};

Game.prototype.render = function(g){
	DrawableControl.prototype.render.call(this, g);
	/*for (var i = 0; i < Layers.canvases.length; i++) {
		var c = Layers.canvases[i].canvas;
		var g2d = c.getContext("2d");
		g2d.clearRect(0, 0, g.width, g.height);
	};*/

	g.clearRect(0, 0, g.width, g.height);

	g.save();
		g.scale(this.scale, this.scale);
		if(this.scene){
			g.fillStyle = "rgb(255, 255, 255)";
			g.font = "30px Arial";
			g.fillText("FPS : " + this.fps, 0, g.height - 5);
			
			this.scene.render(g);
			this.frameCount ++;
		}else{
			//chargement
			g.fillStyle = "rgb(255, 255, 255)";
			g.textAlign = "center";
			g.fillText("Loading ... " + Math.round(assetManager.getProgress() * 100) + "%", g.width * 0.5, g.height * 0.5);
			g.fillStyle ="rgb(255, 255, 255)";
			g.fillRect(g.width * 0.5 - 100, g.height * 0.5 + 20, 200, 20);
			g.fillStyle ="rgb(255, 0, 0)";
			g.fillRect((g.width * 0.5 - 99), g.height * 0.5 + 21, 198 * assetManager.getProgress(), 18);	

			this.loadingRotatorProgress += 1;
			if(this.loadingRotatorProgress>360.0){
				this.loadingRotatorProgress = 0.0;
			}
			g.fillStyle = "rgba(255, 255, 255, 0.3";
			g.strokeStyle = "rgb(255, 255, 255)";
			g.beginPath();
			g.arc(g.width * 0.5, g.height * 0.5 - 60, 30, 0, Math.PI * 2);
			//g.fill();	
			g.stroke();
			g.save();
				g.translate(g.width * 0.5, g.height * 0.5 - 60);
				g.rotate(Utils.toRad(this.loadingRotatorProgress*5.0));
				g.beginPath();
				g.lineTo(0, 0);
				g.arc(0, 0, 30, 0, Math.PI * 0.3);
				g.fill();
			g.restore();
		}
	g.restore();
};	

Game.prototype.onGameLoaded = function() {
	console.log("game loaded");
	this.scene = new Scene(this);
};

Game.prototype.onResize = function() {
	console.log("game resize");
	this.canvas.width = document.body.clientWidth;
	this.canvas.height = document.body.clientHeight;
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;
	this.scale = this.canvas.height / Game.HEIGHT;
};
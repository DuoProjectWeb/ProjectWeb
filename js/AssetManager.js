var AssetManager = function(callback){
	this.images = {};
	this.imagesToLoad = {};
	this.imagesToLoadErrors = {};
	this.sounds = {};
	this.soundsToLoad = {};
	this.soundsToLoadErrors = {};

	this.assetsLoadedCount = 0;
	this.assetsToLoadCount = 0;

	this.callback = callback;

};

AssetManager.prototype.initialize = function(imgList, soundList) {
	this.assetsLoadedCount = 0;
	this.assetsToLoadCount = 0;

	if(imgList){
		for(var id in imgList){
			this.imagesToLoad[id] = imgList[id];
			this.assetsToLoadCount ++;
		}		
	}
	if(soundList){
		for(var id in soundList){
			this.soundsToLoad[id] = soundList[id];
			this.assetsToLoadCount++;
		}
	}

	for(var id in this.imagesToLoad){
		this.loadImage(id, this.imagesToLoad[id]);
	}

	for(var id in this.soundsToLoad){
		this.loadSound(id, this.soundsToLoad[id]);
	}
};

AssetManager.prototype.getProgress = function() {
	return this.assetsLoadedCount / this.assetsToLoadCount;
};

AssetManager.prototype.onAssetLoaded = function(id) {
	this.assetsLoadedCount++;
	console.log(id + " loaded");
	console.log("Assets loading " + this.assetsLoadedCount + " / " + this.assetsToLoadCount);
	if(this.assetsLoadedCount == this.assetsToLoadCount){
		if(this.callback){
			this.callback();
		}
	}
};

AssetManager.prototype.loadImage = function(id, path) {
	console.log("load image " + id + " with pah : " + path);
	var self = this;
	var img = new Image();
	img.addEventListener("load", function(){
		if(self.imagesToLoad[id]){
			delete self.imagesToLoad[id];
			self.onAssetLoaded(id);
		}
	});
	img.addEventListener("error", function(){
		console.log("Error while loading image : " + id + ", path : " + path);
		self.imagesToLoadErrors[id] = path;
		delete self.imagesToLoad[id];
		self.onAssetLoaded(id);
	});
	img.src = path;
	setTimeout(function(){
		if(img.complete && self.imagesToLoad[id]){
			delete self.imagesToLoad[id];
			self.onAssetLoaded(id);
		}
	}, 100);
	self.images[id] = img;
};

AssetManager.prototype.getImage = function(id) {
	return this.images[id];
};

AssetManager.prototype.loadSound = function(id, path) {
	var self = this;
	var sound = new Audio();	
	sound.addEventListener("error", function(){
		console.log("Error while loading sound : " + id + ", path : " + path);
		self.soundsToLoadErrors[id] = path;
	});
	sound.src = path;
	this.sounds[id] = sound;
	delete this.soundsToLoad[id];
	this.onAssetLoaded(id);
};

AssetManager.prototype.getSound = function(id) {
	return this.sounds[id];
};
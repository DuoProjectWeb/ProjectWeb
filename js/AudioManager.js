var AudioManager = function(){
	this.musicVolume = 1.0;
	this.sfxVolume = 1.0;
};

AudioManager.prototype.playMusic = function(id, loop) {
	var audio = assetManager.getSound(id);
	if(audio){
		audio.volume = this.musicVolume;
		if(loop){
			audio.loop = loop;
		}
		audio.play();
	}
};

AudioManager.prototype.playOneShot = function(id) {
	var audio = assetManager.getSound(id);
	if(audio){
		var clone  = new Audio();
		clone.src = audio.src;
		clone.volume = this.sfxVolume;
		clone.play();
		game.destroy(clone, clone.duration);
	}
};
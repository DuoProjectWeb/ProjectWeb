var startTime = Date.now();
window.addEventListener("load", function () {
    //Storage.clear();
    var self = this;
	var loadedTime = Date.now();
	console.log("Page loaded in " + (loadedTime - startTime) + " ms");
	
	var button = document.getElementById("playButton");
	button.addEventListener("click", function () {
	    self.game = new Game();
	    showInGame();
	});

	button = document.getElementById("scoresButton");
	button.addEventListener("click", function () {
	    showScores();
	});

	button = document.getElementById("menuButton");
	button.addEventListener("click", function () {
	    showMenu();
	});

	button = document.getElementById("menuButtonIG");
	button.addEventListener("click", function () {
        saveScore(self.game.scene.player.score);
        backToMenu();
	});
	
});

function saveScore(score) {
    Storage.putInt("LastScore", score);

    var _tempHightScore = Storage.getInt("Highscore");
     if(_tempHightScore < score) {
        Storage.putInt("Highscore", score);
    }
};

function getGlobalOffset(element){
	var offset = {
		left : 0,
		top : 0
	};
	do{
		offset.left += element.offsetLeft;
		offset.top += element.offsetTop;
	}while(element = element.offsetParent);
	return offset;
};

function backToMenu(){
    document.location.reload();
    showMenu();
};

function showMenu() {
    var menu = document.getElementById("menu");
    menu.className = "panelselected";

    var score = document.getElementById("scores");
    score.className = "panel";

    var gui = document.getElementById("gui");
    gui.className = "active";

    var IGgui = document.getElementById("IGgui");
    IGgui.className = "disable";
};

function showScores() {
    var score = document.getElementById("scores");
    score.className = "panelselected";

    var menu = document.getElementById("menu");
    menu.className = "panel";

    var gui = document.getElementById("gui");
    gui.className = "active";

    var IGgui = document.getElementById("IGgui");
    IGgui.className = "disable"

    var lastScore = Storage.getInt("LastScore");   
    var content = document.getElementById("contentLastScore");
    content.innerHTML = lastScore.toString();

    var highscore = Storage.getInt("Highscore");
    content = document.getElementById("contentHighScore");
    content.innerHTML = highscore.toString();
};

function showInGame() {
    var menu = document.getElementById("menu");
    menu.className = "panel";

    var score = document.getElementById("scores");
    score.className = "panel";

    var gui = document.getElementById("gui");
    gui.className = "disable";

    var IGgui = document.getElementById("IGgui");
    IGgui.className = "active";
};
var startTime = Date.now();
window.addEventListener("load", function () {
    var self = this;
	var loadedTime = Date.now();
	console.log("Page loaded in " + (loadedTime - startTime) + " ms");
	
	var button = document.getElementById("playButton");
	button.addEventListener("click", function () {
	    self.game = new Game();
	    showInGame();
	});

	var button = document.getElementById("scoresButton");
	button.addEventListener("click", function () {
	    showScores();
	});

	var button = document.getElementById("menuButton");
	button.addEventListener("click", function () {
	    showMenu();
	});
	
});

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

function showMenu() {
    var menu = document.getElementById("menu");
    menu.className = "panel selected";

    var score = document.getElementById("scores");
    score.className = "panel";

    var inGame = document.getElementById("inGame");
    inGame.className = "panel";
};

function showScores() {
    var score = document.getElementById("scores");
    score.className = "panel selected";

    var menu = document.getElementById("menu");
    menu.className = "panel";

    var inGame = document.getElementById("inGame");
    inGame.className = "panel";
};

function showInGame() {
    var inGame = document.getElementById("inGame");
    inGame.className = "panel selected";

    var menu = document.getElementById("menu");
    menu.className = "panel";

    var score = document.getElementById("scores");
    score.className = "panel";
};
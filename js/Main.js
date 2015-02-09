var startTime = Date.now();
window.addEventListener("load", function(){
	var loadedTime = Date.now();
	console.log("Page loaded in " + (loadedTime - startTime) + " ms");
	
	this.game = new Game();
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
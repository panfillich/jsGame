//Массив игр, для каждой игры свой ключ
var games = new Array();

//Покадровая анимация
(function(){
	function Rendering(){
		
		window.MyRequestAnimationFrame = (function (callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
		
		games.forEach(function(game){
			game.animation();
		});
		
		window.MyRequestAnimationFrame(function () {
			Rendering()
		});
	};
	Rendering();
})()

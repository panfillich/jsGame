//Массив анимация, для каждой игры свой ключ
var motion_callback = new Array();

//Покадровая анимация
function FrameRendering(){
	function Rendering(){
		window.MyRequestAnimationFrame = (function (callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
		
		motion_callback.forEach(function(callback){
			callback();
		});
		
		window.MyRequestAnimationFrame(function () {
			Rendering()
		});
	};
	Rendering();
}
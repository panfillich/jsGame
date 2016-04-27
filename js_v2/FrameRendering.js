//Покадровая анимация
function FrameRendering(motion_callback){
	function Rendering(motion_callback){
		window.MyRequestAnimationFrame = (function (callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
		
		motion_callback();
		
		window.MyRequestAnimationFrame(function () {
			Rendering(motion_callback)
		});
	};
	Rendering(motion_callback);
}
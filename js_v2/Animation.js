//Анимация и движения
function Animation(setting){
	this.setting = setting;
}
//Обьект отрисовывается
Animation.drow = function(GameObject){
	var context = this.setting.canvas.context;
	var object 	= GameObject;
	var img 	= object.img;
	var x 		= object.pos.x;
	var y 		= object.pos.x;
	var width	= object.size.width;
	var height	= object.size.height;
	
	context.drawImage(img, x, y, width, height);
} 
//Запуск покадровой отрисовки
Animation.start = function(){

}
//-------------------------------------------------//
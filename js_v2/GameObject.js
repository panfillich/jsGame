//В property обязательно указать такие свойства как
// img - изображение
// x,y - позицию на canvas
function GameObject(property){
	this.img = property.img;

	//Позиция обьекта
	this.pos = {'x':property.x, 'y':property.y};
	
	//Размеры обьекста
	//this.wi

	//Поворот
	this.rotation = 0;

	//Что происходит с обьектом
	this.animation = null;
}//------------------------------------------------//
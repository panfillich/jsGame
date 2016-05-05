//В property обязательно указать такие свойства как
// img - изображение
// x,y - позицию на canvas
function GameObject(property){
	this.img = property.img;

	//Позиция обьекта
	this.pos = {
		'drow_point' : {
			'x' : property.x,
			'y' : property.y
		},
		'mid' : {
			'x' : property.mid_x,
			'y' : property.mid_y
		}
	}
	
	//Размеры обьекта
	this.size = {
		'x' : property.size_x,
		'y' : property.size_y
	}

	//Поворот
	this.rotation = 0;

}//------------------------------------------------//

//Наследуем от GameObject
//добавляем тип гесагона
function Hex(property){
	GameObject.apply(this,arguments);
	
	//тип/цвет гексагона
	this.type = property.type;
}
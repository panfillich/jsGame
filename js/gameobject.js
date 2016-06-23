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

//Установить новые координаты отрисовки
GameObject.prototype.setDrowPos = function(drow_point_x,drow_point_y){
	//Координаты для отрисовки
	this.pos.drow_point.x = drow_point_x;
	this.pos.drow_point.y = drow_point_y;
	
	//Координаты центра
	this.pos.mid.x = drow_point_x + this.size.x/2;
	this.pos.mid.y = drow_point_y + this.size.y/2;
}

//Установить новые координаты центра
GameObject.prototype.setMidPos = function(mid_point_x,mid_point_y){
	//Координаты для отрисовки
	this.pos.drow_point.x = mid_point_x - this.size.x/2;
	this.pos.drow_point.y = mid_point_y - this.size.y/2;
	
	//Координаты центра
	this.pos.mid.x = mid_point_x;
	this.pos.mid.y = mid_point_y;
}

//Установить новый размер
GameObject.prototype.setNewSize = function(new_size_x, new_size_y){
	//Координаты для отрисовки
	this.pos.drow_point.x = this.pos.mid.x - new_size_x/2;
	this.pos.drow_point.y = this.pos.mid.y - new_size_y/2;
	
	//Размеры
	this.size.x = new_size_x;
	this.size.y	= new_size_y;
}

//Наследуем от GameObject
//добавляем тип гесагона
function Hex(property){
	GameObject.apply(this,arguments);
		
	//тип/цвет гексагона
	this.type = property.type;
}
Hex.prototype = Object.create(GameObject.prototype);
Hex.prototype.constructor = Hex;

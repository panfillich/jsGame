//Игровой обьект
function GameObject(x,y,z){
	GameObject._global.id++;

	//id обьекта
	this._id = GameObject._global.id;
	//id обьекта CSS
	this._id_css = GameObject._global.name_id + '-' + this._id;

	//Позиции в пространстве
	this._positon = new Object;
	this._positon.x = x;
	this._positon.y = y;
	this._positon.z = z;
	
	//Смещение
	this._rotation = 0;	
}

//Получаем координаты X
GameObject.prototype.getX = function(){
	return this._positon.x;
}
//Получаем координаты Y
GameObject.prototype.getY = function(){
	return this._positon.x;
}
//Получаем координаты Z
GameObject.prototype.getZ = function(){
	return this._positon.x;
}

//Уничтожить объект
GameObject.prototype.destroy = function(){
	
}

//Шаблон типа гексагона
function TypeHex(name,img,style){
	this.id 	= TypeHex._global.id++;
	this.style 	= TypeHex._global.style + style;
	this.img 	= TypeHex._global.folder + '/' + img;
	this.name 	= name;
	TypeHex._global.active.push(this);
}

// Шаблон гексагона
function Hexagon(x,y,z){
	GameObject.apply(this,arguments);
}

Hexagon.prototype = Object.create(GameObject.prototype);
Hexagon.prototype.constructor = Hexagon;
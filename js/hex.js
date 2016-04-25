//Гексагон
//
//  id - id клетки
//
//
HexGenerator.arr = new Array();

function HexGenerator(id,count){
	//самый нижний гексагон
	this.id 	= id; 	 
	
	//кол-во гексагонов сверху
	this.count 	= count; 
	
	//Позиции точек, откуда генерируются гексагоны для каждого столбца
	//В клетках 
	this.pos_sell = {
		//Координаты вершины
		'x' : Game.map[id].pos_sell.x,
		'y' : Game.map[id].pos_sell.y - (count+2)*Setting.hex.sell_y,	
		//Координаты центра
		'mid_x' : Game.map[id].pos_sell.x+Setting.hex.sell_x/2,
		'mid_y' : (Game.map[id].pos_sell.y - (count+2)*Setting.hex.sell_y) + Setting.hex.sell_y/2
	};
	//В координатах canvas
	this.pos_convas = {
		//Координаты вершины
		'x' : this.pos_sell.x * Setting.sell.width,
		'y' : this.pos_sell.x * Setting.sell.height,
		//Координаты центра
		'mid_x' : this.pos_sell.mid_x * Setting.sell.width,
		'mid_y' : this.pos_sell.mid_y * Setting.sell.height
	}
	
	//Cостояние true - генератор свободен / 1 - генерируется
	this.is_ready = true;
	
	HexGenerator.arr.push(this);	
}

function Hex(id){	

	this.type_hex = TypeHex.getRandom();
		
    this.pos_canvas_x = x;
    this.pos_canvas_y = y;
	//id клетки
    this.id = id;
    this.status = 'gener';
    // gener        - гексагон генерируется
    // move_down    - гексагон падает вниз
    // move change  - гексагон меняется
	// fix			- стоит на месте	
    this.animation = new Object;
	
	//анимация конкретного гексагона
	this.animation.start = new Array;
	
	//Двигаемся к по прямой
	this.animation.move_to = function(x,y){
		
	}
	//Стоим на месте
	this.animation.fix(){
	
	}
}

Hex.prototype = Object.create(null);
//Гексагон
//
//  id - id клетки
//
//
HexGenerator.arr = new Array();

function HexGenerator(id,count,Game){
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

function Hex(id_hener,id_map_hex,Game){	

	this.type_hex = TypeHex.getRandom();
	
	this.status = 'gener';
		
    this.pos_canv = {
		'x' : HexGenerator.arr[id_hener].pos_convas.x,
		'y' : HexGenerator.arr[id_hener].pos_convas.y
	};
	
	this.pos_sell = {
		'x' : 0,
		'y' : 0
	};

	//id клетки
    this.id_map_hex = id_map_hex;
	//id генератора
	this.id_hener = id_hener;

	
	//Точка к которой движемся
	this.point_to = {
		'pos_canv' : {
			'x' : Game.map[id_map_hex].pos_canvas.x,
			'y' : Game.map[id_map_hex].pos_canvas.x
		},
		'pos_sell' : {
			'x' : 0,
			'y' : 0
		}
	};
	
    // gener        - гексагон генерируется
    // move_down    - гексагон падает вниз
    // move change  - гексагон меняется
	// fix			- стоит на месте	
	
    this.animation = new Object();
	
	//анимация конкретного гексагона
	this.animation.start = function(){
		if(this.status == 'gener'){
			HexGenerator.arr[id_hener].is_ready = false
		}
		move_to_point();
	};
	
	//Двигаемся по прямой к точке НЕРАВНОМЕРНО => каждый раз пересчёт
	this.animation.move_to_point = function(){ //s - расстояние за кадр в пикселях!
		//все считаем в пикселях
		
		//смещение
		var S = 1*Setting.speed;
		
		//положение гексагона
		var Yh = this.pos_canv.y; 
		var Xр = this.pos_canv.x; 
		
		//положение точки, куда двигаемся
		var Yp = this.point_to.pos_canv.y; 
		var Xp = this.point_to.pos_canv.x;
		
		//Находим A,B,C линейного уравнения Ax+By+C=0
		var A = Yp - Yh;
		var B = Xh - Xp;
		var C = Xp*Yh - Xh*Yp;
		
		//Находим Y через sin
		var G = Math.abs(Math.sqrt(Math.pow((Yp - Yh), 2) + Math.pow((Xp - Xh), 2)));	//Гипотенуза
		var Sin = Math.abs(Yp - Yh)/G;
		
		//Смещение в пикселях
		var Ys,Xs;
		var Ys1 =  Sin*S + Yh;
		var Ys2 = -Sin*S + Yh;
		
		if((Ys1 <= Yh && Ys1 >= Yp) || (Ys1 >= Yh && Ys1 <= Yp)){
			Ys = Ys1;
		} else {
			Ys = Ys2;
		}
		
		Xs = -(B*Ys+C)/A;
		
		if(Ys < Yp){
			this.pos_canv.y = Ys;
			this.pos_canv.x = Xs;
		}
		this.animation.drow();		
	}
	
	//Отрисовываем
	this.animation.drow() = function(){
		Game.context.drawImage(this.type_hex.img,this.pos_canv.x,this.pos_canv.y,Setting.hex.width,Setting.hex.height);
	}
	
	//Задаем точку назначения
	this.animation.setPoint_pxls = function(x,y,type){  
										//type - система координат
										// 'sell' - в клетках
										// 'canv' - в пикселях
		if(type === 'sell'){
			this.point_to.pos_sell.x = x;
			this.point_to.pos_sell.y = y;			
			this.point_to.pos_canv.x = x*Setting.sell.width;
			this.point_to.pos_canv.y = y*Setting.sell.height;
		} else if (type === 'canv'){
			this.point_to.pos_canv.x = x;
			this.point_to.pos_canv.y = y;			
			this.point_to.pos_sell.x = x/Setting.sell.width;
			this.point_to.pos_sell.y = y/Setting.sell.height;
		}
	}
	
	this.animation.setPoint = function(id_map_hex){
		this.point_to = {
			'pos_canv' : {
				'x' : Game.map[id_map_hex].pos_canvas.x,
				'y' : Game.map[id_map_hex].pos_canvas.y
			},
			'pos_sell' : {
				'x' : 0,
				'y' : 0
		}
	};
	}
}

Hex.prototype = Object.create(null);
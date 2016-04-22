;//Генерируем карту игры
var go = function(){

//-----| Отладка |------//
var debug_mod = false;


//-----| СВОЙСТВА |-----//

	//id родителя, в котором рисуем поле
	var id_fild = 'windows-game';
	
	//Кол-во клеток по оси x и y
	var sell_count_x = 20;
	var sell_count_y = 20;
	
	//высота и ширина клетки
	var sell_size_x = 24;	
	var sell_size_y = 20;	
	
	//цвет линий сетки
	var sell_color = '#eee';

	
	
//-----| ФОРМИРУЕМ CANVAS |-----//
	//Ширина и высота
	var map_width  = sell_count_x * sell_size_x;
	var map_height = sell_count_y * sell_size_y;

	//Задаем  свойства полю
	var convas = document.createElement('canvas');	
	convas.setAttribute('id', 'map');
	convas.setAttribute('width', map_width);
	convas.setAttribute('height', map_height);
	
	//Создаем поле
	var parent_fild = document.getElementById(id_fild);
	parent_fild.appendChild(convas)

	
//-----| РИСУЕМ КООРДИНАТНУЮ СЕТЬ |-----//
	
	var context = convas.getContext("2d");
	
	function drowGrid(){
		//Рисуем вертикальные линии		
		for (var x = sell_size_x; x <= (map_width-sell_size_x); x += sell_size_x) {
			context.moveTo(x, 0);
			context.lineTo(x, map_height);
		}

		//Рисуем горизонтальные линии
		for (var y = sell_size_y; y <= (map_height-sell_size_y); y += sell_size_y) {
			context.moveTo(0, y);
			context.lineTo(map_width, y);
		}

		//Это все были «карандашные» методы. На самом деле, на холсте еще ничего не нарисовано, 
		//нам нужны «чернильные» методы, чтобы сделать рисунок видимым.
		context.strokeStyle = sell_color;
		context.stroke();
	}
	
	
//-----| ПЕРЕМЕЩАЕМ ГЕКСАГОН |-----//	

	//-- инициализация с учётом браузерной совместимости
	window.MyRequestAnimationFrame = (function (callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000/60);
			};
	})();

	//-- старт анимации
	var iterator = 0;
	var speed = 0.1;
	
	MyAnimation = function () {
	  //Очищаем всю карту
	  context.clearRect(0,0,map_width,map_height);	 
	  //Отрисовываем в нужном порядке анимации
	  
      context.drawImage(TypeHex.getRandom().img,sell_size_x+iterator,sell_size_y,sell_size_x*4,sell_size_y*4);

	  //скорость игры
      iterator = iterator + 1*speed;
      if ( iterator > map_width) { iterator = 0; }
		
		window.MyRequestAnimationFrame(function () {
			MyAnimation();
		});
		
	}
	//MyAnimation();
	
//--------| События по клику мышки |-----------------//

convas.addEventListener('mouseup', function (e) {
    var mouse_x = e.pageX - e.target.offsetLeft;
    var mouse_y = e.pageY - e.target.offsetTop;
	//cобытие по клику мыши
	//mouse_event(mouse_x,mouse_y);
});


//-------| Расчет кол-ва гексагонов исходя из поля |--//

var hex_count_x = ((sell_count_x-1)/3).toString().replace(/\.[1-9]+\d*$/,'');
var hex_count_y = ((sell_count_y)/4).toString().replace(/\.[1-9]+\d*$/,'');

//Проверка, если карта слишком маленькая
if(hex_count_x <= 0 || hex_count_y <= 0){
	alert('Карта сышком маленькая');
	flag = false;
}	


//-------| Получаем массив координат гексагонов |-----//
function create_map_points(){
	var map = new Array();
	var x, y; 

	//Работаем от конвасовской координаты [0;0]
	//Заполняем сверху - вниз, затем смещаемся на след. столбец
	for(x = 0; x < hex_count_x; x++){
		if(!(x%2)){ //полный столбец гексагонов
			for(y = 0; y < hex_count_y; y++){	
				map.push(create_sell(x*3,y*4));
			}
		} else { //смещенный столбец гексагонов
			for(y = 0; y < (hex_count_y-1); y++){
				map.push(create_sell(x*3,y*4+2));
			}		
		}
	}
	return map;
}

//Коллекция свойств клетки
function create_sell(x,y){ //координаты гексагона в клетках (Например первый гесагон всегда [0:0])
	var sell_time = Object.create(null);
	
	//координаты финальных позиций гексагонов в клетках
	sell_time.pos_s = Object.create(null);
	sell_time.pos_s.x = x;
	sell_time.pos_s.y = y;
	
	//координаты гексагонов в координатах canvas
	sell_time.pos_c = Object.create(null);
	sell_time.pos_c.x = x*sell_size_x;
	sell_time.pos_c.y = y*sell_size_y;
	
	//координаты центра в клетках
	sell_time.pos_mid_s = Object.create(null);
	sell_time.pos_mid_s.x = x+2;
	sell_time.pos_mid_s.y = y+2;
	
	//координаты центра в координатах canvas
	sell_time.pos_mid_c = Object.create(null);
	sell_time.pos_mid_c.x = (x+2)*sell_size_x;
	sell_time.pos_mid_c.y = (y+2)*sell_size_y;
	
	sell_time.status = 'empty';
						// 	1. 	empty 	- с клеткой ничеге не происходит, клетка пуста
						// 	2. 			- клетка заполняется, к ней уже выехал гексагон
						//  3.			- клетка заполняется, ожидает формирования гексагона
						// 	4. 			- в клетке гексагон, он кликабелен
						//	5.			- гексагоны меняются местами
	return 	sell_time;				
}

//CОЗДАЕМ КАРТУ
var map = create_map_points();
	callback = function(){
		map.forEach(function(sell,i,map){
		context.drawImage(TypeHex.getRandom().img,sell.pos_c.x,sell.pos_c.y,sell_size_x*4,sell_size_y*4);
		});
		drowGrid();
		alert('finish');
	}.bind(window);
	
	window.setTimeout(MyAnimation, 1000);
}

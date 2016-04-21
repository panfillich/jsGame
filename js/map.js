;//Генерируем карту игры
(function(){

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
	
	
//-----| РИСУЕМ ГЕКСАГОН |-----//

	//Задаем типы гексагонов
	TypeHex = Object.create(null);
	//Папка с изображениями
	TypeHex.folder = 'img/hex/'; 
	//Последний ID
	TypeHex.id = 0; 
	//Массив всех типов
	TypeHex.all = new Array(); 
	
	//Получить тип по имени
	TypeHex.getByName = function(name){
		var number_hex;
		TypeHex.all.forEach(function(hex,i,hexs){			
			if(name === hex.name){
				number_hex = i;
			}
		});
		return TypeHex.all[number_hex];
	};
	
	//Получить тип по id
	TypeHex.getById = function(id){
		return TypeHex.all[id];
	};
	
	//Получить случайный тип по id
	TypeHex.getRandom = function(){
		var id = Math.floor(Math.random() * (TypeHex.all.length));
		return TypeHex.all[id];
	}
	
	//Конструтор создания гексагонов
	function CreateTypeHex(name,src){		
		this.img = new Image;
		this.img.src = TypeHex.folder + src;
		this.img.onload = (function(){
			
		}).bind(this);
		this.id = TypeHex.id++;
		this.name = name;
		this.action = function(){
			return false;
		};	
		TypeHex.all.push(this); 
	}
	CreateTypeHex.prototype = Object.create(null)
	
	//создаем гексагоны	
	new CreateTypeHex('red','red.gif');
	new CreateTypeHex('blue','blue.gif');
	new CreateTypeHex('fill','fill.gif');
	new CreateTypeHex('green','green.gif');
	new CreateTypeHex('yellow','yellow.gif');

	
	
	
	console.log(TypeHex.getRandom());
	
	
	
	/*var control_load_img = false; 
	var img = new Image();  // Создание нового объекта изображения
	img.src = 'img/hex.gif';  // Путь к изображению которое необходимо нанести на холст
	//img.src = 'data:image/gif;base64,R0lGODlhDAAMAOYAANPe5Pz//4KkutDb4szY3/b+/5u5z/3//3KWrfn//8rk8naasYGkuszY4Mbg8qG+0dzv9tXg5sTg8t/o7vP8/4iqv9ft9NPe5qfD1Mfc56O/0YKlu+Lr8M3Z4JCwxuj2/Of0+eDz9+rw9Z68z8/n8sHe8sbT3Ju6zuDv96nE1Onw9Nbh6cvX39Hq89Hq8u77/srW3tbh54Kku8ba56TD1u37/vL8/vL8/9ft9ebu8+Ps8bzM1Ymsw7XR4Nnj6Yanvsnj8qrI2Or2/NTf5tvl68vY3+r3/HqdtNji6OXt8eDz+dLc477c7bDO3t7n7d7v9s3Z4dbs9N/y98Pd6PX+/8/b4f7//+Hp7tDo8vv//+fu84GjunKWro6uxHqctOfu9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAeEgCJfg4RfWlo5KlpgjI2OOklWBwcBAVmXCQlXHAUFVBkGBjMUNzZOEy81IF2sXUZCH0QrDyhPGzICAkohUj4XHhoQKQsLGDgWUTFIJxUjUy0uWNIkQxE9W9gMDD9BCgpLAEBNXl5H5F40DlUDEkxc71wICDwlDQBQHQ0EBEUsJjswBgQCADs=';
	
	*/
	
	
//-----| ПЕРЕМЕЩАЕМ ГЕКСАГОН |-----//	

	//-- инициализация с учётом браузерной совместимости
	/*window.MyRequestAnimationFrame = (function (callback) {
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
      context.drawImage(img,0*sell_size_x+iterator,0*sell_size_y,sell_size_x*4,sell_size_y*4);

	  //скорость игры
      iterator = iterator + 1*speed;
      if ( iterator > map_width) { iterator = 0; }
		
		window.MyRequestAnimationFrame(function () {
			MyAnimation();
		});
		
	}
	MyAnimation();*/
	
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
		
		window.setTimeout(callback, 1000);
})();





























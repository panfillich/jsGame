;//Генерируем карту игры

var Game = {

	//--------/ Формируем канвас /-------------------------------------------//
	'_createCanvas' : function(){
		var convas = document.createElement('canvas');

		convas.setAttribute('id', 'map');
		convas.setAttribute('width', Setting.map.width);
		convas.setAttribute('height', Setting.map.height);

		//рисуем канвас
		document.getElementById(Setting.id_parent_canvas).appendChild(convas);

		//навешиваем событие на клик по карте
		convas.addEventListener('mouseup', function (e) {
			var mouse_x = e.pageX - e.target.offsetLeft;
			var mouse_y = e.pageY - e.target.offsetTop;
		});

		Game.convas  = convas;
		Game.context = convas.getContext("2d");
	}, //----------------------------------------------------------------------//



	//--------/ Очищаем стол / удаляем старый конвас /-------------------------//
	'_deleteCanvas' : function(){
	}, //----------------------------------------------------------------------//




	//--------/ Формируем карту, координаты позиций гексагонов /------//
	'_createMap' : function(){

		//Получаем массив координат гексагонов
		var map = new Array();
		var x, y, count_y, hex_id = 0;

		//Размер гексагона в клетках
		var hex_sell_x = Setting.hex.sell_x;
		var hex_sell_y = Setting.hex.sell_y;

		//Размер гексагона
		var hex_width = Setting.hex.width;
		var hex_height = Setting.hex.height;

		//Размеры клетки
		var sell_width  = Setting.sell.width;
		var sell_height = Setting.sell.height;

		//Кол-во гексагонов по осям
		var hex_count_x = Setting.hex.count_x;
		var hex_count_y = Setting.hex.count_y;

		//Последние гексагоны каждого столбца и кол-во гексагонов сверху
		map.last_line = new Array();

		//Работаем от конвасовской координаты [0;0]
		//Заполняем сверху - вниз, затем смещаемся на след. столбец
		for(x = 0; x <  hex_count_x; x++){
			if(!(x%2)){ //полный столбец гексагонов
				count_y =  hex_count_y;
				for(y = 0; y  < count_y; y++){
					map[hex_id] = (create_sell(x*hex_sell_x*3/4,y*hex_sell_y,hex_id));
					if(y === count_y-1) {
						//map.last_line.push({'id': hex_id, 'count': count_y, 'gener' : false});
						new HexGenerator(hex_id,count_y,Game);
					}
					hex_id++;
				}
			} else { //смещенный столбец гексагонов
				count_y =  hex_count_y - 1;
				for(y = 0; y < count_y; y++){
					map[hex_id] = (create_sell(x*hex_sell_x*3/4,y*hex_sell_y+hex_sell_y/2,hex_id));
					if(y === count_y-1) {
						//map.last_line.push({'id': hex_id, 'count': count_y, 'gener' : false});
						new HexGenerator(hex_id,count_y,Game);
					}
					hex_id++;
				}
			}
		}

		//Коллекция свойств клетки
		function create_sell(x,y,id){ //координаты гексагона в клетках (Например первый гесагон всегда [0:0])
			var hex = {
				//id клетки
				'id' : id,

				//позиции в координатах canvas
				'pos_canvas' : {
					//Координаты вершины
					'x' : x*sell_width,
					'y' : y*sell_height,
					//Координата центра
					'mid_x' : sell_width*(x + hex_sell_x/2),
					'mid_y' : sell_width*(y + hex_sell_y/2),
				},

				//позиции в клетках
				'pos_sell' : {
					//Координаты вершины
					'x' : x,
					'y' : y,
					//Координата центра
					'mid_x' : (x + hex_sell_x/2),
					'mid_y' : (y + hex_sell_y/2),
				},
				
				'status' : 'empty',
				'hex' : null
			};
			return hex;
		}

		//Перерасчёт карты
		map.recalculation = function(){
			var map = Game.map;

			//Проверка на пустоту
			HexGenerator.forEach(function(last_hex,id_hener){
				var i;
				var count_y = last_hex.count;
				var id = last_hex.id;
				var last_i = id - count_y + 1;
				//Двигаемся снизу вверх по последней строке
				for(i = id; i > (id - count_y); i--) {
					//Если клетка пуста
					if(map[i].status === 'empty'){
						if(i === last_i){
							//генерируем
							map[id].hex = new Hex(id_hener,i,map);
						}
						continue;
					}
				}
			});

			Game.map = map;
		};

		Game.map = map;
	},//---------------------------------------------------------------------------//


	//------/ Реализация покадровой анимации /-------------------------------------//
	'_startAnimation' : function() {
		//-- инициализация с учётом браузерной совместимости
		window.MyRequestAnimationFrame = (function (callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();

		//-- старт анимации
		var iterator = 0;

		var MyAnimation = function () {
			//Очищаем всю карту
			Game.context.clearRect(0, 0, Setting.map.width, Setting.map.height);
			//Отрисовываем в нужном порядке анимации
			
			Game.map.forEach(function(sell,i,map){
				Game.context.drawImage(TypeHex.getById(0).img,sell.pos_canvas.x,sell.pos_canvas.y,Setting.hex.width,Setting.hex.height);
			});

			Game.context.drawImage(TypeHex.getById(0).img, iterator, iterator, Setting.hex.width-iterator, Setting.hex.height-iterator);

			//Motion.drowGrid();

			//скорость игры
			iterator = iterator + Setting.speed;
			if (iterator > Setting.map.width) {
				iterator = 0;
			}

			window.MyRequestAnimationFrame(function () {
				MyAnimation()
			});

		}.bind(Game);
		MyAnimation();
	},//---------------------------------------------------------------------------//


	//Начинаем новую игру
	'start' : function(){
		//Очищаем стол / удаляем старый конвас
		Game._deleteCanvas();

		//Делаем перерасчет настроек
		Setting.recalculation();

		//Формируем новый канвас + событие клика на карту
		Game._createCanvas();

		//Формируем шаблон карты
		Game._createMap();

		//Запускаем покадровую анимацию
		Game._startAnimation();
	},

	//Пауза
	'pause' : function(){
		Game.speed_before_pause = Setting.speed;
		Setting.speed = 0;
	},

	//Убрать паузу
	'unpause' : function(){
		Setting.speed = Game.speed_before_pause;
	},

}


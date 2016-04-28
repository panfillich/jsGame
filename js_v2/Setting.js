;//Глобальные настройки
function Setting(id_game,id_rezult,id_setting){

	//id родительского класса, где генерируется canvas
	this.id_game = id_game;
	
	//Вкл./выкл. лог
	this.log = true;
	
	//Карта	
	this.map = { 	
		//Хранилище карты с логикой
		'store' : {},
		//Размеры 
		'size' : {'x' : 420,'y' : 420}
	};		
	
	//Гексагоны	
	this.hex = { 
		//Размеры
		'size' : {'x'  : 60,'y'  : 60}		
	}	
	
	//Кол-во гексагонов по осям
	this.hex.count = {
		'x'  : 1*((this.map.size.x - this.hex.size.x / 4) / (3 * this.hex.size.x / 4)).toString().replace(/\.[1-9]+\d*$/,''),
		'y'  : 1*(this.map.size.y / this.hex.size.y).toString().replace(/\.[1-9]+\d*$/,'')
	}
	
	//Координатная сеть
	this.grid = {
		//Рисовать/нерисовать сеть
		'view' : true,
		
		//Цвет линий
		'color' : 'black',
		
		//Клетка / ячейка сети
		'sell' : {
			'size' : {'x' : 15,'y' : 15}
		}
	};
	
	//Глобальный коэфициент скорости игры
	this.speed = 1;
	
	//Скорость до паузы
	this.speed_before_pause = this.speed;
	
	//Папка со всеми картинками
	this.image_folder = 'img';
	
	//Папка с картинками гексагонов
	this.hex_image_folder = 'hex';
	
	//Хранилище картинок
	this.image_store = [
		
		{'name' 	 : 'blue',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'blue.gif'},
		 
		{'name' 	 : 'red',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'red.gif'}, 
		 
		{'name' 	 : 'fill',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'fill.gif'}, 
 
 		{'name' 	 : 'green',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'green.gif'}, 
 
 		{'name' 	 : 'yellow',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'yellow.gif'}, 
	];
	
}//-------------------------------------------------//
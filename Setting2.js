;//Глобальные настройки
function Setting(id_game,id_rezult,id_setting){

	//id родительского класса, где генерируется canvas
	this.id_game = id_game;
	
	//Вкл./выкл. лог
	this.log = true;
	
	//Кол-во n в ряде
	this.count_n_row = 3;
	
	//Карта	
	this.map = { 	
		//Хранилище карты с логикой
		'store' : {},
		//Размеры 
		'size' : {'x' : 500,'y' : 500}
	};		
	
	//Гексагоны	
	this.hex = { 
		//Размеры
		'size' : {'x'  : 60,'y'  : 60},
		//Скорость
		'speed' : 10,
		//Скорость исчезания в частях по диагонали
		'speed_drop' : 1/30
	}	
	//Исчезание по осям x,y
	this.hex.speed_drop_y = this.hex.size.y * this.hex.speed_drop;
	this.hex.speed_drop_x = this.hex.size.x * this.hex.speed_drop;
	
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
		 
		{'name' 	 : 'purple',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'purple.gif'}, 
 
 		{'name' 	 : 'green',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'green.gif'}, 
 
 		{'name' 	 : 'yellow',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'yellow.gif'}, 
		 
		{'name' 	 : 'dark_blue',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'dark_blue.gif'}/*, 
		 
		{'name' 	 : 'gray',
		 'type' 	 : this.hex_image_folder,
		 'file_name' : 'gray.gif'}, */
	];
	
}//-------------------------------------------------//
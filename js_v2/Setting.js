;//Глобальные настройки
function Setting(id_game,id_rezult,id_setting){
	//id родительского класса, где генерируется canvas
	this.id_game = id_game;
	
	//Карта	
	this.map = { 	
		//Размеры 
		'size' : {'x' : 400,'y' : 400}
	};		
	
	//Гексагоны	
	this.hex = { 
		//Размеры
		'size' : {'x'  : 40,'y'  : 40}		
	}
	
	//Кол-во гексагонов по осям
	this.hex.count = {
		'x'  : (this.map.size.x - this.hex.size.x / 4) / (3 * this.hex.size.x / 4).toString().replace(/\.[1-9]+\d*$/,''),
		'y'  : (this.map.size.y / this.hex.size.y).toString().replace(/\.[1-9]+\d*$/,'')
	}
	
	//Глобальный коэфициент скорости игры
	this.speed = 1;
	
	//Скорость до паузы
	this.speed_before_pause = this.speed;
	
	//Папка со всеми картинками
	this.image_folder = 'img';
	
	//Папка с гексагонами
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
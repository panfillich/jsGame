;//Глобальные настройки
function Setting(setting){
	//Устанавливаем настройки по умолчанию
	this.def_setting = this.getDefSetting();
	
	//Устанавливаем настройки по умолчанию
	this.setSetting(this.def_setting);
	
	//Устанавливаем обязательные настройки + меняем настройки по умолчанию
	this.setSetting(setting);
	
	//Id родительского класса, где генерируется canvas
	//единственный обязательный параметр
	if(setting.id_game == undefined){
		console.log('ERROR :Не задано место(id), для генерации игры');
	} 
	
	//Устанавливаем предрасчетные параметры и свойства
	this.setPreSettlementOptions();
	
}//-------------------------------------------------//

//Устанавливаем настройки по умолчанию
Setting.prototype.getDefSetting = function(){
	return {
		//Кол-во n в ряде
		'count_n_row' : 3,
		
		//Глобальный коэфициент скорости игры
		'speed' : 1,
		
		//Вкл./выкл. лог
		'log' : false,

		//Размеры карты
		'map' : {
			'size': {'x' : 600, 'y' : 300 }
		},
		
		//Гексагоны	
		'hex' : { 
			//Размеры
			'size' : {'x' : 60, 'y' : 60},
			//Скорость падения
			'speed_move_down' : 10,
			//Cкорость движения к узлу
			'speed_move_to_node' : 5,
			//Скорость исчезания в частях по диагонали
			'speed_drop' : 0.03125 // = 1/32
		},	

		//Координатная сеть
		'grid' : {
			//Рисовать/нерисовать сеть
			'view' : true,
			
			//Цвет линий
			'color' : 'black',
			
			//Клетка / ячейка сети
			'sell' : {
				'size' : {'x' : 15,'y' : 15}
			}
		},
		
		//Папка со всеми картинками
		'image_folder' : 'img',
	
		//Хранилище картинок
		'image_store' : [
			{'name' 	 : 'blue',
			 'type' 	 : 'hex', //Тип / папка
			 'file_name' : 'blue.gif'},
			 
			{'name' 	 : 'red',
			 'type' 	 : 'hex',
			 'file_name' : 'red.gif'}, 
			 
			{'name' 	 : 'purple',
			 'type' 	 : 'hex',
			 'file_name' : 'purple.gif'}, 
	 
			{'name' 	 : 'green',
			 'type' 	 : 'hex',
			 'file_name' : 'green.gif'}, 
	 
			{'name' 	 : 'yellow',
			 'type' 	 : 'hex',
			 'file_name' : 'yellow.gif'}, 
			 
			{'name' 	 : 'dark_blue',
			 'type' 	 : 'hex',
			 'file_name' : 'dark_blue.gif'}
		],
		
		//Кол-во различных гексагонов
		'max_hex' : 6
	}
}


//Устанавливаем предрасчетные параметры и свойства
Setting.prototype.setPreSettlementOptions = function(){
	//Исчезание по осям x,y
	this.hex.speed_drop_y = this.hex.size.y * this.hex.speed_drop;
	this.hex.speed_drop_x = this.hex.size.x * this.hex.speed_drop;
	
	//Кол-во гексагонов по осям
	this.hex.count = {
		'x'  : 1*((this.map.size.x - this.hex.size.x / 4) / (3 * this.hex.size.x / 4)).toString().replace(/\.[1-9]+\d*$/,''),
		'y'  : 1*(this.map.size.y / this.hex.size.y).toString().replace(/\.[1-9]+\d*$/,'')
	}
}

//Установить настройки
Setting.prototype.setSetting = function(setting){
	//Устанавливаем настройки
	for (var option in setting) {
		this[option] = setting[option];
	}	
}


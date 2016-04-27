//Глобальные настройки
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
}

function gameObject(img,x,y){
	this.img = img;

	//Позиция обьекта
	this.pos = {'x':x, 'y':y};

	//Что происходит с обьектом
	this.animation = null;
}

//Анимация и движения
function Animation(setting){
	this.setting = setting;
	this.setting.speed = 10;


	this.move_to_point = function(gameObject,point){
		var speed = this.setting.speed;
	}
}




function Game(id_game){
	//Глобальные настройки
	this.setting = new Setting(id_game);
	new Animation(this.setting);
}



var game_1 = new Game('game1');
//var game_2 = new Game('game2');
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

function Game(id_game){
	//Глобальные настройки
	this._setting = new Setting;
}

//Получить настройки
Game.prototype.getSetting = function() {
	return this._setting;
};

Game.prototype.setSetting = function(setting) {
	this.setting = this._setting;
};

Game.prototype.Animation = function(setting) {
	var setting = this.getSetting();
	setting.speed = 0;
	this.setSetting(setting);
};


var game_1 = new Game('game1');
//var game_2 = new Game('game2');
function Game(setting){
	//Глобальные настройки + там же хранилище обьектов (картинки, canvas, карта, с логикой)
	this.setting = new Setting(setting);
	
	//Загрузка ресурсов (картинок)
	Loading(this.setting);
	
	//Действия после загрузки ресурсов
	Onload(this.setting, (function(){
		
		//Формируем окно настроек
		CreateWinConfig(this.setting);
		
		//Запускаем игру
		this.start();
		
		//Массив всех игр
		games.push(this);
				
	}).bind(this));	
}
Game.prototype.animation = function(){
	this.logic.animation();
}

Game.prototype.start = function(){
	//Создание canvas
	//canvas храним в настройках setting.canvas 
	CreateCanvas(this.setting);
		
	//Показывать сетку?	
	if(this.setting.grid.view){
		//Создание координатной сети
		CreateGrid(this.setting);
		//Отрисовывание координатной сети
		DrowGrid(this.setting);
	}
		
	//Формируем карту 
	this.map	= new Map(this.setting);
			
	//Формируем логику работы карты
	this.logic	= new Logic(this.setting, this.map);	
	
	//Формируем логику работы с мышью
	new	Events(this.setting, this.map, this.logic);
}

//Начало новой игры / перезагрузка предыдущей
Game.prototype.restart = function(setting){
	if(setting != undefined){
		//Перепишем старые настройки
		this.setting.setSetting(setting);
		//Сформируем заново рассчитываемые параметры
		this.setting.setPreSettlementOptions();
	}	
	//Формируем карту/логику/события
	this.start();
}


var setting_for_game_1 = {
	'id_game':'game_1',
	'id_config':'id_config_1',
	'map' : {
		'size': {'x' : 1200, 'y' : 1200 }
	}
};



var game1 = new Game(setting_for_game_1);
//var game2 = new Game(setting_for_game_2);

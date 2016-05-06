function Game(id_game){
	//Глобальные настройки + там же хранилище обьектов (картинки, canvas, карта, с логикой)
	this.setting = new Setting(id_game);
	
	//Загрузка ресурсов (картинок)
	Loading(id_game, this.setting);
	
	//Действия после загрузки ресурсов
	Onload(id_game, (function(){
		var setting = this.setting;
		//Создание canvas
		CreateCanvas(setting);
		
		if(setting.grid.view){
			//Создание координатной сети
			CreateGrid(setting);
			//Отрисовывание координатной сети
			DrowGrid(setting);
		}
		
		//Формируем карту 
		this.map	= new Map(setting);
		var	map		= this.map; 
		
		//Формируем логику работы карты
		this.logic	= new Logic(setting, map);	
		//Формируем логику работы с мышью
		new	Mous(setting, map);
		
		//Массив всех игр
		games.push(this);
				
	}).bind(this));	
}
Game.prototype.animation = function(){
	this.logic.animation();
}

var game_1 = new Game('game_1');
//var game_2 = new Game('game_2');
function Game(id_game){
	//Глобальные настройки
	this.setting = new Setting(id_game);
	
	//Загрузка ресурсов (картинок)
	Loading(id_game, this.setting);
	
	//Действия после загрузки ресурсов
	Onload(id_game, function(){
		//Создание карты ()
		CreateCanvas();
	});	
}

var game_1 = new Game('game_1');
//var game_2 = new Game('game_2');
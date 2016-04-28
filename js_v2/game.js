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
		
		//Формируем карту + логику игры
		CreateMapLogic(setting);
		
		//setting.context.drawImage(setting.image_store[0].img, 0, 0, setting.hex.size.x, setting.hex.size.y );
		
		setting.map.store.hex.forEach(function(point,i,map){
			setting.context.drawImage(setting.image_store[0].img, point.pos.drow_point.x, point.pos.drow_point.y, setting.hex.size.x, setting.hex.size.y );
		});
		
	}).bind(this));	
}

var game_1 = new Game('game_1');
//var game_2 = new Game('game_2');
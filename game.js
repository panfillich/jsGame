function Game(id_game){
	//Глобальные настройки
	this.setting = new Setting(id_game);
	this.animation = new Animation(this.setting);
}



var game_1 = new Game('game1');
//var game_2 = new Game('game2');
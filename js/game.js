﻿function Game(setting){
	//Глобальные настройки + там же хранилище обьектов (картинки, canvas, карта, с логикой)
	this.setting = new Setting(setting);
	
	//Загрузка ресурсов (картинок)
	Loading(this.setting);
	
	//Действия после загрузки ресурсов
	Onload(this.setting, (function(){
		
		//Формируем окно настроек
		CreateWinConfig(this);
		
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
	
	//Работа с очками (логика + создание окна, если нужно)
	Points(this.setting, this.logic)
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
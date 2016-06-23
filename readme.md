## Демонстрационная игра "Гексагональный n-в ряд"

* Native JS (без каких-либо библиотек)
* ECMAScript 5
* Работа с canvas (покадровая анимация)
* Работа с DOM, ООП в прототипном стиле
* Предусмотрена работа с сенсорным экраном (работает не на всех мобильных устройствах, т.к. при разработке ставилась задача only native js и цели писать свою универсальную библиотеку с поддержкой большинства устройств не было)
* Гибкие настройки игры
* Кроссбраузерность (поддержка IE9+)
* Сама игра [jshexgame.atwebpages.com] (jshexgame.atwebpages.com)

## Настройка

Создание игры:

	game = new Game(setting);
	 
Настройки имеют только 1н обязательный параметр: id тега, внутри которого формируется canvas:

	setting = { 'id_game' :	'some_id_tag_1' };
	
Некоторые параметры можно менять прямо во время игры (например скорость):

	game.setting.speed = 0;	
	
Перезапуск игры:
	
	game.restart(new_setting);
	
Необязательные параметры:

	//id тега, куда помещаем меню настроек
	'id_config'	:'some_id_tag_2',	
	
	//id тега, куда помещаем очки
	'id_points'	:'some_id_tag_3',	

	//Кол-во n в ряде
	'count_n_row' : 3,
	
	//Глобальный коэффициент скорости игры
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
		'speed_drop' : 0.03125 //1/32
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
		 'file_name' : 'red.gif'}
	],
	
	//Кол-во различных гексагонов
	'max_hex' : 6

## Особенности	

* Игра не оформлена в виде модуля. 
* Возможен конфликт с библиотеками в 1м фрейме, наример из-за window.onload.
* Можно создавать несколько экземпляров игры в 1м фрейме
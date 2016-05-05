﻿//Формируем логику игры, (тригеры и нужная послед-ность анимаций)function Logic(setting, map){	 this._setting = setting;	 this._map = map;	 	 //Для тестов	 this.x = 0;	 this.y = 0;}//Действия за 1 кадрLogic.prototype.animation = function(){		var that = this;	var setting = this._setting;		//Очищаем карту	var map_height = setting.map.size.y;	var map_width = setting.map.size.x;	setting.context.clearRect(0, 0, map_width, map_height);	//Проверки	that._checker();		//Изменение координат		that._changeCoordinate();	//Отрисовка	that._drow();		//Высота и ширина карты карты		//Рисуем гексагоны	/*this._map.nodes.forEach(function(node,i,nodes){		this.x = getRandomArbitary(-1,1) + this.x;			this.y = getRandomArbitary(-1,1) + this.y;					function getRandomArbitary(min, max)		{			return Math.random() * (max - min) + min;		}				setting.context.drawImage(setting.image_store[0].img, node.pos.drow_point.x+this.x, node.pos.drow_point.y+this.y, setting.hex.size.x, setting.hex.size.y );	}.bind(this));*/}//Создаем гексагон, который движется к ноде. инициализировавшей созданиеLogic.prototype._createHex = function(node){	//Карта	var map = this._map;	//Генераторы	var nodes_gen = this._map.nodes_gen;	//Генератор в котором происходит генерация	var node_gen = map.getNodeById(node.id_gen,'gener');	//Блокируем генератор	node_gen.is_empty = false;			//Хранилище картинок	var image_store = this._setting.image_store;	//Получаем все изображения / типы гексагонов	var image_hex_store = images(image_store).getImagesByType('hex');	//Находим случайный ключ массива типов гексагонов	var random_key = Math.floor(Math.random() * image_hex_store.length);	//Cлучайный тип	var random_type = image_hex_store[random_key];		//Задаем свойства гесагона	var property = {		'img' 	 : random_type.img,		'type' 	 : random_type.name,		'x' 	 : node_gen.pos.drow_point.x,		'y' 	 : node_gen.pos.drow_point.y,		'mid_x'  : node_gen.pos.mid.x,		'mid_y'  : node_gen.pos.mid.y,		'size_x' : this._setting.hex.size.x,		'size_y' : this._setting.hex.size.y	}		//Создаем гексагон	node.hex = new Hex(property);		//Помечаем тип анимаций для данной пары узла/гексагона	node.state_hex = 'move_to_on_gen';}//Изменяем положения//ПроверкиLogic.prototype._checker = function(){	var that 		= this;	var map 		= this._map;	var nodes 		= this._map.nodes;	var nodes_last 	= this._map.nodes_last;		//Проверка на пустоту	//Обходим все ноды справа-на-лево(снизу - вверх)	nodes_last.forEach(function(node_last){				var node = map.getNodeById(node_last.id, 'usual');			that._checkerUnstateNode(node);	}.bind(this));		//Проверки на n в ряд	//	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!	//	}//Проверяем соседей пустой нодыLogic.prototype._checkerUnstateNode = function(node){	var that 		= this;	var map 		= this._map;	var neighbor 	= map.getNodeById(node.neighbors[0], 'usual');	if(node.state_hex === 'unstate'){			if(node.neighbors[0] === 0){ //Если свеху нет соседей			//если генератор свободен, генерируем гексагон						if(map.getNodeById(node.id_gen,'gener').is_empty){				that._createHex(node);				map.getNodeById(node.id_gen,'gener').is_empty = false;			}		} else {	//если есть сосед сверху			if(neighbor.state_hex == 'unstate'){ //у соседа нет привязки к гексагону				//Запускаем проверку соседей соседей				that._checkerUnstateNode(neighbor);			} else {				//Гексагон меняет ноду - владельца				that._setNeighborHex(node); 						}		}	} else {		if(node.neighbors[0] !== 0){			that._checkerUnstateNode(neighbor);		}	}	return true;}//Взять гексагон соседаLogic.prototype._setNeighborHex = function(node){	var map 		= this._map;	var neighbor 	= map.getNodeById(node.neighbors[0], 'usual');	node.hex = neighbor.hex;		neighbor.hex = new Object;	if(neighbor.state_hex === 'move_to_on_gen'){		node.state_hex = 'move_to_on_gen';	} else {		node.state_hex = 'move_to_on_map';	}		neighbor.state_hex = 'unstate';	return true;}//Действия или изменения координатLogic.prototype._changeCoordinate = function(){	var that		= this;	var speed 		= this._setting.hex.speed * this._setting.speed;	var map			= this._map;	var nodes 		= this._map.nodes;	nodes.forEach(function(node){				var hex = node.hex;		if(node.state_hex === 'move_to_on_gen' || node.state_hex === 'move_to_on_map'){			var pos_drow_point_y = hex.pos.drow_point.y + speed;						var pos_mid_y		 = hex.pos.mid.y + speed;						//Если гексагон в генераторе			if(node.state_hex === 'move_to_on_gen'){				var node_gen = map.getNodeById(node.id_gen,'gener');				if(node_gen.border < pos_drow_point_y){					node.state_hex = 'move_to_on_map';					node_gen.is_empty = true;				}			}						//Если гексагон на карте			if(	pos_drow_point_y >= node.pos.drow_point.y){				hex.pos.drow_point.y = node.pos.drow_point.y;				hex.pos.mid.y 		 = node.pos.mid.y;				node.state_hex = 'state_in_node';			} else {				hex.pos.drow_point.y = pos_drow_point_y;				hex.pos.mid.y 		 = pos_mid_y;			}		}			}.bind(this));}//Отрисовка всех гексагоновLogic.prototype._drow = function(){	var context		= this._setting.context;	var nodes 		= this._map.nodes;	nodes.forEach(function(node){		var hex = node.hex;		if(node.state_hex !== 'unstate'){			context.drawImage(hex.img, hex.pos.drow_point.x, hex.pos.drow_point.y, hex.size.x, hex.size.y);			}	}.bind(this));}
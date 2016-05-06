//Создаем карту
function Map(setting){
	this._setting = setting;
	
	//Узлы
	this.nodes = new Array;
	
	//Массив Узлов генерации
	this.nodes_gen = new Array;
	
	//Массив Узлов, с которых начинается обход узлов до генераторов
	//и кол-во гексагонов между ними
	//По сути это узлы самых нижних гексагонов
	this.nodes_last = new Array;
	
	//Задаём форму карты
	this.setFormMap('rectang');
	
	//Находим и задаём Id соседей
	this.setIdNeighbors();
	
}


//Получить узел на карте по ID
//id 	- уникальный идентификатор ноды
//type 	- тип узла:
//		"usual" узел карты (по умолчанию);
//		"gener" узел-генератор
Map.prototype.getNodeById = function(id, type){
	var nodes, i;
	
	if(type === 'gener'){
		nodes = this.nodes_gen;
	} else {
		nodes = this.nodes;
	}
	
	for(i = 0; i < nodes.length; i++){
		if (nodes[i].id === id ){
			return nodes[i];
		}
	}	
	return false;
}

//Получить узел на карте по координатам x, y
//находим ближайший в радиусе = ширина/длинна гексагона * 2
Map.prototype.getNodeByPos = function(x,y){
	//Узлы
	var nodes = this.nodes;
	//Размер гексагона
	var hex_size_x  = this._setting.hex.size.x;
	var hex_size_y  = this._setting.hex.size.y;	
	
	//Наиболее близкий узел
	var node_search = false;
	//Расстояние
	var distance = MyMath.getDistanceBetweenTwoPoints(hex_size_x/2,hex_size_y/2,0,0);; 
	
	nodes.forEach(function(node){
		var mid_x = node.pos.mid.x;
		var mid_y = node.pos.mid.y;
		var this_node_distance = MyMath.getDistanceBetweenTwoPoints(x,y,mid_x,mid_y);
		if(this_node_distance <= distance){
			node_search = node;
			distance = this_node_distance;
		}				
	});
	return node_search;
} 

//Задаем форму карты с помощью узлов
//type 	- тип карты:
//	rectang 	- прямоугольная карта
//	round	  	- круглая карта
//	arbitrary	- произвольный размер карты
Map.prototype.setFormMap = function(type){

	var nodes		= this.nodes;
	var nodes_gen   = this.nodes_gen;
	var nodes_last  = this.nodes_last;
	
	//Размер гексагона
	var hex_size_x  = this._setting.hex.size.x;
	var hex_size_y  = this._setting.hex.size.y;
	
	//Максимально-возможное кол-во гексагонов по осям
	var hex_count_x = this._setting.hex.count.x;
	var hex_count_y = this._setting.hex.count.y;
	
	var x,y; 					//Позиции В ГЕКСАГОНАХ!
	var pos_x, pos_y;			//Позиции верхнего правого угла
	var pos_mid_x, pos_mid_y;	//Позиции центра
	var	id = 1; 				//Id узла
	var id_gen = 1;				//ID узла-генератора
	var border;					//граница, после которой происходит генерация
	var rand;					//случайный множитель (для границы)
	
	switch (type) {
		//----------------------------------------------------------------------------------//
		case 'rectang': //Формируем прямоугольную карту
		
			//Формирование начинаем снизу вверх с центра
			//Начинаем работать от  x = 0
			//Заполняем снизу - вверх, затем смещаемся на след. столбец
			
			//Находим координаты узлов (центров гексагонов + точек для рисования оных)
			for(x = 0; x <  hex_count_x; x++){
				//массив координат самых нижних позиций y для каждого x		
				if(x%2){ 
					y 		= 	hex_count_y-2;
					
					//pos_y 	=  -(3/2)*hex_size_y;
					//border  =  -(1/2)* hex_size_y;
				} else { 
					y = hex_count_y-1;	
					//pos_y 	=   -hex_size_y;
					//border	=    0;
				}	
				
				pos_y  =  - hex_size_y * Math.random() * 3;
				border =  0;
				
				pos_x 		= (3/4)*x*hex_size_x;
				pos_mid_x 	= pos_x + hex_size_x/2;
				pos_mid_y 	= pos_y + hex_size_y/2;
				
				
				//Добавляем узел генерации конкретного столбца
				nodes_gen.push(
					new GenNode(id_gen, pos_x, pos_y, pos_mid_x, pos_mid_y, border)
				); 
				
				//Добавляем ID последнего узла и кол-во гексагонов сверху
				nodes_last.push({'id' : id, 'count_hex' : y+1});	
				
				do{ 
					pos_x = x * 3*(hex_size_x/4);
					pos_y = y * hex_size_y;
					
					if(x%2){
						pos_y += hex_size_y/2;
					}	
				
					//Позиции центра
					pos_mid_x = pos_x + hex_size_x/2;
					pos_mid_y = pos_y + hex_size_y/2;
				
					//Добавляем узел
					nodes.push(
						new UsualNode(id, pos_x, pos_y, pos_mid_x, pos_mid_y, id_gen)
					); id++; y--;
				} while (y >= 0);
				
				id_gen++;
			}
		break;
		//----------------------------------------------------------------------------------//
	}
}

//Найти id соседа по координатам центра соседа
//mid_x			- примерная координа центра x соседа
//mid_y			- примерная координа центра y соседа
Map.prototype.searchIdNeighbor = function(mid_x, mid_y){	
	var nodes		 = this.nodes;
	var hex_size_x 	 = this._setting.hex.size.x;
	var hex_size_y	 = this._setting.hex.size.y;
	
	var id = 0; //Признак отсутствия соседа
	
	//Определяем границы
	var border_x_max = mid_x + hex_size_x/2; 
	var border_x_min = mid_x - hex_size_x/2; 
	var border_y_max = mid_y + hex_size_y/2; 
	var border_y_min = mid_y - hex_size_y/2; 
	
	//Находим ID соседа
	nodes.forEach(function(node, i, nodes){
		if(node.pos.mid.x < border_x_max && node.pos.mid.x > border_x_min && node.pos.mid.y < border_y_max 	&& node.pos.mid.y > border_y_min){			
			id = node.id;		
		}		
	});
	
	return id;
}

//Получаем ID соседних узлов или 0, если соседей нет
Map.prototype.setIdNeighbors = function (){ 
	var that 		 = this;
	var nodes		 = this.nodes;
	var hex_size_x 	 = this._setting.hex.size.x;
	var hex_size_y	 = this._setting.hex.size.y;	
	//Обход по часовой стрелке с 00:00
	//(top) -> (right-top) -> (right-down) -> (down) -> (left-down) -> (left-top)	
	
	nodes.forEach(function(node, i, nodes){
		var node_mid_x = node.pos.mid.x;
		var node_mid_y = node.pos.mid.y;
		
		var neighbors = new Array;
		neighbors.push(
			{//top
				'mid_x' : node_mid_x,
				'mid_y' : node_mid_y - hex_size_y
			},
			{//right-top
				'mid_x' : node_mid_x + 3*hex_size_x/4, 
				'mid_y' : node_mid_y - hex_size_y/2
			},
			{//right-down
				'mid_x' : node_mid_x + 3*hex_size_x/4, 
				'mid_y' : node_mid_y + hex_size_y/2				
			},
			{//down
				'mid_x' : node_mid_x,
				'mid_y' : node_mid_y + hex_size_y				
			},
			{//left-down
				'mid_x' : node_mid_x - 3*hex_size_x/4, 
				'mid_y' : node_mid_y + hex_size_y/2					
			},
			{//left-top
				'mid_x' : node_mid_x - 3*hex_size_x/4, 
				'mid_y' : node_mid_y - hex_size_y/2					
			}
		);

		neighbors.forEach(function(neighbor, i){
			node.neighbors[i]  = that.searchIdNeighbor(neighbor.mid_x, neighbor.mid_y);
		});
	});
}

//Узел 
function Node(id, x, y, mid_x, mid_y){
	//id узла
	this.id = id;
	
	//Позиция узла при рисовании и его центр
	this.pos = {
		'drow_point' : {
			'x' : x,
			'y' : y
		},
		'mid' : {
			'x' : mid_x,
			'y' : mid_y,
		}
	}
}

//Обычный узел на карте
function UsualNode(id, x, y, mid_x, mid_y, id_gen){
	Node.apply(this, arguments);	
	
	//id генератора для данного узла
	this.id_gen = id_gen;
	
	//Соседние гексагоны
	//Обход по часовой стрелке с 00:00
	//(top) -> (right-top) -> (right-down) -> (top) -> (left-down) -> (left-down)
	this.neighbors = new Array;
	
	//Гексагон, связанный с этой точкой
	this.hex = false;
	
	//Состояние гексагона
	this.state_hex = 'unstate';
		//unstate 		 состояние, когда нет гексагона, связанного с узлом
		//move_down движется к узлу на карте
		//move_down_in_gen движется к узлу в генераторе
		//drop			 уничтожается гексагон
		//change   		 меняется
		//state_in_node	 стоит в узле
	
	//Детали конкретного движения
	this.details = false;
}


//Узел - генератор
//Обычный узел на карте
function GenNode(id, x, y, mid_x, mid_y, border){
	Node.apply(this, arguments);

	//Cвободен ли узел - генератор
	this.is_empty = true;
	
	//Граница (по y), после которой происходит генерация нового элемента 
	//<0, если мы не хотим видеть генерируемые гексагоны
	if(border > 0){ 
		border = 0; 
	}
	
	this.border = border;
}

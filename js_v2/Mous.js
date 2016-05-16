function Events(setting, map, logic){	
	this._setting 	= setting;
	this._map 		= map;
	this._logic		= logic;
	this.addEvent();
}

Events.prototype.addEvent = function(){
	var canvas = this._setting.canvas;
	var map	   = this._map;
	
	//Нода, на которую нажали
	this.down_node = false;
	//Позиция мышки в предыдущем моменте
	this.pos_before_x = 0;
	this.pos_before_y = 0;
	
	//---------------------------------------РАБОТА С МЫШОЙ
	//навешиваем событие на клик по карте
	canvas.addEventListener('mousedown', function (event) {
		var mouse_x = event.pageX - event.target.offsetLeft;
		var mouse_y = event.pageY - event.target.offsetTop;		
		this.down(mouse_x, mouse_y);
	}.bind(this));
	
	//навешиваем событие на отжатие кнопки
	canvas.addEventListener('mouseup', function (event) {
		this.back();		
	}.bind(this));
	
	//Движение гексагона за мышкой
	canvas.addEventListener('mousemove', function (event) {
		var mouse_x = event.pageX - event.target.offsetLeft;
		var mouse_y = event.pageY - event.target.offsetTop;			
		this.move(mouse_x, mouse_y);	
	}.bind(this));	
	
	//Если мышка ушла из канваса
	canvas.addEventListener('mouseout', function (e) {
		this.back();
	}.bind(this));	
	
	
	
	//----------------------------РАБОТА С СЕНТОРНЫМ ЭКРАНОМ
	canvas.addEventListener('touchstart', function (event) {
		var pos_x = event.touches[0].pageX-event.target.offsetLeft;
		var pos_y = event.touches[0].pageY-event.target.offsetTop;	
		this.down(pos_x, pos_y);		
	}.bind(this));
	
	//навешиваем событие на клик по карте
	canvas.addEventListener('touchmove', function (event) {
		var pos_x = event.touches[0].pageX-event.target.offsetLeft;
		var pos_y = event.touches[0].pageY-event.target.offsetTop;			
	}.bind(this));
	
	//навешиваем событие на отжатие кнопки
	canvas.addEventListener('touchend', function (e) {
		this.back();
	}.bind(this));

}


//Действия при нажатии мышки/пальца тача по canvas
Events.prototype.down = function(pos_x, pos_y){
	var map = this._map;
	
	var node = map.getNodeByPos(pos_x, pos_y);
		
	if(node){
		if(node.state_hex === 'state_in_node'){
			this.down_node = node;
			this.pos_before_x = pos_x;
			this.pos_before_y = pos_y;				
		}
	}
}


//Действия при движении мышки/пальца тача по canvas (pos x:y - позиции оных на канвасе)
Events.prototype.move = function(pos_x, pos_y){
	if(this.down_node !== false){
		var down_node = this.down_node;	
		var hex = down_node.hex;
		
		//Изменение движения мышки			
		var cange_x = pos_x - this.pos_before_x;
		var cange_y = pos_y - this.pos_before_y;		

		//Размер гексагона
		var hex_size_x  = this._setting.hex.size.x;
		var hex_size_y  = this._setting.hex.size.y;
				
		hex.setDrowPos(hex.pos.drow_point.x + cange_x, hex.pos.drow_point.y + cange_y);
		
		var in_ellipse =  Math.pow((Math.abs(hex.pos.mid.x)-Math.abs(down_node.pos.mid.x)),2)/Math.pow((hex_size_x/3),2) + Math.pow((Math.abs(hex.pos.mid.y)-Math.abs(down_node.pos.mid.y)),2)/Math.pow((hex_size_y/3),2);
		
		if(in_ellipse <= 1){			
			this.down_node.state_hex = "change";			
			this.pos_before_x = pos_x;
			this.pos_before_y = pos_y;
		} else {
			down_node.state_hex = 'state_in_node';
			var distance = MyMath.getDistanceBetweenTwoPoints(0,0,hex_size_x,hex_size_y);
			var distance_neighbor = 0;
			var nearest_node = false;
			//Если гексагон вышел за пределы элипса, проверяем ближайший гексагон
			this.down_node.neighbors.forEach(function(neighbor){
				if(neighbor!==false){
					distance_neighbor = MyMath.getDistanceBetweenTwoPoints(neighbor.pos.mid.x,neighbor.pos.mid.y,hex.pos.mid.x, hex.pos.mid.y);
					if(distance_neighbor < distance){
						nearest_node = neighbor;
						distance = distance_neighbor;
					}
				}
			});
			
			if(nearest_node !== false && nearest_node.state_hex === 'state_in_node'){
				var type_down_node 		= down_node.hex.type;
				var type_nearest_node 	= nearest_node.hex.type;					
				
				var logic		= this._logic
				var count_n_row = this._setting.count_n_row;
				
				//Делаем проверку на то, сколько n рядов образуется при обмене
				var checker = false;					
				down_node.hex.type 		= type_nearest_node;
				nearest_node.hex.type 	= type_down_node;
				if(logic.searchRow(down_node,[]).length >= count_n_row || logic.searchRow(nearest_node,[]).length >= count_n_row){
					checker = true;
				}					
				down_node.hex.type 	  = type_down_node;
				nearest_node.hex.type = type_nearest_node;

				//Если образовался хотябы 1н ряд
				if(checker){
					down_node.hex = nearest_node.hex;
					nearest_node.hex = hex;					
					nearest_node.state_hex = "move_to_node";
					down_node.state_hex = "move_to_node";
				}
				
			} 
			this.down_node.state_hex = "move_to_node";
			this.down_node = false;	
		}
	}
}


//Действие при отжатии кнопки мыши / убирания пальца с экрана / конваса
Events.prototype.back = function(){
	if(this.down_node !== false){
		this.down_node.state_hex = "move_to_node";
		this.down_node = false;			
	}
}
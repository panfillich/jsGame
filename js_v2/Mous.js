function Mous(setting, map, logic){	

	
	this._setting 	= setting;
	this._map 		= map;
	this._logic		= logic;
	this.addEvent();
}

Mous.prototype.addEvent = function(){
	var canvas = this._setting.canvas;
	var map	   = this._map;
	
	//Нода, на которую нажали
	this.down_node = false;
	//Позиция мышки в предыдущем моменте
	this.pos_before_x = 0;
	this.pos_before_y = 0;
	
	//навешиваем событие на клик по карте
	canvas.addEventListener('mousedown', function (e) {
		var mouse_x = e.pageX - e.target.offsetLeft;
		var mouse_y = e.pageY - e.target.offsetTop;		
		
		var node = map.getNodeByPos(mouse_x, mouse_y);
		
		if(node){
			//node.state_hex = 'drop';
			
			if(node.state_hex === 'state_in_node'){
				this.down_node = node;
				this.pos_before_x = mouse_x;
				this.pos_before_y = mouse_y;				
			}
		}
		
	}.bind(this));
	
	
	//навешиваем событие на отжатие кнопки
	canvas.addEventListener('mouseup', function (e) {
		if(this.down_node !== false){
			this.down_node.state_hex = "move_to_node";
			this.down_node = false;			
		}
	}.bind(this));
	
	//Движение гексагона за мышкой
	canvas.addEventListener('mousemove', function (e) {
		if(this.down_node !== false){
			var down_node = this.down_node;	
			var mouse_x = e.pageX - e.target.offsetLeft;
			var mouse_y = e.pageY - e.target.offsetTop;			
			var hex = down_node.hex;
			
			//Изменение движения мышки			
			var cange_x = mouse_x - this.pos_before_x;
			var cange_y = mouse_y - this.pos_before_y;		

			//Размер гексагона
			var hex_size_x  = this._setting.hex.size.x;
			var hex_size_y  = this._setting.hex.size.y;
					
			hex.pos.drow_point.x = hex.pos.drow_point.x + cange_x;
			hex.pos.drow_point.y = hex.pos.drow_point.y + cange_y;
			hex.pos.mid.x 		 = hex.pos.mid.x + cange_x;
			hex.pos.mid.y        = hex.pos.mid.y + cange_y;	
			
			
			var in_ellipse =  Math.pow((Math.abs(hex.pos.mid.x)-Math.abs(down_node.pos.mid.x)),2)/Math.pow((hex_size_x/3),2) + Math.pow((Math.abs(hex.pos.mid.y)-Math.abs(down_node.pos.mid.y)),2)/Math.pow((hex_size_y/3),2);
			
			if(in_ellipse<=1){			
				this.down_node.state_hex = "change";			
				this.pos_before_x = mouse_x;
				this.pos_before_y = mouse_y;
			} else {
				
				
				down_node.state_hex = 'state_in_node';
				var distance = MyMath.getDistanceBetweenTwoPoints(0,0,hex_size_x,hex_size_y);
				var distance_neighbor = 0;
				var nearest_node = false;
				//Есди вышел, проверяем ближайший гексагон
				this.down_node.neighbors.forEach(function(neighbor){
					if(neighbor!==false){
						distance_neighbor = MyMath.getDistanceBetweenTwoPoints(neighbor.pos.mid.x,neighbor.pos.mid.y,hex.pos.mid.x, hex.pos.mid.y);
						if(distance_neighbor < distance){
							nearest_node = neighbor;
							distance = distance_neighbor;
						}
					}
					

				}.bind(this));
				
				
				if(nearest_node !== false && nearest_node.state_hex === 'state_in_node'){
					
					//Делаем проверку
					
					
					var type1 = down_node.hex.type;
					var type2 = nearest_node.hex.type;
					
					down_node.hex.type = type2;
					nearest_node.hex.type = type1;
					
					
						var nodes 		= this._map.nodes;
						var map 		= this._map;
						var logic		= this._logic
						
						//n рядов
						var count_n_row = this._setting.count_n_row;						
						var arr_rows = [];
						
						logic.row = [];
						
						//Много логики, так быстрее чем через callback
						for(var i = 0; i < nodes.length; i++){
							if(nodes[i].state_hex === 'state_in_node' && nodes[i].count_n_row === 0) {
								nodes[i].count_n_row = 1;
								logic._searchNRow(nodes[i]);
								for(var j = 0; j < logic.row.length; j++){
									logic.row[j].count_n_row = logic.row.length;
								}
								logic.row = [];
							}
							
						}
						
					down_node.hex.type = type1;
					nearest_node.hex.type = type2;	
						
					if(down_node.count_n_row >= count_n_row || nearest_node.count_n_row >= count_n_row){
						down_node.hex = nearest_node.hex;
						nearest_node.hex = hex;					
						nearest_node.state_hex = "move_to_node";
						down_node.state_hex = "move_to_node";
					}


					nodes.forEach(function(node){
						node.count_n_row = 0;		
					});
					
					this.down_node.state_hex = "move_to_node";
					this.down_node = false;
					
				} else {

					this.down_node.state_hex = "move_to_node";
					this.down_node = false;	
				}
			}
		}
	}.bind(this));	
	
	//Если мышка ушла из канваса
	canvas.addEventListener('mouseout', function (e) {
		if(this.down_node !== false){
			this.down_node.state_hex = "move_to_node";
			this.down_node = false;			
		}
	}.bind(this));	
	
	


	canvas.addEventListener('touchstart', function (event) {
		var mouse_x=event.touches[0].pageX-event.target.offsetLeft;
		var mouse_y=event.touches[0].pageY-event.target.offsetTop;		
		
		//document.write('Так тоже работает [' + mouse_x + ':' + mouse_y+']');
		
		var node = map.getNodeByPos(mouse_x, mouse_y);
		
		if(node){
			//node.state_hex = 'drop';
			
			if(node.state_hex === 'state_in_node'){
				this.down_node = node;
				this.pos_before_x = mouse_x;
				this.pos_before_y = mouse_y;				
			}
		}
		
	}.bind(this));
	
	//навешиваем событие на клик по карте
	canvas.addEventListener('touchmove', function (event) {
		if(this.down_node !== false){
			var down_node = this.down_node;	
			var mouse_x=event.touches[0].pageX-event.target.offsetLeft;
			var mouse_y=event.touches[0].pageY-event.target.offsetTop;			
			var hex = down_node.hex;
			
			//Изменение движения мышки			
			var cange_x = mouse_x - this.pos_before_x;
			var cange_y = mouse_y - this.pos_before_y;				
					
			hex.pos.drow_point.x = hex.pos.drow_point.x + cange_x;
			hex.pos.drow_point.y = hex.pos.drow_point.y + cange_y;
			hex.pos.mid.x 		 = hex.pos.mid.x + cange_x;
			hex.pos.mid.y        = hex.pos.mid.y + cange_y;		

			this.down_node.state_hex = "change";			
			this.pos_before_x = mouse_x;
			this.pos_before_y = mouse_y;			
		}
		
	}.bind(this));
	
	
	//навешиваем событие на отжатие кнопки
	canvas.addEventListener('touchend', function (e) {
		if(this.down_node !== false){
			this.down_node.state_hex = "move_to_node";
			this.down_node = false;			
		}
	}.bind(this));
}

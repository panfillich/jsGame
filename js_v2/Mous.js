function Mous(setting, map){
	this._setting 	= setting;
	this._map 		= map;
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
			if(node.state_hex === 'state_in_node'){
				this.down_node = node;
				this.pos_before_x = mouse_x;
				this.pos_before_y = mouse_y;
				/*node.hex = false;
				node.state_hex = 'unstate';*/
			}
		}
		
	}.bind(this));
	
	//навешиваем событие на отжатие кнопки
	canvas.addEventListener('mouseup', function (e) {
		if(this.down_node !== false){
			this.down_node.state_hex = "move_down";
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
			
			down_node.state_hex = "change";
			
			hex.pos.drow_point.x = hex.pos.drow_point.x + cange_x;
			hex.pos.drow_point.y = hex.pos.drow_point.y + cange_y;
			hex.pos.mid.x 		 = hex.pos.mid.x + cange_x;
			hex.pos.mid.y        = hex.pos.mid.y + cange_y;
			
			this.pos_before_x = mouse_x;
			this.pos_before_y = mouse_y;
		}
	}.bind(this));
}

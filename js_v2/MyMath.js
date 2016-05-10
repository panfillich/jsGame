//Различные математические и геометрические рассчеты
var MyMath = {
	//Получить расстояние между двумя точками
	'getDistanceBetweenTwoPoints' : function(x1,y1,x2,y2){
		return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
	},
	
	//Получить измененные по x,y	зная проеханное растояние от точки до точки
	'getPosWhithSpeed'	: function(s,x1,y1,x2,y2){
		//смещение s 		
		//положение точки, откуда начинается движение [X1:Y1]
		//положение точки, куда двигаемся [X2:Y2]
		
		var g = MyMath.getDistanceBetweenTwoPoints(x1,y1,x2,y2);//Гипотенуза	
		
		var size_pos_x = Math.abs(x2 - x1) * s / g;
		var size_pos_y = Math.abs(y2 - y1) * s / g;
		
		var new_pos_x = x1 + size_pos_x;		
		if((new_pos_x > x1 && new_pos_x > x2) || (new_pos_x < x1 && new_pos_x < x2)){
			new_pos_x = x1 - size_pos_x;
		}
		
		var new_pos_y = y1 + size_pos_y;		
		if((new_pos_y > y1 && new_pos_y > y2) || (new_pos_y < y1 && new_pos_y < y2)){
			new_pos_y = y1 - size_pos_y;
		}
		
		return {'x':new_pos_x,'y':new_pos_y};
	}
}
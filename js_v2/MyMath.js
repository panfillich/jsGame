//Различные математические и геометрические рассчеты
var MyMath = {
	//Получить расстояние между двумя точками
	'getDistanceBetweenTwoPoints' : function(x1,y1,x2,y2){
		return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
	},
	
	//Получить изменение по x,y	зная проеханное растояние от точки до точки
	'getPosWhithSpeed'	: function(S,Xh,Yh,Xp,Yp){
		//смещение S 		
		//положение точки, откуда начинается движение [Xh:Yh]
		//положение точки, куда двигаемся [Yp:Xp]
		
		//Находим A,B,C линейного уравнения Ax+By+C=0
		var A = Yp - Yh;
		var B = Xh - Xp;
		var C = Xp*Yh - Xh*Yp;
		
		//Находим Y через sin
		var G = MyMath.getDistanceBetweenTwoPoints(Xh,Yh,Xp,Yp);//Гипотенуза	// Math.abs(Math.sqrt(Math.pow((Yp - Yh), 2) + Math.pow((Xp - Xh), 2)));
		var Sin = Math.abs(Yp - Yh)/G;
		
		//Смещение в пикселях
		var Ys,Xs;
		var Ys1 =  Sin*S + Yh;
		var Ys2 = -Sin*S + Yh;
		
		if((Ys1 <= Yh && Ys1 >= Yp) || (Ys1 >= Yh && Ys1 <= Yp)){
			Ys = Ys1;
		} else {
			Ys = Ys2;
		}
		
		Xs = -(B*Ys+C)/A;
		
		return {'x':Xs,'y':Xs};
	}
}
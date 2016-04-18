;//Генерируем карту игры
(function(){
	//id родителя, в котором рисуем поле
	var id_fild = 'windows-game';
	
	//Кол-во клеток по оси x и y
	var y_cell = 20;
	var x_cell = 20;
	
	//Ширина и высота
	var width  = 100;
	var height = 100;
	
	//в пикселях или процентах 
	var type = 'px';

	var convas = document.createElement('convas');
	convas.className = "alert alert-success";

	document.getElementById(id_fild).appendChild(convas);
})();

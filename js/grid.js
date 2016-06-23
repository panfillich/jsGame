//Создаем координатную сеть
function CreateGrid(setting){

	var context = setting.context;
	
	//Ширина и высота поля	
	var map_width  = setting.map.size.x;
	var map_height = setting.map.size.y;

	//Ширина и высота клетки
	var sell_width  = setting.grid.sell.size.x;
	var sell_height = setting.grid.sell.size.x;

	//Рисуем вертикальные линии
	for (var x = sell_width; x <= map_width - sell_width; x += sell_width) {
		context.moveTo(x, 0);
		context.lineTo(x, map_height);
	}

	//Рисуем горизонтальные линии
	for (var y = sell_height; y <= map_height - sell_height; y += sell_height) {
		context.moveTo(0, y);
		context.lineTo(map_width, y);
	}
}

//Отрисовываем координатную сеть
function DrowGrid(setting){

	var context = setting.context;
	
	//Цвет сетки
	var color = setting.grid.color;
	
	//Это все были «карандашные» методы. На самом деле, на холсте еще ничего не нарисовано,
	//нам нужны «чернильные» методы, чтобы сделать рисунок видимым.
	context.strokeStyle = color;
	context.stroke()

}
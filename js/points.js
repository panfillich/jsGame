//Работа с очками
function Points(setting, logic){
	//id окна	
	var id_points = setting.id_points;
	
	if(id_points != undefined){		
		var span_points = document.getElementById(id_points);
		if(span_points != undefined){
			
			span_points.innerText = '0';
						
			//Создаем ф-ю обратного вызова
			//n_row - кол-во соседей в уничтожаемом ряду у 1го гексагона
			var collback = function(n_row){
				span_points.innerText = Number(span_points.innerText) + n_row;
			}
			
			logic.setCollbackPoints(collback);
		} else {
			console.log('Error: не найден ID родителя (setting.id_points), для рисования окна с очками настроек');
		}
	} 
}
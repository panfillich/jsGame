function CreateCanvas(setting){

	var convas = document.createElement('canvas');

	convas.setAttribute('id', 'map_'+ setting.id_game);
	convas.setAttribute('width', setting.map.size.x);
	convas.setAttribute('height', setting.map.size.y);
	
	document.getElementById(setting.id_game).appendChild(convas);
	
	//навешиваем событие на клик по карте
	convas.addEventListener('mouseup', function (e) {
		var mouse_x = e.pageX - e.target.offsetLeft;
		var mouse_y = e.pageY - e.target.offsetTop;
		
		
		alert('Вы кликнули на [' + mouse_x + ':' + mouse_y + ']');
	});

	setting.convas  = convas;
	setting.context = convas.getContext("2d");
	
	if(setting.log){
		console.log('Canvas игры '+ setting.id_game +' сформирован.');
	}
}
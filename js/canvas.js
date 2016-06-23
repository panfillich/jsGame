function CreateCanvas(setting){
	if(document.getElementById('map_'+ setting.id_game) == undefined){
		canvas = document.createElement('canvas');

		canvas.setAttribute('id', 'map_'+ setting.id_game);
		canvas.setAttribute('width', setting.map.size.x);
		canvas.setAttribute('height', setting.map.size.y);
		
		document.getElementById(setting.id_game).appendChild(canvas);
		
		setting.canvas  = canvas;
		setting.context = canvas.getContext("2d");
	}
	else {
		setting.canvas.setAttribute('width', setting.map.size.x);
		setting.canvas.setAttribute('height', setting.map.size.y);
	}
	if(setting.log){
		console.log('Canvas игры '+ setting.id_game +' сформирован.');
	}
}
function CreateCanvas(setting){

	var canvas = document.createElement('canvas');

	canvas.setAttribute('id', 'map_'+ setting.id_game);
	canvas.setAttribute('width', setting.map.size.x);
	canvas.setAttribute('height', setting.map.size.y);
	
	document.getElementById(setting.id_game).appendChild(canvas);
	
	setting.canvas  = canvas;
	setting.context = canvas.getContext("2d");
	
	if(setting.log){
		console.log('Canvas игры '+ setting.id_game +' сформирован.');
	}
}
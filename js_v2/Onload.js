//Статическое свойство, показывающее польностью ли загрузились ресурсы
Onload.status = false;

//Массив действия после загрузки всех ресурсов;
Onload.all_actions = new Array();

//Выполняем действия после загрузки
Onload.start_actions = function(){
	Onload.status = true;
	Onload.all_actions.forEach(function(action){
		action();
	});
}

//Действие после загрузки ресурсов, для каждой игры свой набор действий
function Onload(setting, next_action){
	Onload.all_actions.push(
		function(){
			if(setting.log){
				console.log('Ресурсы для игры ' + setting.id_game + ' загружены.' + setting.log);
			}
			next_action();
		}
	);
}

//Действия после загрузки  страницы / скриптов / картинок
window.onload = function(){
	Onload.start_actions();
} 
//Загружаем игру

var files = [
	'loading',	    //контроль загрузки
    'setting',      //глобальные настройки
    'type_hex',     //создаем типы гексагонов
	
    'motion',       //анимация и движение гексагонов
	
	'map',           //создаем карту
	'hex'
];

//Добавляем скрипты в нужном порядке
files.forEach(function(file, number, files) {
  addScript(file,'js');
});

//Добавить скрипт
function addScript(name,folder){
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= folder+'/'+name+'.js';
    head.appendChild(script);
}
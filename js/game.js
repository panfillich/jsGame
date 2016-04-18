//Загружаем игру

var files = [
    'constuctors', //классы
    'static',       //глобальные переменные
    'type_hex',     //создаем типы гексагонов
    'map'           //создаем карту
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
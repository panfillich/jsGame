//Загружаем игру

var files = [
    'constructors', //классы
    'static',       //глобальные переменные
    'type_hex',     //создаем типы гексагонов
    'map'           //создаем карту
];

//Добавить скрипт
function addScript(name){
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= name+'.js';
    head.appendChild(script);
}
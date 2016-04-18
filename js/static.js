
GameObject._global = new Object;
GameObject._global.id = 0; //Последний добавленый ID
GameObject._global.name_id = 'go'; //Css префикс для обьекта


Hexagon._global = new Object;
Hexagon._global.keys = [0,0,0,0,0,0]; // 0 - рядом ничего нет - пустота или граница карты
//  5/\0
//  4||1    -  схема ключей, дальше придерживаемся её
//  3\/2

TypeHex._global =  new Object;
TypeHex._global.id = 0;
TypeHex._global.active = new Array;
TypeHex._global.folder = 'img/hex_type';
TypeHex._global.style = '';
//Создаем различные типы гексагонов

TypeHex = Object.create(null);
//Папка с изображениями
TypeHex.folder = 'img/hex/'; 
//Последний ID
TypeHex.id = 0; 
//Массив всех типов
TypeHex.all = new Array(); 

//Получить тип по имени
TypeHex.getByName = function(name){
	var number_hex;
	TypeHex.all.forEach(function(hex,i,hexs){			
		if(name === hex.name){
			number_hex = i;
		}
	});
	return TypeHex.all[number_hex];
};

//Получить тип по id
TypeHex.getById = function(id){
	return TypeHex.all[id];
};

//Получить случайный тип по id
TypeHex.getRandom = function(){
	var id = Math.floor(Math.random() * (TypeHex.all.length));
	return TypeHex.all[id];
}

//Конструтор создания гексагонов
function CreateTypeHex(name,src){		
	this.img = new Image;
	this.img.src = TypeHex.folder + src;
	this.img.onload = (function(){
		//кол-во загруженных картинок гексагонов
		Loading.type_hex.img_count++;
		//проверяем загрузку
		Loading.type_hex.check();
	}).bind(this);
	this.id = TypeHex.id++;
	this.name = name;
	this.action = function(){
		return false;
	};	
	TypeHex.all.push(this); 
	//кол-во созданных экземпляров гексагонов
	Loading.type_hex.exemplar_count++;
}
CreateTypeHex.prototype = Object.create(null);

//создаем гексагоны	
new CreateTypeHex('red','red.gif');
new CreateTypeHex('blue','blue.gif');
new CreateTypeHex('fill','fill.gif');
new CreateTypeHex('green','green.gif');
new CreateTypeHex('yellow','yellow.gif');

//Признак того, что все типы гексагонов загружены и мы ждем загрузки их картинок
Loading.type_hex.finish_load_exemplar = true; 
Loading.type_hex.check();

// Справочно	
// пример картинки, заданной строкой
// src = 'data:image/gif;base64,R0lGODlhDAAMAOYAANPe5Pz//4KkutDb4szY3/b+/5u5z/3//3KWrfn//8rk8naasYGkuszY4Mbg8qG+0dzv9tXg5sTg8t/o7vP8/4iqv9ft9NPe5qfD1Mfc56O/0YKlu+Lr8M3Z4JCwxuj2/Of0+eDz9+rw9Z68z8/n8sHe8sbT3Ju6zuDv96nE1Onw9Nbh6cvX39Hq89Hq8u77/srW3tbh54Kku8ba56TD1u37/vL8/vL8/9ft9ebu8+Ps8bzM1Ymsw7XR4Nnj6Yanvsnj8qrI2Or2/NTf5tvl68vY3+r3/HqdtNji6OXt8eDz+dLc477c7bDO3t7n7d7v9s3Z4dbs9N/y98Pd6PX+/8/b4f7//+Hp7tDo8vv//+fu84GjunKWro6uxHqctOfu9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAeEgCJfg4RfWlo5KlpgjI2OOklWBwcBAVmXCQlXHAUFVBkGBjMUNzZOEy81IF2sXUZCH0QrDyhPGzICAkohUj4XHhoQKQsLGDgWUTFIJxUjUy0uWNIkQxE9W9gMDD9BCgpLAEBNXl5H5F40DlUDEkxc71wICDwlDQBQHQ0EBEUsJjswBgQCADs=';
	
	
	
	
	

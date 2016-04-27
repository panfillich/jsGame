//Зарузка изображений
function Loading(id_game, setting){
	console.log('Загрузка ресурсов для игры ' + id_game + '.');
	setting.image_store.forEach(function(image,i,image_store){
		//image.name - внутреннее название изображения
		//image.file_name - название файла картинки
		//image.type - тип изображения / оно же папка для храниния внутри папки this.setting.image_folder
		//i 		 - номер в массиве, он же id картинки
		//folder	 - папка со всеми картинками
		
		image_store[i] = new LoadImage(image, i, setting.image_folder);
	});
}

//Загрузка, контроль и сохранения 1-го изображения
function LoadImage(image, id, folder){	
	//Загружена картинка или нет
	this.loading = false;
	
	//id картинки
	this.id = id;
	
	//Внутреннее имя картинки
	this.name = image.name;
	
	//Тип картинки
	this.type = image.type
	
	//Название папки в которой лежит картинка
	this.folder = image.type;
	
	//Создаем картинку
	this.img = new Image;
	this.img.src = folder + '/' + this.folder + '/' + image.file_name;
	this.img.onload = (function(){
		console.log('Изображение "' + this.img.src + '" загружено.');
		this.loading = true;
	}).bind(this);
}

//Работа с картинками
function Images(image_store){
	var store = image_store;
	return {
		//Найти картинку по ID
		'getImageById' : function(id){
			store.forEach(function(image,i){
				if(image.id === id){
					return image;
				}
			});
		},
		
		//Найти картинку по имени
		'getImageByName' : function(name){
			store.forEach(function(image,i){
				if(image.name === name){
					return image;
				}
			});
		},
		
		//Найти картинки по типу
		'getImagesByType' : function(type){
			var images = new Array;
			store.forEach(function(image,i){
				if(image.type === type){
					images.push(image);
				}
			});
		},	
	}
}

	
	

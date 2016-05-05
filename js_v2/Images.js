//Работа с хранилищем изображений
function images(image_store){
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
			return images;
		},	
	}
}
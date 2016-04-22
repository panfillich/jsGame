//--контроль общей загрузки
Loading = Object.create(null);

Loading.type_hex = Object.create(null);
//---/ Контроль загрузки типов гексагонов и их картинок /------------//

	//кол-во загруженных картинок гексагонов
	Loading.type_hex.img_count = 0;

	//кол-во созданных экземпляров типов гексагонов
	Loading.type_hex.exemplar_count = 0;

	//Признак того, что мы закончили создание экземпляров типов гесагонов и ждем загрузки их картинок
	Loading.type_hex.finish_load_exemplar = false;

	//Признак того, что мы закончили загрузку картинок всех типов гексагонов
	Loading.type_hex.finish = false;

	//Действия после создания экземпляров типов гексагонов и загрузки их картинок
	Loading.type_hex.check = function(){
		if(Loading.type_hex.finish_load_exemplar){
			//Если кол-во экземпляров и кол-во загруженых картинок совпало т.е. полная загрузка
			if(Loading.type_hex.img_count === Loading.type_hex.exemplar_count){
				Loading.type_hex.finish = true;
				console.log('картинки гексагонов загружены');
				Loading.check();
			}
		}
	}
//--------------------------------------------------------------------//

//-------/ Контроль загрузки cтраницы /-------------------------------//
Loading.window = Object.create(null);
Loading.window.finish = false 
window.onload = function(){
	Loading.window.finish = true;
	console.log('страница загружена');
	Loading.check();
}
//--------------------------------------------------------------------//

Loading.check = function(){
	if(Loading.window.finish && Loading.type_hex.finish){
		go();
	}
}




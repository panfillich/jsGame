//Создание окна настроек
function CreateWinConfig(setting){
	//id окна	
	var id_config = setting.id_config;
	
	if(id_config != undefined){

		var win_config = document.getElementById(id_config);
		
		if(win_config != undefined){

			//Создаем div настроек
			var form = document.createElement('form');
			form.setAttribute('id', 'conf_'+ setting.id_game);
			//form.setAttribute('width', '100');
			//form.setAttribute('height', '500');		
			win_config.appendChild(form);
			
			CreateWinConfig._createInput();
			
		} else {
			console.log('Error: не найден ID родителя (setting.id_config), для рисования меню настроек');	
		}		
	}
	
	//Поработаем через замыкания
	function test(name, value, max, min){
		var input 	= document.createElement( 'input' );
		input.type 	= 'text';
		//input.name 	= prop.name;
		//input.value = prop.value;
		//form
	}
}



CreateWinConfig._createInput = function(name, value){
	var input 	= document.createElement( 'input' );
    input.type 	= 'text';
    //input.name 	= prop.name;
	//input.value = prop.value;
	return input;
}

CreateWinConfig._Createlabel = function(prop){
	var input 	= document.createElement( 'input' );
}

/*<form role="form">
 <div class="form-group">
  <label for="email">Email</label>
  <input type="email" class="form-control" id="email" placeholder="Введите email">
  <p class="help-block">Пример строки с подсказкой</p>
 </div>
 <div class="form-group">
  <label for="pass">Пароль</label>
  <input type="password" class="form-control" id="pass" placeholder="Пароль">
 </div>
 <div class="checkbox">
  <label><input type="checkbox"> Чекбокс</label>
 </div>
 <button type="submit" class="btn btn-success">Войти</button>
</form>*/
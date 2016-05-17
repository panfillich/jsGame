//Создание окна настроек
function CreateWinConfig(game){
	var setting = game.setting;
	//id окна	
	var id_config = setting.id_config;
	
	if(id_config != undefined){

		var win_config = document.getElementById(id_config);
		
		if(win_config != undefined){

			//Cоздаем форму, эта форма через замыкания передается всем внутренним ф-ям
			var form = createForm();
			win_config.appendChild(form);
			
			//Создаем пустые элмементы формы
			createElementsForm();
			
			//Заполняем элмементы формы
			setSetting(setting);
			
			//Cоздаем кнопки (win_config передаем через замыкания)
			createButtons();

		} else {
			console.log('Error: не найден ID родителя (setting.id_config), для рисования меню настроек');	
		}		
	}
	//Создаем панель кнопок
	function createButtons(){
		//Контейнер для кнопок
		var div_button = document.createElement('div');
		div_button.style.textAlign = 'center';
		div_button.style.width = '100%';
		div_button.style.float = 'left';
		
		//Сброс настроек
		createButton('Сбросить настройки', function(){				
			setSetting(setting);
		});
		
		//Кнопка рестарта игры
		var rest = createButton('Рестарт игры', function(){	
			pause.textContent = 'Пауза';
			game.restart(getSetting());
		});
		
		//Пауза
		var pause = createButton('Пауза', function(button){			
			if(button.textContent === 'Пауза'){
				game.setting.last_speed = game.setting.speed;
				game.setting.speed = 0;
				button.textContent = 'Старт';
			} else {
				game.setting.speed = game.setting.last_speed;
				button.textContent = 'Пауза';
			}				
		});
		
		//Помещаем контейнер с кнопками в основное поле настроек
		form.appendChild(div_button);
		
		//Создаем кнопку
		function createButton(title, action){
			var button = document.createElement('button');
			button.setAttribute('class', 'btn btn-success');
			button.style.margin = '5px'
			button.onclick = function(){
				action(button);
				return false;
			};
			button.textContent = title;
			div_button.appendChild(button);
			return button;
		}
	}
	
	//Создаем обертку элемента формы
	function createFormElem(){
		var form_elem = document.createElement( 'div' );
		form_elem.style.width		 = '262px';
		form_elem.style.display 	 = 'table';
		form_elem.style.height  	 = '65px';
		form_elem.style.float   	 = 'left';
		form_elem.style.marginRight  = '10px';
		return form_elem;
	}
	
	//Создаем обёртку для части элемента (для выравнивания по высоте)
	function createFormElemPart(){
		var form_elem_part = document.createElement( 'div' );
		form_elem_part.style.display 		= 'table-cell';
		form_elem_part.style.verticalAlign 	= 'middle';		
		return form_elem_part;
	}
	
	//Создаем лейбл
	function createLabel(text){
		var label = document.createElement( 'label' );
		label.style.textAlign 		= 'right';
		label.style.float 	  		= 'right';
		label.style.width 	  		= '110px';
		label.style.paddingRight	= '10px';	
		label.textContent     		= text;
		return label;
	}	
	
	//Создаем span (информация по корректности заполнения формы)
	function createSpan(text){
		var span = document.createElement( 'span' );		
		span.textContent = text;
		return span;
	}
	
	//Cоздаем Input
	function createInput(name, size, min, max){
		var input = document.createElement( 'input' );		
		input.name 	= name;
		input.setAttribute('size',size);
		//Т.к. адекватная поддержка классов начинается с IE10, а игра должна запускаться на IE 9+
		input.setAttribute('class','input-sm');
		
		//Валидация
		var checker	= function(){return true;};
		if(min != undefined && max != undefined){
			checker = function(){				
				if (input.value > max || input.value < min){
					input.value = (max + min)/2
				};
			}
		} else if(min != undefined && max == undefined){
			checker = function(){				
				if (input.value < min){
					input.value = min;
				}
			}
		} else if(min == undefined && max != undefined){
			checker = function(){				
				if (input.value > max){
					input.value = max;
				}
			}		
		}
		input.onchange = checker;
		
		return input;	
	}
	
	//Cоздаем элемент //работает через замыкания form берем из окружения
	function createElem(prop){
		//Передаваемые параметры
		var text_label 		= prop.tl;
		var	name_first		= prop.n1;
		var	name_second		= prop.n2;
		var valid_min		= prop.min;
		var valid_max		= prop.max;		
		
		var form_elem = createFormElem();
		
		//Лейбл
		var form_elem_part = createFormElemPart();
		form_elem_part.appendChild(createLabel(text_label));		
		form_elem.appendChild(form_elem_part);
		
		//Инпут + Подсказка по валидации	
		form_elem_part = createFormElemPart();
		
		var size = 17; //размер инпута
		if(name_second != undefined){
			size = 3;
		}
		
		form_elem_part.appendChild(createInput(name_first, size, valid_min, valid_max));		
		if(name_second != undefined){
			form_elem_part.appendChild(createSpan(' x '));		
			form_elem_part.appendChild(createInput(name_second, size, valid_min, valid_max));		
		}
		
		var valid = '';
		if(valid_min != undefined){
			valid += ' от ' + valid_min + ' ';
		}
		
		if(valid_max != undefined){
			valid += ' до ' + valid_max + ' ';
		}
		
		if(valid != null){
			form_elem_part.appendChild(createSpan('(' + valid + ')'));
		}
		form_elem.appendChild(form_elem_part);
		form.appendChild(form_elem);
	}
	
	//Получить настройки
	function getSetting(){		
		return {
			//Кол-во n в ряде
			'count_n_row' : Number(form.count_n_row.value),
			
			//Глобальный коэфициент скорости игры
			'speed' : Number(form.speed.value),

			//Размеры карты
			'map' : {
				'size': {'x' : Number(form.map_size_x.value), 
						 'y' : Number(form.map_size_y.value) }
			},
			
			//Гексагоны	
			'hex' : { 
				//Размеры
				'size' : {	'x' : Number(form.hex_size.value), 
							'y' : Number(form.hex_size.value)},
				//Скорость падения
				'speed_move_down' : Number(form.hex_speed_move_down.value),
				//Cкорость движения к узлу
				'speed_move_to_node' : Number(form.hex_speed_move_to_node.value),
				//Скорость исчезания в частях по диагонали
				'speed_drop' : Number(form.hex_speed_drop.value) 
			}	
		};
	}
	
	//Установить настройки по умолчанию
	function setSetting(setting){		
		form.count_n_row.value 	=	setting.count_n_row;	//Кол-во n в ряде
		form.speed.value		=	setting.speed;			//Глобальный коэфициент скорости игры
		form.map_size_x.value	=	setting.map.size.x;		//Размеры карты
		form.map_size_y.value	=	setting.map.size.y;
		form.hex_size.value		=	setting.hex.size.x;		//Размеры гексагона
		form.hex_speed_move_down.value		=	setting.hex.speed_move_down;	//Скорость падения
		form.hex_speed_move_to_node.value	=	setting.hex.speed_move_to_node;	//Cкорость движения к узлу
		form.hex_speed_drop.value			= 	setting.hex.speed_drop;			//Скорость исчезания в частях по диагонали
	}
	
	//Создать форму  - пустышку
	function createForm(){
		var form = document.createElement('form');
		form.setAttribute('id', 'conf_'+ setting.id_game);
		form.setAttribute('role', 'form');
		form.style.align = 'center';
		return form;
	}

	//Создаем пустые элементы формы
	function createElementsForm(){
		createElem({'tl':'Кол-во n в ряде', 	'n1' : 'count_n_row', 	'min':1});
		createElem({'tl':'Размеры карты',		'n1' : 'map_size_x', 	'n2':'map_size_y', 'min':1, 'max' : 3000});
		createElem({'tl':'Размеры гексагона', 	'n1' : 'hex_size', 		'min':1, 'max' : 1000});
		createElem({'tl':'Глобальная скорость', 'n1' : 'speed', 	'min':0, 'max' : 1000});
		createElem({'tl':'Скорость падения', 	'n1' : 'hex_speed_move_down', 'min':0, 'max' : 1000});
		createElem({'tl':'Cкорость к узлу',		'n1' : 'hex_speed_move_to_node', 'min':0, 'max' : 1000});
		createElem({'tl':'Скорость исчезания', 	'n1' : 'hex_speed_drop', 'min':0.001, 'max' : 1});
	}
}

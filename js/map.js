;//Генерируем карту игры
(function(){



//-----| СВОЙСТВА |-----//

	//id родителя, в котором рисуем поле
	var id_fild = 'windows-game';
	
	//Кол-во клеток по оси x и y
	var sell_count_x = 20;
	var sell_count_y = 20;
	
	//высота и ширина клетки
	var sell_size_x = 20;	
	var sell_size_y = 20;	
	
	//цвет линий сетки
	var sell_color = '#eee';

	
	
//-----| ФОРМИРУЕМ CANVAS |-----//
	
	//Ширина и высота
	var map_width  = sell_count_x * sell_size_x;
	var map_height = sell_count_y * sell_size_y;

	//Задаем  свойства полю
	var convas = document.createElement('canvas');	
	convas.setAttribute('id', 'map');
	convas.setAttribute('width', map_width);
	convas.setAttribute('height', map_height);
	
	//Создаем поле
	document.getElementById(id_fild).appendChild(convas);
	
	
	
//-----| РИСУЕМ КООРДИНАТНУЮ СЕТЬ |-----//
	
	var context = convas.getContext("2d");
	
	function drowGrid(){
		//Рисуем вертикальные линии		
		for (var x = sell_size_x; x <= (map_width-sell_size_x); x += sell_size_x) {
			context.moveTo(x, 0);
			context.lineTo(x, map_height);
		}

		//Рисуем горизонтальные линии
		for (var y = sell_size_y; y <= (map_height-sell_size_y); y += sell_size_y) {
			context.moveTo(0, y);
			context.lineTo(map_width, y);
		}

		//Это все были «карандашные» методы. На самом деле, на холсте еще ничего не нарисовано, 
		//нам нужны «чернильные» методы, чтобы сделать рисунок видимым.
		context.strokeStyle = sell_color;
		context.stroke();
	}
	
	
//-----| РИСУЕМ ГЕКСАГОН |-----//
	
	var img = new Image();  // Создание нового объекта изображения
	img.src = 'image.png';  // Путь к изображению которое необходимо нанести на холст
	img.src = 'data:image/gif;base64,R0lGODlhDAAMAOYAANPe5Pz//4KkutDb4szY3/b+/5u5z/3//3KWrfn//8rk8naasYGkuszY4Mbg8qG+0dzv9tXg5sTg8t/o7vP8/4iqv9ft9NPe5qfD1Mfc56O/0YKlu+Lr8M3Z4JCwxuj2/Of0+eDz9+rw9Z68z8/n8sHe8sbT3Ju6zuDv96nE1Onw9Nbh6cvX39Hq89Hq8u77/srW3tbh54Kku8ba56TD1u37/vL8/vL8/9ft9ebu8+Ps8bzM1Ymsw7XR4Nnj6Yanvsnj8qrI2Or2/NTf5tvl68vY3+r3/HqdtNji6OXt8eDz+dLc477c7bDO3t7n7d7v9s3Z4dbs9N/y98Pd6PX+/8/b4f7//+Hp7tDo8vv//+fu84GjunKWro6uxHqctOfu9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAeEgCJfg4RfWlo5KlpgjI2OOklWBwcBAVmXCQlXHAUFVBkGBjMUNzZOEy81IF2sXUZCH0QrDyhPGzICAkohUj4XHhoQKQsLGDgWUTFIJxUjUy0uWNIkQxE9W9gMDD9BCgpLAEBNXl5H5F40DlUDEkxc71wICDwlDQBQHQ0EBEUsJjswBgQCADs=';
	
	img.onclick = function () {
		alert('попали');
	};
	
	
	
	
//-----| ПЕРЕМЕЩАЕМ ГЕКСАГОН |-----//	

	//-- инициализация с учётом браузерной совместимости
	window.MyRequestAnimationFrame = (function (callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000/60);
			};
	})();

	//-- старт анимации
	var iterator = 0;
	var speed = 0.1;
	
	MyAnimation = function () {
	  //Очищаем всю карту
	  context.clearRect(0,0,map_width,map_height);	 
	  //Отрисовываем в нужном порядке анимации
      context.drawImage(img,0*sell_size_x+iterator,0*sell_size_y);
	  
	  //скорость игры
      iterator = iterator + speed;
      if ( iterator > map_width) { iterator = 0; }
		
		window.MyRequestAnimationFrame(function () {
			MyAnimation();
		});
		
	}
	MyAnimation();
	
//--------| События по клику мышки |----------------//

convas.addEventListener('mouseup', function (e) {
    var mouse_x = e.pageX - e.target.offsetLeft;
    var mouse_y = e.pageY - e.target.offsetTop;
	//cобытие по клику мыши
	//mouse_event(mouse_x,mouse_y);
});



	
})();
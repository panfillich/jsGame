//Анимация и различные движения за кадр

var Motion = {
    //-----| РИСУЕМ КООРДИНАТНУЮ СЕТЬ |-----//
    'drowGrid' : function(){

        if(Setting.grid.view) {

            //Ширина и высота поля
            var map_width = Setting.map.width;
            var map_height = Setting.map.height;

            //Ширина и высота клетки
            var sell_width = Setting.sell.width;
            var sell_height = Setting.sell.height;

            //Цвет сетки
            var color = Setting.grid.color;

            //Рисуем вертикальные линии
            for (var x = sell_width; x <= (map_width - sell_width); x += sell_width) {
                Game.context.moveTo(x, 0);
                Game.context.lineTo(x, map_height);
            }

            //Рисуем горизонтальные линии
            for (var y = sell_height; y <= (map_height - sell_height); y += sell_height) {
                Game.context.moveTo(0, y);
                Game.context.lineTo(map_width, y);
            }

            //Это все были «карандашные» методы. На самом деле, на холсте еще ничего не нарисовано,
            //нам нужны «чернильные» методы, чтобы сделать рисунок видимым.
            Game.context.strokeStyle = Setting.grid.color;
            Game.context.stroke()
        }
    },

}
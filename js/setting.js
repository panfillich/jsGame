//-----| Настройки по умолчанию |-----//

var Setting = {
    //Клетки
    'sell' : {
        //Кол-во клеток по оси x и y
        'count_x' : 10,
        'count_y' : 12,
        //высота и ширина клетки
        'width' : 24,
        'height' : 20,
    },

    //Сетка
    'grid' : {
        //Показывать сетку или нет
        'view' : true,
        //Цвет сетки
        'color' : '#eee',
    },

    //гексагон
    'hex' : {
        //размер гексагона в клетках
        'sell_x' : 4,
        'sell_y' : 4,
    },

    //глобальная скорость игры / множитель
    'speed' : 1,

    //Имя родительского контейнера, где рисуется canvas
    'id_parent_canvas' : 'windows-game',

    //карта
    map : {
        //значение всех свойств рассчитываемое
    },

    //Расчет интрфейсозависимых параметры
    'recalculation' : function(){
        //Разсмеры карты
        Setting.map.width  =  Setting.sell.count_x * Setting.sell.width;
        Setting.map.height =  Setting.sell.count_y * Setting.sell.height;

        //Стандартные размеры гексагона
        Setting.hex.width  = Setting.hex.sell_x * Setting.sell.width;
        Setting.hex.height = Setting.hex.sell_x * Setting.sell.height;

        //Гексагон можно улосно разить на 12 частей
        //Размеры этих частей по x y
        Setting.hex.width_part  = Setting.hex.width/4;
        Setting.hex.height_part = Setting.hex.height/4;

        //Кол-во гексагонов по x и y
        Setting.hex.count_x  = ((Setting.map.width-Setting.hex.width_part)/(3*Setting.hex.width_part)).toString().replace(/\.[1-9]+\d*$/,'');
        Setting.hex.count_y  = ((Setting.map.height)/(Setting.hex.height)).toString().replace(/\.[1-9]+\d*$/,'');
    }
};



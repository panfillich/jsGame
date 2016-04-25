//Гексагон
//
//  id - id клетки
//
//
function Hex(id, x, y){
    this.pos_canvas_x = x;
    this.pos_canvas_y = y;
    this.id = id;
    this.status = 'gener';
    // gener        - гексагон генерируется
    // move_down    - гексагон падает вниз
    // move change  - гексагон меняется
    this.animation = new Array();


}

Hex.prototype = Object.create(null);
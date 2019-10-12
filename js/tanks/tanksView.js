/*

Mario view

*/

var View = function() {
    this.player = document.querySelector('.player');
    this.goomba = document.querySelector('.goomba');

    this.onKeyDownEvent = null;
};

View.prototype.init = function (){
    document.addEventListener('keydown', this.onKeyDownEvent);
};

View.prototype.render = function (objs) {
    this.player.style.left = 'calc(50% + ' + objs.player.x + 'px)';
    this.player.style.top = 'calc(68.5% + ' + objs.player.y + 'px)';


    this.player.classList.remove("right", "left", "top", "bottom");
    switch (objs.player.direction) {
        case "right": {
            this.player.classList.add("right");
            break;
        }
        case "left": {
            this.player.classList.add("left");
            break;
        }
        case "top": {
            this.player.classList.add("top");
            break;
        }
        case "bottom": {
            this.player.classList.add("bottom");
            break;
        }
    }


    this.goomba.style.left = 'calc(50% + ' + objs.goomba.x + 'px)';
    this.goomba.style.top = 'calc(70% + ' + objs.goomba.y + 'px)';
};

var tanksView = new View();
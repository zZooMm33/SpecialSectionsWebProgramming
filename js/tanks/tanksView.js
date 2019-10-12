/*

Tanks view

*/

var View = function() {
    // поля - объекты
    this.game = document.querySelector('.game');
    this.player = document.querySelector('.player');
    this.goomba = document.querySelector('.goomba');

    //звуки-музыка
    this.shotSound = document.querySelector('.shot');
    this.deathSound = document.querySelector('.death');
    this.startGameSound = document.querySelector('.startGame');
    this.hitEnemyTankSound = document.querySelector('.hitEnemyTank');

    // кнопки
    this.onKeyDownEvent = null;
    this.onKeyUpEvent = null;
};

View.prototype.init = function (){
    document.addEventListener('keydown', this.onKeyDownEvent);
    document.addEventListener('keyup', this.onKeyUpEvent);
};

View.prototype.checkSound = function (){

    var rad = document.querySelector("#soundsGameOn");

    if (rad.checked) return true;
    else return false;
};

View.prototype.newBullet = function (bullet){


    var div = document.createElement("div");
    div.setAttribute("class", "bullet");
    div.setAttribute("id", bullet.id );

    this.game.appendChild(div);

    //var bulletHTML = document.querySelector('#' + bullet.id);
    //bulletHTML.style.left = 'calc(50% + ' + bullet.x + 'px)';
    //bulletHTML.style.top = 'calc(70% + ' + bullet.y + 'px)';
};

View.prototype.deleteBullet = function (bullet){
    var bulletHTML = document.querySelector('#' + bullet.id);
    this.game.removeChild(bulletHTML);
};

View.prototype.render = function (objs) {
    this.player.style.left = objs.player.x + 'px';
    this.player.style.top = objs.player.y + 'px';


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


    $.each(objs.bullet, function(index, value) {

        try {
            var bullet = document.querySelector('#' + value.id);
            bullet.style.left = value.x + 'px';
            bullet.style.top = value.y + 'px';
        }
        catch (e) {
            // пуля была удалена во время отрисовки
        }
    });



    //this.goomba.style.left = 'calc(50% + ' + objs.goomba.x + 'px)';
    //this.goomba.style.top = 'calc(70% + ' + objs.goomba.y + 'px)';
};

var tanksView = new View();
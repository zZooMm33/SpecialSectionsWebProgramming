/*

Mario view

*/

var View = function() {
    this.mario = document.querySelector('.character');
    this.goomba = document.querySelector('.goomba');
    this.jumpSound = document.querySelector('.jump');

    this.onKeyDownEvent = null;
    this.onClickJumpEvent = null;
};

View.prototype.checkSound = function (){
    return true;
};

View.prototype.init = function (){
    document.addEventListener('keydown', this.onKeyDownEvent);
    document.addEventListener('click', this.onClickJumpEvent);
};

View.prototype.render = function (objs) {
    this.mario.style.left = 'calc(50% + ' + objs.player.x + 'px)';
    this.mario.style.top = 'calc(68.5% + ' + objs.player.y + 'px)';

    this.goomba.style.left = 'calc(50% + ' + objs.goomba.x + 'px)';
    this.goomba.style.top = 'calc(70% + ' + objs.goomba.y + 'px)';
};

var marioView = new View();
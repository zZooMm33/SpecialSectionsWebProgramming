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

View.prototype.init = function (){
    document.addEventListener('keydown', this.onKeyDownEvent);
    document.addEventListener('click', this.onClickJumpEvent);
};

View.prototype.render = function (objs) {
    this.mario.style.left = 'calc(50% + ' + objs.mario.x + 'px)';
    this.mario.style.top = 'calc(68.5% + ' + objs.mario.y + 'px)';

    this.goomba.style.left = 'calc(50% + ' + objs.goomba.x + 'px)';
    this.goomba.style.top = 'calc(70% + ' + objs.goomba.y + 'px)';
};

var marioView = new View();
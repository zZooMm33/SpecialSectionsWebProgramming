/*

Mario controller

*/

var Controller = function (View, Model) {
    this.marioView = View;
    this.marioModel = Model;
};

Controller.prototype.init = function() {
    this.marioView.onClickJumpEvent = this.jumping.bind(this);
    this.marioView.onKeyDownEvent = this.moving.bind(this);

    this.marioView.init();
    this.marioModel.init(this.needRendering.bind(this));
    this.needRendering();
};

Controller.prototype.moving = function(e) {
    this.marioModel.marioMove(e);
};

Controller.prototype.jumping = function() {
    this.marioModel.initMarioJump(this.marioView.jumpSound);
};

Controller.prototype.needRendering = function(){
    this.marioView.render(marioModel.objs);
};

Controller.prototype.dieMario = function() {
    this.marioView.mario.setAttribute('hidden', 'true');

    this.marioView.render(marioModel.objs);
};

Controller.prototype.dieGoomba = function() {
    this.marioView.goomba.setAttribute('hidden', 'true');

    this.marioView.render(marioModel.objs);
};

var marioController = new Controller(marioView, marioModel);

marioController.init();
/*

Mario controller

*/

var Controller = function (View, Model) {
    this.tanksView = View;
    this.tanksModel = Model;
};

Controller.prototype.init = function() {
    this.tanksView.onClickJumpEvent = this.jumping.bind(this);
    this.tanksView.onKeyDownEvent = this.moving.bind(this);

    this.tanksView.init();
    this.tanksModel.init(this.needRendering.bind(this));
    this.needRendering();
};

Controller.prototype.moving = function(e) {
    this.tanksModel.playerMove(e);
};

Controller.prototype.jumping = function() {
    this.tanksModel.initMarioJump(this.tanksView.jumpSound, this.tanksView.checkSound);
};

Controller.prototype.needRendering = function(){
    this.tanksView.render(tanksModel.objs);
};

Controller.prototype.dieMario = function() {
    this.tanksView.player.setAttribute('hidden', 'true');

    this.tanksView.render(tanksModel.objs);
};

Controller.prototype.dieGoomba = function() {
    this.tanksView.goomba.setAttribute('hidden', 'true');

    this.tanksView.render(tanksModel.objs);
};

var marioController = new Controller(tanksView, tanksModel);

marioController.init();
/*

tanks controller

*/

var Controller = function (View, Model) {
    this.tanksView = View;
    this.tanksModel = Model;
};

Controller.prototype.init = function() {
    this.tanksView.onKeyDownEvent = this.moving.bind(this);

    this.tanksView.init();
    this.tanksModel.init(this.needRendering.bind(this));

    this.needRendering();
};

Controller.prototype.moving = function(e) {
    this.tanksModel.playerMove(e);
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

var tanksController = new Controller(tanksView, tanksModel);

tanksController.init();
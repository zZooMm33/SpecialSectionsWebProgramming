/*

Tanks controller

*/

function startController() {
    var Controller = function (View, Model) {
        this.tanksView = View;
        this.tanksModel = Model;
    };

    Controller.prototype.init = function() {
        this.tanksView.onKeyDownEvent = this.moving.bind(this);

        this.tanksView.onKeyUpEvent = this.shot.bind(this);

        this.tanksView.init();
        this.tanksModel.init(this.needRendering.bind(this));

        this.needRendering();
    };

    Controller.prototype.moving = function(e) {
        this.tanksModel.playerMove(e);
    };

    Controller.prototype.shot = function(e) {
        this.tanksModel.playerShot(e, this.tanksView.shotSound, this.tanksView.checkSound());
    };

    Controller.prototype.needRendering = function(){
        this.tanksView.render(tanksModel.objs);
    };

    Controller.prototype.addEnemy = function(enemy){
        this.tanksView.newEnemy(enemy);
    };

    Controller.prototype.addBullet = function(bullet, className){
        this.tanksView.newBullet(bullet, className);
    };

    Controller.prototype.deleteBullet = function(bullet){
        this.tanksView.deleteBullet(bullet);
    };

    Controller.prototype.changeScore = function(score){
        this.tanksView.changeScore(score);
    };

    Controller.prototype.startSound = function(){

        if (this.tanksView.checkSound()){
            return this.tanksView.startGameSound;
        }
        else {
            return null;
        }

    };

    Controller.prototype.dieMario = function() {
        this.tanksView.player.setAttribute('hidden', 'true');

        this.tanksView.render(tanksModel.objs);
    };

    Controller.prototype.dieGoomba = function() {
        this.tanksView.goomba.setAttribute('hidden', 'true');

        this.tanksView.render(tanksModel.objs);
    };

    tanksController = new Controller(tanksView, tanksModel);

    tanksController.init();
}

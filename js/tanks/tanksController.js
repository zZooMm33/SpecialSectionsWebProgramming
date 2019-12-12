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

    Controller.prototype.deleteObject = function(object){
        this.tanksView.deleteObject(object);
    };

    Controller.prototype.changeScore = function(score){
        this.tanksView.changeScore(score);
    };

    Controller.prototype.changeLife = function(player){
        this.tanksView.changeLife(player);
    };
    Controller.prototype.changeLevel = function(level){
        this.tanksView.changeLevel(level);
    };

    Controller.prototype.startSound = function(){
        if (this.tanksView.checkSound()){
            return this.tanksView.startGameSound;
        }
        else {
            return null;
        }
    };

    Controller.prototype.hitEnemyTankSound = function(){

        if (this.tanksView.checkSound()){
            return this.tanksView.hitEnemyTankSound;
        }
        else {
            return null;
        }

    };

    tanksController = new Controller(tanksView, tanksModel);

    tanksController.init();
}

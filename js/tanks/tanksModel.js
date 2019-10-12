/*

Tanks model

*/

function startModel() {
    const LEFT_BORDER = 0;
    const RIGHT_BORDER = document.querySelector('.game').offsetWidth;
    const TOP_BORDER = 0;
    const BOTTOM_BORDER = document.querySelector('.game').offsetHeight;

    const INITIAL_PLAYER_X = (RIGHT_BORDER - 20) / 2;
    const INITIAL_PLAYER_Y = (BOTTOM_BORDER - 20) / 2;

    const PLAYER_STEP = 5;
    const BULLET_STEP = 10;
    const ENEMY_STEP = 5;

    const ENEMY_HP = 3;

    const PLAYER_LIVE = 3;
    var PLAYER_SCORE = 0;
    var PLAYER_TIME = 0;


    var StartDate = new Date();

    var Model = function () {
        this.objs = {
            player: {
                type: "player",
                x: INITIAL_PLAYER_X,
                y: INITIAL_PLAYER_Y,
                direction: 'top'
            },
            enemy: [],
            bullet: []
        };
    };

    Model.prototype.init = function(renderFunction){
        this.needRendering = renderFunction;

        requestAnimationFrame(this.movingBullet);
        requestAnimationFrame(this.stopwatch);
    };

    Model.prototype.setCoords = function (obj, x, y) {
        x = x == (undefined || null) ? obj.x : x;
        y = y == (undefined || null) ? obj.y : y;

        checkScreenBorders.call(this, obj, x, y);

        this.needRendering();
    };

    Model.prototype.getCoords = function (obj) {
        return {
            x: obj.x,
            y: obj.y
        }
    };

    Model.prototype.playerMove = function(e){
        if (PLAYER_TIME / 1000 <= 3) return;

        var keyCode = e.keyCode;
        var x = tanksModel.getCoords(tanksModel.objs.player).x;
        var y = tanksModel.getCoords(tanksModel.objs.player).y;

        switch (keyCode) {
            case 39: {
                tanksModel.objs.player.direction = "right";
                tanksModel.setCoords(tanksModel.objs.player, x + PLAYER_STEP);
                break;
            }
            case 37: {
                tanksModel.objs.player.direction = "left";
                tanksModel.setCoords(tanksModel.objs.player, x - PLAYER_STEP);
                break;
            }
            case 38: {
                tanksModel.objs.player.direction = "top";
                tanksModel.setCoords(tanksModel.objs.player,  null, y - PLAYER_STEP);
                break;
            }
            case 40: {
                tanksModel.objs.player.direction = "bottom";
                tanksModel.setCoords(tanksModel.objs.player,  null, y + PLAYER_STEP);
                break;
            }

        }
    };

    Model.prototype.playerShot = function(e, shot, sound){

        if (PLAYER_TIME / 1000 <= 3) return;
        var keyCode = e.keyCode;
        var x = tanksModel.getCoords(tanksModel.objs.player).x;
        var y = tanksModel.getCoords(tanksModel.objs.player).y;

        if (keyCode == 32){

            var bullet = {
                type: "bullet",
                name: "bulletPlayer",
                id: "bullet" + uuidv4(),
                direction: tanksModel.objs.player.direction
            };

            tanksModel.objs.bullet.push(bullet);
            tanksController.addBullet(bullet, "bulletPlayer");

            if (sound) shot.play();

            switch (tanksModel.objs.player.direction) {
                case "top":{
                    tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 17, y);
                    break;
                }
                case "bottom":{
                    tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 16, y + 35);
                    break;
                }
                case "left":{
                    tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x, y + 16);
                    break;
                }
                case "right":{
                    tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 35, y + 15);
                    break;
                }
            }

            PLAYER_SCORE = PLAYER_SCORE - 1;
            tanksController.changeScore(PLAYER_SCORE);
        }
    };


    Model.prototype.checkMarioGoombaCollision = function (player, goomba) {
        var marioLeft = player.getBoundingClientRect().left;
        var marioRight = player.getBoundingClientRect().right;
        var marioY = this.objs.player.y;
        var goombaLeft = goomba.getBoundingClientRect().left;
        var goombaRight = goomba.getBoundingClientRect().right;
        var goombaY = this.objs.goomba.y;

        if (goombaLeft < marioLeft && marioLeft < goombaRight ||
            goombaLeft < marioRight && marioRight < goombaRight) {
            if (goombaY - marioY >= KILLER_HEIGHT && goombaY - marioY < GOOMBA_HEIGHT) {
                return 'kill';
            }
            else if (goombaY - marioY < KILLER_HEIGHT) {
                return 'die'
            }
        }
        return false;
    };

    Model.prototype.movingBullet = function () {

        $.each(tanksModel.objs.bullet, function(index, value) {
            try {
                switch (value.direction) {
                    case "top":{
                        tanksModel.setCoords(value, null, value.y - BULLET_STEP);
                        break;
                    }
                    case "left":{
                        tanksModel.setCoords(value, value.x - BULLET_STEP);
                        break;
                    }
                    case "bottom":{
                        tanksModel.setCoords(value, null, value.y + BULLET_STEP);
                        break;
                    }
                    case "right":{
                        tanksModel.setCoords(value, value.x + BULLET_STEP);
                        break;
                    }
                }

                // коллизия
            }
            catch (e) {
                // пуля была удалена во время движения
            }

        });



        requestAnimationFrame(tanksModel.movingBullet);
    };

    Model.prototype.stopwatch = function () {
        if (PLAYER_TIME == 0){
            var sound = tanksController.startSound();
            if (sound != null) sound.play();
        }
        // песенка прошла
        else if (PLAYER_TIME/1000 >= 3.2){

            // проверка на спавн противников
            if (tanksModel.objs.enemy.length == 0){
                var enemyTop1= {
                    x: 20,
                    y: 10,
                    hp: ENEMY_HP,
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    direction: "bottom"
                };

                var enemyTop2 = {
                    x: RIGHT_BORDER - 10 - 40,
                    y: 10,
                    hp: ENEMY_HP,
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    direction: "left"
                };

                var enemyBottom1= {
                    x: 10,
                    y:  BOTTOM_BORDER - 10 - 40,
                    hp: ENEMY_HP,
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    direction: "right"
                };

                var enemyBottom2 = {
                    x: RIGHT_BORDER - 10 - 40,
                    y:  BOTTOM_BORDER - 10 - 40,
                    hp: ENEMY_HP,
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    direction: "top"
                };

                tanksController.addEnemy(enemyTop1);
                tanksModel.objs.enemy.push(enemyTop1);

                tanksController.addEnemy(enemyTop2);
                tanksModel.objs.enemy.push(enemyTop2);

                tanksController.addEnemy(enemyBottom1);
                tanksModel.objs.enemy.push(enemyBottom1);

                tanksController.addEnemy(enemyBottom2);
                tanksModel.objs.enemy.push(enemyBottom2);
            }
        }

        var curentDate = new Date();
        PLAYER_TIME += curentDate - StartDate;
        StartDate = curentDate;
        requestAnimationFrame(tanksModel.stopwatch);
    };

    function checkScreenBorders(obj, x, y) {

        if (obj.type == "player"){
            if (!(x <= LEFT_BORDER || x + 40 >= RIGHT_BORDER)) {
                obj.x = x;
            }
            if (!(y <= TOP_BORDER || y + 40 >= BOTTOM_BORDER)) {
                obj.y = y;
            }
        }
        else if (obj.type == "bullet"){
            if (!(x - 10  <= LEFT_BORDER || x - 10 >= RIGHT_BORDER)) {
                obj.x = x;
            }
            else{
                tanksController.deleteBullet(obj);
                var index = tanksModel.objs.bullet.indexOf(obj);
                if (index !== -1) tanksModel.objs.bullet.splice(index, 1);
                return;
            }
            if (!(y <= TOP_BORDER || y + 5 >= BOTTOM_BORDER)) {
                obj.y = y;
            }
            else{
                tanksController.deleteBullet(obj);
                var index = tanksModel.objs.bullet.indexOf(obj);
                if (index !== -1) tanksModel.objs.bullet.splice(index, 1);
            }
        }
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    tanksModel = new Model();
}

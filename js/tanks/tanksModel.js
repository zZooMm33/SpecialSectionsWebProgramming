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
    const ENEMY_SHOT_FREQUENCE = 2; // каждые N секунд выстрел

    var StartDate = new Date();

    var Model = function () {
        this.objs = {
            player: {
                type: "player",
                x: INITIAL_PLAYER_X,
                y: INITIAL_PLAYER_Y,

                time: 0,
                startDate: new Date(),

                live: 3,
                level: 1,
                score: 0,

                width: 40,
                height: 40,

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
        requestAnimationFrame(this.shotEnemy);
    };

    Model.prototype.setCoords = function (obj, x, y) {
        x = x == (undefined || null) ? obj.x : x;
        y = y == (undefined || null) ? obj.y : y;

        // не удаляемые
        this.checkScreenBordersTanks.call(this, obj, x, y);

        //удаляемые
        this.checkCollisionBullet.call(this, obj);

        // перерисовка
        this.needRendering();
    };

    Model.prototype.getCoords = function (obj) {
        return {
            x: obj.x,
            y: obj.y
        }
    };

    Model.prototype.playerMove = function(e){
        if (tanksModel.objs.player.time / 1000 <= 3) return;

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

        if (tanksModel.objs.player.time / 1000 <= 3) return;
        var keyCode = e.keyCode;
        var x = tanksModel.getCoords(tanksModel.objs.player).x;
        var y = tanksModel.getCoords(tanksModel.objs.player).y;

        if (keyCode == 32){

            var bullet = {
                type: "bullet",
                name: "bulletPlayer",
                id: "bullet" + uuidv4(),
                width: 5,
                height: 5,
                direction: tanksModel.objs.player.direction
            };

            if (sound) shot.play();

            tanksModel.objs.bullet.push(bullet);
            tanksController.addBullet(bullet, bullet.name);


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

            tanksModel.objs.player.score--;
            tanksController.changeScore(tanksModel.objs.player.score);
        }
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
            }
            catch (e) {
                // пуля была удалена во время движения
            }

        });



        requestAnimationFrame(tanksModel.movingBullet);
    };

    Model.prototype.shotEnemy = function () {

        $.each(tanksModel.objs.enemy, function(index, value) {

            if (value.time / 1000 >= ENEMY_SHOT_FREQUENCE){

                value.time = 0;


                try {
                    var bullet = {
                        type: "bullet",
                        name: "bulletEnemy",
                        id: "bullet" + uuidv4(),
                        width: 5,
                        height: 5,
                        direction: value.direction
                    };

                    tanksModel.objs.bullet.push(bullet);
                    tanksController.addBullet(bullet, bullet.name);


                    switch (value.direction) {
                        case "top":{
                            tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], value.x + 17, value.y);
                            break;
                        }
                        case "bottom":{
                            tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], value.x + 16, value.y + 35);
                            break;
                        }
                        case "left":{
                            tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], value.x, value.y + 16);
                            break;
                        }
                        case "right":{
                            tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], value.x + 35, value.y + 15);
                            break;
                        }
                    }
                }
                catch (e) {
                    // танк был убит во время выстрела
                }
            }
            else{
                var curentDate = new Date();
                value.time += curentDate - value.startDate;
                value.startDate = curentDate;
            }
        });

        requestAnimationFrame(tanksModel.shotEnemy);
    };

    Model.prototype.stopwatch = function () {
        if (tanksModel.objs.player.time == 0){
            var sound = tanksController.startSound();
            if (sound != null) sound.play();
        }
        else if (tanksModel.objs.player.time/1000 >= 4){
            // Игра началась + танков нет = игрок их убил = некст лвл
            if (tanksModel.objs.enemy.length == 0){
                tanksModel.objs.player.level++;
                tanksModel.objs.player.direction = 'top';
                tanksModel.setCoords(tanksModel.objs.player, INITIAL_PLAYER_X, INITIAL_PLAYER_Y);
                tanksController.changeLevel(tanksModel.objs.player.level);
                tanksModel.objs.player.time = 0;
                tanksModel.objs.player.startDate = new Date();
                requestAnimationFrame(tanksModel.stopwatch);
                return;
            }
        }
        // песенка прошла
        else if (tanksModel.objs.player.time/1000 >= 3.2){
            // проверка на спавн противников
            if (tanksModel.objs.enemy.length == 0){

                var enemyTop1= {
                    x: 20,
                    y: 10,
                    hp: ENEMY_HP,
                    time: 0,
                    startDate: new Date(),
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    width: 40,
                    height: 40,
                    direction: "bottom"
                };

                var enemyTop2 = {
                    x: RIGHT_BORDER - 10 - 40,
                    y: 10,
                    hp: ENEMY_HP,
                    time: 0,
                    startDate: new Date(),
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    width: 40,
                    height: 40,
                    direction: "left"
                };

                var enemyBottom1= {
                    x: 10,
                    y:  BOTTOM_BORDER - 10 - 40,
                    hp: ENEMY_HP,
                    time: 0,
                    startDate: new Date(),
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    width: 40,
                    height: 40,
                    direction: "right"
                };

                var enemyBottom2 = {
                    x: RIGHT_BORDER - 10 - 40,
                    y:  BOTTOM_BORDER - 10 - 40,
                    hp: ENEMY_HP,
                    time: 0,
                    startDate: new Date(),
                    id: "enemy" + uuidv4(),
                    type: "enemy",
                    width: 40,
                    height: 40,
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
        tanksModel.objs.player.time += curentDate - tanksModel.objs.player.startDate;
        tanksModel.objs.player.startDate = curentDate;
        requestAnimationFrame(tanksModel.stopwatch);
    };

    Model.prototype.checkScreenBordersTanks = function (obj, x, y) {

        if (obj.type == "player"){

            var oldX = obj.x;
            var oldY = obj.y;
            var flagCollEnemy = false;

            //стена
            if (!(x <= LEFT_BORDER || x + 40 >= RIGHT_BORDER)) {
                obj.x = x;
            }
            if (!(y <= TOP_BORDER || y + 40 >= BOTTOM_BORDER)) {
                obj.y = y;
            }

            //После проверки со стеной чекаем на танк, если врезались вернем старые значения
            $.each(tanksModel.objs.enemy, function(enemyIndex, enemyValue) {
                if (checkCollision(obj, enemyValue)) flagCollEnemy = true;
            });

            //Врезались во врага - вернем старые координаты
            if (flagCollEnemy) {
                obj.x = oldX;
                obj.y = oldY;
            }
        }
        else if (obj.type == "bullet"){
            if (!(x + 10  <= LEFT_BORDER || x - 5 >= RIGHT_BORDER)) {
                obj.x = x;
            }
            else{
                tanksModel.deleteBullet(obj);
                return;
            }
            if (!(y + 10 <= TOP_BORDER || y - 5 >= BOTTOM_BORDER)) {
                obj.y = y;
            }
            else{
                tanksModel.deleteBullet(obj);
            }
        }
    };

    Model.prototype.checkCollisionBullet =  function (value) {
        if (value.name == "bulletPlayer"){
            $.each(tanksModel.objs.enemy, function(enemyIndex, enemyValue) {
                if(checkCollision(value, enemyValue)){
                    // удаляем пулю
                    // -1 хп у врага
                    tanksModel.deleteBullet(value);
                    var sound = tanksController.hitEnemyTankSound();
                    if (sound != null) sound.play();


                    enemyValue.hp--;
                    if (enemyValue.hp == 0) {
                        //удаляем + очки

                        tanksModel.objs.player.score += 50;
                        tanksController.changeScore(tanksModel.objs.player.score);

                        tanksModel.deleteEnemy(enemyValue);
                    }
                }
            });
        }
        else{
            //Пуля врага
        }
    };

    Model.prototype.deleteBullet = function (obj) {
        tanksController.deleteObject(obj);
        var index = tanksModel.objs.bullet.indexOf(obj);
        if (index !== -1) tanksModel.objs.bullet.splice(index, 1);
    };

    Model.prototype.deleteEnemy = function (obj) {
        tanksController.deleteObject(obj);

        var index = tanksModel.objs.enemy.indexOf(obj);
        if (index !== -1) tanksModel.objs.enemy.splice(index, 1);
    };

    function checkCollision(obj1, obj2) {
        var XColl=false;
        var YColl=false;

        if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
        if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;

        if (XColl&YColl){ return true; }
        return false;
    };

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    tanksModel = new Model();
}

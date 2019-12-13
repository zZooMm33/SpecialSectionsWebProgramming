/*

Tanks model

*/

function startModel(size) {

    let RIGHT_BORDER;
    let BOTTOM_BORDER;
    const LEFT_BORDER = 0;
    const TOP_BORDER = 0;

    if (size.indexOf("big") !== -1){
        RIGHT_BORDER = 600;
        BOTTOM_BORDER = 600;
    }
    else{
        RIGHT_BORDER = 400;
        BOTTOM_BORDER = 400;
    }


    const INITIAL_PLAYER_X = (RIGHT_BORDER - 20) / 2;
    const INITIAL_PLAYER_Y = (BOTTOM_BORDER - 20) / 2;

    const PLAYER_STEP = 7;
    const BULLET_STEP = 15;
    const ENEMY_STEP = 5;

    const ENEMY_HP = 1;
    const ENEMY_SHOT_FREQUENCE = 0.5; // каждые N секунд выстрел

    const BULLET_SIZE = 4;
    const PLAYER_SIZE = 40;
    const ENEMY_SIZE = 40;

    var Model = function () {
        this.objs = {
            isGameOver: false,
            player: {
                type: "player",
                x: INITIAL_PLAYER_X,
                y: INITIAL_PLAYER_Y,
                speed: PLAYER_STEP,

                time: 0,
                startDate: new Date(),

                life: 3,
                isLife: true,
                level: 1,
                score: 0,

                width: PLAYER_SIZE,
                height: PLAYER_SIZE,

                direction: 'top'
            },
            enemy: [],
            bullet: [],
            enemySpawn:[
                // top 1
                {
                    x: 20,
                    y: 10,
                    direction: "bottom"
                },
                // top 2
                {
                    x: RIGHT_BORDER - 10 - 40,
                    y: 10,
                    direction: "left"
                },
                // bottom 1
                {
                    x: 10,
                    y: BOTTOM_BORDER - 10 - 40,
                    direction: "top"
                },
                // bottom 2
                {
                    x: RIGHT_BORDER - 10 - 40,
                    y: BOTTOM_BORDER - 10 - 40,
                    direction: "top"
                },
                // top 3
                {
                    x: 20 + 50,
                    y: 10 + 50,
                    direction: "right"
                },
                // top 4
                {
                    x: RIGHT_BORDER - 10 - 40 - 50,
                    y: 10 + 50,
                    direction: "bottom"
                },
                // bottom 3
                {
                    x: 10 + 50,
                    y: BOTTOM_BORDER - 10 - 40 - 50,
                    direction: "left"
                },
                // bottom 4
                {
                    x: RIGHT_BORDER - 10 - 40 - 50,
                    y: BOTTOM_BORDER - 10 - 40 - 50,
                    direction: "right"
                },
            ]

        };
    };

    Model.prototype.init = function(renderFunction){
        this.needRendering = renderFunction;

        requestAnimationFrame(this.movingEnemyAndBullet);
        requestAnimationFrame(this.stopwatch);
        requestAnimationFrame(this.shotEnemy);
    };

    Model.prototype.setCoords = function (obj, x, y) {
        if (tanksModel.objs.isGameOver) return;

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
        if (tanksModel.objs.player.time / 1000 <= 3 || tanksModel.objs.isGameOver) return;

        var keyCode = e.keyCode;
        var x = tanksModel.getCoords(tanksModel.objs.player).x;
        var y = tanksModel.getCoords(tanksModel.objs.player).y;
        var speed = tanksModel.objs.player.speed;

        switch (keyCode) {
            case 39: {
                tanksModel.objs.player.direction = "right";
                tanksModel.setCoords(tanksModel.objs.player, x + speed);
                break;
            }
            case 37: {
                tanksModel.objs.player.direction = "left";
                tanksModel.setCoords(tanksModel.objs.player, x - speed);
                break;
            }
            case 38: {
                tanksModel.objs.player.direction = "top";
                tanksModel.setCoords(tanksModel.objs.player,  null, y - speed);
                break;
            }
            case 40: {
                tanksModel.objs.player.direction = "bottom";
                tanksModel.setCoords(tanksModel.objs.player,  null, y + speed);
                break;
            }

        }
    };

    Model.prototype.playerShot = function(e, shot, sound){

        if (tanksModel.objs.player.time / 1000 <= 3 || tanksModel.objs.isGameOver) return;

        var keyCode = e.keyCode;
        var x = tanksModel.getCoords(tanksModel.objs.player).x;
        var y = tanksModel.getCoords(tanksModel.objs.player).y;

        if (keyCode == 32){

            var bullet = {
                type: "bullet",
                name: "bulletPlayer",
                id: "bullet" + uuidv4(),
                width: BULLET_SIZE,
                height: BULLET_SIZE,
                speed: BULLET_STEP,
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


    Model.prototype.movingEnemyAndBullet = function () {
        if (tanksModel.objs.isGameOver) return;

        $.each(tanksModel.objs.bullet, function(index, value) {
            try {
                switch (value.direction) {
                    case "top":{
                        tanksModel.setCoords(value, null, value.y - value.speed);
                        break;
                    }
                    case "left":{
                        tanksModel.setCoords(value, value.x - value.speed);
                        break;
                    }
                    case "bottom":{
                        tanksModel.setCoords(value, null, value.y + value.speed);
                        break;
                    }
                    case "right":{
                        tanksModel.setCoords(value, value.x + value.speed);
                        break;
                    }
                }
            }
            catch (e) {
                // пуля была удалена во время движения
            }
        });

        $.each(tanksModel.objs.enemy, function(index, value) {
            try {
                switch (value.direction) {
                    case "top":{
                        tanksModel.setCoords(value, null, value.y - value.speed);
                        break;
                    }
                    case "left":{
                        tanksModel.setCoords(value, value.x - value.speed);
                        break;
                    }
                    case "bottom":{
                        tanksModel.setCoords(value, null, value.y + value.speed);
                        break;
                    }
                    case "right":{
                        tanksModel.setCoords(value, value.x + value.speed);
                        break;
                    }
                }
            }
            catch (e) {
                // enemy был убит во время движения
            }
        });


        requestAnimationFrame(tanksModel.movingEnemyAndBullet);
    };

    Model.prototype.shotEnemy = function () {
        if (tanksModel.objs.isGameOver) return;

        $.each(tanksModel.objs.enemy, function(index, value) {

            if (value.time / 1000 >= ENEMY_SHOT_FREQUENCE){

                value.time = 0;


                try {
                    var bullet = {
                        type: "bullet",
                        name: "bulletEnemy",
                        id: "bullet" + uuidv4(),
                        width: BULLET_SIZE,
                        height: BULLET_SIZE,
                        speed: BULLET_STEP,
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
        if (tanksModel.objs.isGameOver) return;

        if (tanksModel.objs.player.time == 0){
            var sound = tanksController.startSound();
            if (sound != null) sound.play();
        }
        else if (tanksModel.objs.player.time/1000 >= 4 || !tanksModel.objs.player.isLife){
            // Игра началась + танков нет = игрок их убил = некст лвл или игрок умер
            if (tanksModel.objs.enemy.length == 0){
                tanksModel.objs.player.direction = 'top';
                tanksModel.setCoords(tanksModel.objs.player, INITIAL_PLAYER_X, INITIAL_PLAYER_Y);

                if (!tanksModel.objs.player.isLife){
                    tanksModel.objs.player.isLife = true;
                }
                else {
                    tanksModel.objs.player.level++;
                    tanksController.changeLevel(tanksModel.objs.player.level);
                }

                tanksModel.objs.player.time = 0;
                tanksModel.objs.player.startDate = new Date();

                requestAnimationFrame(tanksModel.stopwatch);
                return;
            }
            else{

            }
        }
        // песенка прошла
        else if (tanksModel.objs.player.time/1000 >= 3.2){
            // проверка на спавн противников

            if (tanksModel.objs.enemy.length == 0){
                for (var i=0; i< tanksModel.objs.enemySpawn.length;i++){
                    if (i >= tanksModel.objs.player.level + 3) break; // начинаем с 4 танков
                    else {
                        var enemy = tanksModel.createEnemy(tanksModel.objs.enemySpawn[i].x, tanksModel.objs.enemySpawn[i].y, tanksModel.objs.enemySpawn[i].direction);
                        tanksController.addEnemy(enemy);
                        tanksModel.objs.enemy.push(enemy);
                    }
                }
            }
        }

        var curentDate = new Date();
        tanksModel.objs.player.time += curentDate - tanksModel.objs.player.startDate;
        tanksModel.objs.player.startDate = curentDate;
        requestAnimationFrame(tanksModel.stopwatch);
    };

    Model.prototype.checkScreenBordersTanks = function (obj, x, y) {
        if (tanksModel.objs.isGameOver) return;

        if (obj.type == "player" || obj.type == "enemy"){

            var oldX = obj.x;
            var oldY = obj.y;
            var flagCollObj = false;

            //стена
            if (!(x <= LEFT_BORDER || x + 40 >= RIGHT_BORDER)) {
                obj.x = x;
            }
            else flagCollObj = true;

            if (!(y <= TOP_BORDER || y + 40 >= BOTTOM_BORDER)) {
                obj.y = y;
            }
            else flagCollObj = true;

            //После проверки со стеной чекаем на танк, если врезались вернем старые значения
            $.each(tanksModel.objs.enemy, function(enemyIndex, enemyValue) {
                if (obj.type != "player" && checkCollision(obj, tanksModel.objs.player)) flagCollObj = true;
                if (enemyValue.id != obj.id && checkCollision(obj, enemyValue)) flagCollObj = true;
            });

            //Врезались во врага - вернем старые координаты
            if (flagCollObj) {
                obj.x = oldX;
                obj.y = oldY;

                if (obj.type != "player") obj.direction = randDirection();
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
        if (tanksModel.objs.isGameOver) return;

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
        else if (value.name == "bulletEnemy"){
            //Пуля врага
            if(tanksModel.objs.player.isLife && checkCollision(value, tanksModel.objs.player)){
                // обновляем score
                tanksModel.objs.player.score -= 100;
                tanksController.changeScore(tanksModel.objs.player.score);

                // обновляем жизнь
                tanksModel.objs.player.life--;
                tanksModel.objs.player.isLife = false;
                tanksController.changeLife(tanksModel.objs.player);

                // удаляем всех врагов и все пули (для рестарта)
                while(true){
                    $.each(tanksModel.objs.enemy, function(enemyIndex, enemyValue) {
                        try{
                            tanksModel.deleteEnemy(enemyValue);
                        }
                        catch (e) {
                        }
                    });
                    $.each(tanksModel.objs.bullet, function(bulletIndex, bulletValue) {
                        try{
                            tanksModel.deleteBullet(bulletValue);
                        }
                        catch (e) {

                        }
                    });

                    if (tanksModel.objs.enemy.length == 0 && tanksModel.objs.bullet == 0) break;
                }

                if (tanksModel.objs.player.life == 0) tanksModel.objs.isGameOver = true;
            }
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

    Model.prototype.createEnemy = function (x, y, _direction) {
        return enemy = {
            x: x,
            y:  y,
            hp: ENEMY_HP,
            time: 0,
            speed: ENEMY_STEP,
            startDate: new Date(),
            id: "enemy" + uuidv4(),
            type: "enemy",
            width: ENEMY_SIZE,
            height: ENEMY_SIZE,
            direction: _direction
        };
    };

    function checkCollision(obj1, obj2) {
        var XColl=false;
        var YColl=false;

        if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
        if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;

        if (XColl&YColl){ return true; }
        return false;
    };

    function randDirection() {
        var numb = randomInteger(0, 3);
        if (numb == 0) return "top";
        else if (numb == 1) return "right";
        else if (numb == 2) return "bottom";
        else return "left";
    }

    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    tanksModel = new Model();
}

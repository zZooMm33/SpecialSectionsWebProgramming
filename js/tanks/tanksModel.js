/*

Mario model

*/

const INITIAL_PLAYER_X = -10;
const INITIAL_PLAYER_Y = 100;

const INITIAL_GOOMBA_X = -200;
const INITIAL_GOOMBA_Y = 0;

const LEFT_BORDER = -275;
const RIGHT_BORDER = 235;

const TOP_BORDER = -415;
const BOTTOM_BORDER = 153;

const KILLER_HEIGHT = 15;
const GOOMBA_HEIGHT = 30;

const PLAYER_STEP = 5;
const BULLET_STEP = 10;
const GOOMBA_STEP = 5;

const PLAYER_LIVE = 3;

var PlayerID = null;
var GoombaID = null;

var Model = function () {
    this.objs = {
        player: {
            type: "player",
            x: INITIAL_PLAYER_X,
            y: INITIAL_PLAYER_Y,
            direction: 'top'
        },
        'enemy': {
            type: "enemy",
            x: INITIAL_GOOMBA_X,
            y: INITIAL_GOOMBA_Y,
            direction: 'right'
        },
        bullet: []
    };
};

Model.prototype.init = function(renderFunction){
    this.needRendering = renderFunction;

    requestAnimationFrame(this.movingBullet);
};

Model.prototype.isBusy = function () {
    return this.busy;
};

Model.prototype.changeBusy = function () {
    this.busy = !this.busy;
};

Model.prototype.isUp = function () {
    return this.up;
};

Model.prototype.changeUp = function () {
    this.up = !this.up;
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
    var keyCode = e.keyCode;
    var x = tanksModel.getCoords(tanksModel.objs.player).x;
    var y = tanksModel.getCoords(tanksModel.objs.player).y;

    if (keyCode == 32){

        var bullet = {
            type: "bullet",
            id: "bullet" + uuidv4(),
            direction: tanksModel.objs.player.direction
        };

        tanksModel.objs.bullet.push(bullet);
        tanksController.addBullet(bullet);

        if (sound) shot.play();

        switch (tanksModel.objs.player.direction) {
            case "top":{
                tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 16, y - 5);
                break;
            }
            case "bottom":{
                tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 16, y + 35);
                break;
            }
            case "left":{
                tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x, y + 15);
                break;
            }
            case "right":{
                tanksModel.setCoords(tanksModel.objs.bullet[tanksModel.objs.bullet.length - 1], x + 40, y + 15);
                break;
            }
        }
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

function checkScreenBorders(obj, x, y) {

    if (obj.type == "player"){
        if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
            obj.x = x;
        }
        if (!(y <= TOP_BORDER || y >= BOTTOM_BORDER)) {
            obj.y = y;
        }
    }
    else if (obj.type == "bullet"){
        if (!(x <= LEFT_BORDER || x - 40 >= RIGHT_BORDER)) {
            obj.x = x;
        }
        else{
            tanksController.deleteBullet(obj);
            var index = tanksModel.objs.bullet.indexOf(obj);
            if (index !== -1) tanksModel.objs.bullet.splice(index, 1);
            return;
        }
        if (!(y + 15 <= TOP_BORDER || y - 23 >= BOTTOM_BORDER)) {
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

var tanksModel = new Model();
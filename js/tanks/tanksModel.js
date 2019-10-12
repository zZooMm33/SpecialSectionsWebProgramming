/*

Mario model

*/

const INITIAL_PLAYER_X = 0;
const INITIAL_PLAYER_Y = 0;

const INITIAL_GOOMBA_X = -200;
const INITIAL_GOOMBA_Y = 0;

const LEFT_BORDER = -275;
const RIGHT_BORDER = 235;

const TOP_BORDER = -415;
const BOTTOM_BORDER = 153;

const KILLER_HEIGHT = 15;
const GOOMBA_HEIGHT = 30;

const PLAYER_STEP = 5;
const GOOMBA_STEP = 5;

const PLAYER_LIVE = 3;

var PlayerID = null;
var GoombaID = null;

var Model = function () {
    this.objs = {
        'player': {
            x: INITIAL_PLAYER_X,
            y: INITIAL_PLAYER_Y,
            direction: 'top'
        },
        'goomba': {
            x: INITIAL_GOOMBA_X,
            y: INITIAL_GOOMBA_Y,
            direction: 'right'
        }
    };

    this.busy = false;
    this.up = true;
    this.endJump = false;
};

Model.prototype.init = function(renderFunction){
    this.needRendering = renderFunction;

    GoombaID = requestAnimationFrame(this.walkingGoomba);
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

Model.prototype.walkingGoomba = function () {
    var x = tanksModel.getCoords(tanksModel.objs.goomba).x;

    if (tanksModel.objs.goomba.direction === 'right') {
        tanksModel.setCoords(tanksModel.objs.goomba, x + GOOMBA_STEP);
    }
    else {
        tanksModel.setCoords(tanksModel.objs.goomba, x - GOOMBA_STEP);
    }
    var collision = tanksModel.checkMarioGoombaCollision(tanksView.mario, tanksView.goomba);
    if (collision === 'kill') {
        // cancelAnimationFrame(GoombaID);
        tanksController.dieGoomba();
    }
    else if (collision === 'die'){
        tanksController.dieMario();
        requestAnimationFrame(tanksModel.walkingGoomba);
    }
    else if (!collision) {
        requestAnimationFrame(tanksModel.walkingGoomba);
    }
};

function checkScreenBorders(obj, x, y) {
    if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
        obj.x = x;
    }
    if (!(y <= TOP_BORDER || y >= BOTTOM_BORDER)) {
        obj.y = y;
    }
}

var tanksModel = new Model();
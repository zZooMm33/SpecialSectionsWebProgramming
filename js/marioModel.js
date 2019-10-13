/*

Mario model

*/

const INITIAL_MARIO_X = 0;
const INITIAL_MARIO_Y = 0;
const INITIAL_GOOMBA_X = -200;
const INITIAL_GOOMBA_Y = 0;
const LAND = 0;
const LEFT_BORDER = -400;
const RIGHT_BORDER = 370;
const JUMP_HEIGHT = 100;
const KILLER_HEIGHT = 15;
const GOOMBA_HEIGHT = 30;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const MARIO_STEP = 5;
const GOOMBA_STEP = 5;

var MarioID = null;
var GoombaID = null;

var Model = function () {
    this.objs = {
        'player': {
            x: INITIAL_MARIO_X,
            y: INITIAL_MARIO_Y
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

    GoombaID = requestAnimationFrame(this.movingBullet);
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

Model.prototype.isJumpEnd = function () {
    return this.endJump;
};

Model.prototype.changeJumpEnd = function () {
    this.endJump = !this.endJump;
};

Model.prototype.setCoords = function (obj, x, y) {
    x = x == (undefined || null) ? obj.x : x;
    y = y == (undefined || null) ? obj.y : y;

    checkScreenBorders.call(this, obj, x);
    if (y !== obj.y) {
        checkEndJump.call(this, obj, y);
    }

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
    var x = marioModel.getCoords(marioModel.objs.player).x;

    switch (keyCode) {
        case KEY_CODE_RIGHT: {
            marioModel.setCoords(marioModel.objs.player, x + MARIO_STEP);
            break;
        }
        case KEY_CODE_LEFT: {
            marioModel.setCoords(marioModel.objs.player, x - MARIO_STEP);
            break;
        }
    }
};

Model.prototype.initMarioJump = function (sound) {
    if (!marioModel.isBusy()) {
        marioModel.changeBusy();
        requestAnimationFrame(marioModel.marioJump);
        sound.play();
    }
};

Model.prototype.marioJump = function(){
    var y = marioModel.getCoords(marioModel.objs.player).y;
    if (marioModel.isUp()) {
        marioModel.setCoords(marioModel.objs.player, null, y - MARIO_STEP);
    }
    else {
        marioModel.setCoords(marioModel.objs.player, null, y + MARIO_STEP);
    }
    if (marioModel.isJumpEnd()) {
        marioModel.changeBusy();
        marioModel.changeJumpEnd();
        marioModel.changeUp();
        cancelAnimationFrame(MarioID);
    }
    else {
        requestAnimationFrame(marioModel.marioJump);
    }
};

Model.prototype.checkMarioGoombaCollision = function (mario, goomba) {
    var marioLeft = mario.getBoundingClientRect().left;
    var marioRight = mario.getBoundingClientRect().right;
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

Model.prototype.movingEnemyAndBullet = function () {
    var x = marioModel.getCoords(marioModel.objs.goomba).x;

    if (marioModel.objs.goomba.direction === 'right') {
        marioModel.setCoords(marioModel.objs.goomba, x + GOOMBA_STEP);
    }
    else {
        marioModel.setCoords(marioModel.objs.goomba, x - GOOMBA_STEP);
    }
    var collision = marioModel.checkMarioGoombaCollision(tanksView.mario, tanksView.goomba);
    if (collision === 'kill') {
        // cancelAnimationFrame(GoombaID);
        tanksController.dieGoomba();
    }
    else if (collision === 'die'){
        tanksController.dieMario();
        requestAnimationFrame(marioModel.movingBullet);
    }
    else if (!collision) {
        requestAnimationFrame(marioModel.movingBullet);
    }
};

function checkEndJump(obj, y) {
    if (this.isUp() && LAND - JUMP_HEIGHT > y) {
        this.changeUp();
        return;
    }
    if (LAND <= y) {
        this.changeJumpEnd();
        y = LAND;
    }

    obj.y = y;
}

function checkScreenBorders(obj, x) {
    if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
        obj.x = x;
    }
    else {
        if (obj.hasOwnProperty('direction')) {
            obj.direction = obj.direction === 'right' ? 'left' : 'right';
        }
    }
}

var marioModel = new Model();
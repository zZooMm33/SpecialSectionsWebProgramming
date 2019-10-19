/*

Tanks view

*/
function startView() {
    var View = function() {
        // поля - объекты
        this.game = document.querySelector('.game');
        this.player = document.querySelector('.player');

        //звуки-музыка
        this.shotSound = document.querySelector('.shot');
        this.startGameSound = document.querySelector('.startGameSound');
        this.hitEnemyTankSound = document.querySelector('.hitEnemyTank');

        // кнопки
        this.onKeyDownEvent = null;
        this.onKeyUpEvent = null;
    };

    View.prototype.init = function (){
        document.addEventListener('keydown', this.onKeyDownEvent);
        document.addEventListener('keyup', this.onKeyUpEvent);
    };

    View.prototype.checkSound = function (){

        var rad = document.querySelector("#soundsGameOn");

        if (rad.checked) return true;
        else return false;
    };

    View.prototype.newBullet = function (bullet, className){

        var circle = SVG.create('circle', { cx: bullet.x, cy: bullet.y, r: 2.5, fill: 'black', id: bullet.id});
        this.game.appendChild(circle);
    };

    View.prototype.newEnemy = function (enemy){

        var rect = SVG.create('rect', { x: enemy.x, y: enemy.y, width: 40, height: 40, fill: 'red', id: enemy.id});
        var rectDirection = SVG.create('line', { x1: 0, y1: 0, x2: 40, y2: 40, stroke: 'black', id: "line" + enemy.id});
        this.game.appendChild(rect);
        this.game.appendChild(rectDirection);
    };

    View.prototype.deleteObject = function (object){
        var objectHTML = document.querySelector('#' + object.id);
        this.game.removeChild(objectHTML);

        try {
            var objectHTMLLine = document.querySelector('#line' + object.id);
            this.game.removeChild(objectHTMLLine);
        }
        catch (e) {
        }

    };

    View.prototype.changeScore = function (score){
        document.querySelector('#scoreGame').innerHTML = "Score: " + score;
    };

    View.prototype.changeLevel = function (level){
        document.querySelector('#levelGame').innerHTML = "Level: " + level;
    };

    View.prototype.changeLife = function (life){
        document.querySelector('#numbLife').innerHTML = "Количество жизней: " + life;

        if (life == 0){
            document.querySelector('.player').style.display = "none";
            document.querySelector('.playerDirection').style.display = "none";
            alert("Game Over");
        }
    };
    View.prototype.render = function (objs) {


        this.player.setAttributeNS(null, "x", objs.player.x);
        this.player.setAttributeNS(null, "y", objs.player.y);

        var playerDirection = document.querySelector('.playerDirection');
        switch (objs.player.direction) {
            case "right": {
                playerDirection.setAttributeNS(null, "x1", objs.player.x + 40);
                playerDirection.setAttributeNS(null, "y1", objs.player.y + 40 / 2);
                playerDirection.setAttributeNS(null, "x2", objs.player.x + 40 / 2 );
                playerDirection.setAttributeNS(null, "y2", objs.player.y + 40 / 2 );
                break;
            }
            case "left": {
                playerDirection.setAttributeNS(null, "x1", objs.player.x);
                playerDirection.setAttributeNS(null, "y1", objs.player.y + 40 / 2);
                playerDirection.setAttributeNS(null, "x2", objs.player.x + 40 / 2 );
                playerDirection.setAttributeNS(null, "y2", objs.player.y + 40 / 2 );
                break;
            }
            case "top": {
                playerDirection.setAttributeNS(null, "x1", objs.player.x + 40 /2 );
                playerDirection.setAttributeNS(null, "y1", objs.player.y );
                playerDirection.setAttributeNS(null, "x2", objs.player.x + 40 / 2 );
                playerDirection.setAttributeNS(null, "y2", objs.player.y + 40 / 2 );
                break;
            }
            case "bottom": {
                playerDirection.setAttributeNS(null, "x1", objs.player.x + 40 /2);
                playerDirection.setAttributeNS(null, "y1", objs.player.y + 40);
                playerDirection.setAttributeNS(null, "x2", objs.player.x + 40 / 2 );
                playerDirection.setAttributeNS(null, "y2", objs.player.y + 40 / 2 );
                break;
            }
        }

        $.each(objs.bullet, function(index, value) {

            try {
                var bullet = document.querySelector('#' + value.id);


                bullet.setAttributeNS(null, "cx", value.x);
                bullet.setAttributeNS(null, "cy", value.y);
            }
            catch (e) {
                // пуля была удалена во время отрисовки
            }
        });

        $.each(objs.enemy, function(index, value) {

            try {
                var enemy = document.querySelector('#' + value.id);
                var enemyDirection = document.querySelector('#line' + value.id);
                enemy.setAttributeNS(null, "x", value.x);
                enemy.setAttributeNS(null, "y", value.y);

                switch (value.direction) {
                    case "right": {
                        enemyDirection.setAttributeNS(null, "x1", value.x + 40);
                        enemyDirection.setAttributeNS(null, "y1", value.y + 40 / 2);
                        enemyDirection.setAttributeNS(null, "x2", value.x + 40 / 2 );
                        enemyDirection.setAttributeNS(null, "y2", value.y + 40 / 2 );
                        break;
                    }
                    case "left": {
                        enemyDirection.setAttributeNS(null, "x1", value.x);
                        enemyDirection.setAttributeNS(null, "y1", value.y + 40 / 2);
                        enemyDirection.setAttributeNS(null, "x2", value.x + 40 / 2 );
                        enemyDirection.setAttributeNS(null, "y2", value.y + 40 / 2 );
                        break;
                    }
                    case "top": {
                        enemyDirection.setAttributeNS(null, "x1", value.x + 40 /2 );
                        enemyDirection.setAttributeNS(null, "y1", value.y );
                        enemyDirection.setAttributeNS(null, "x2", value.x + 40 / 2 );
                        enemyDirection.setAttributeNS(null, "y2", value.y + 40 / 2 );
                        break;
                    }
                    case "bottom": {
                        enemyDirection.setAttributeNS(null, "x1", value.x + 40 /2);
                        enemyDirection.setAttributeNS(null, "y1", value.y + 40);
                        enemyDirection.setAttributeNS(null, "x2", value.x + 40 / 2 );
                        enemyDirection.setAttributeNS(null, "y2", value.y + 40 / 2 );
                        break;
                    }
                }
            }
            catch (e) {
                // пуля была удалена во время отрисовки
            }
        });
    };


    tanksView = new View();
}

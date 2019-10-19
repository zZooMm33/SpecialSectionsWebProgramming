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
        var div = document.createElement("div");
        div.setAttribute("class", className);
        div.setAttribute("id", bullet.id );

        this.game.appendChild(div);
    };

    View.prototype.newEnemy = function (enemy){
        var div = document.createElement("div");

        div.classList.add("enemy");
        div.classList.add("x3-size-sprite");
        div.classList.add(enemy.direction);

        div.setAttribute("id", enemy.id );

        div.style.left = enemy.x + 'px';
        div.style.top = enemy.y + 'px';

        this.game.appendChild(div);
    };

    View.prototype.deleteObject = function (object){
        var objectHTML = document.querySelector('#' + object.id);
        this.game.removeChild(objectHTML);
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
            alert("Game Over");
        }
    };
    View.prototype.render = function (objs) {
        this.player.style.left = objs.player.x + 'px';
        this.player.style.top = objs.player.y + 'px';


        this.player.classList.remove("right", "left", "top", "bottom");
        switch (objs.player.direction) {
            case "right": {
                this.player.classList.add("right");
                break;
            }
            case "left": {
                this.player.classList.add("left");
                break;
            }
            case "top": {
                this.player.classList.add("top");
                break;
            }
            case "bottom": {
                this.player.classList.add("bottom");
                break;
            }
        }


        $.each(objs.bullet, function(index, value) {

            try {
                var bullet = document.querySelector('#' + value.id);
                bullet.style.left = value.x + 'px';
                bullet.style.top = value.y + 'px';
            }
            catch (e) {
                // пуля была удалена во время отрисовки
            }
        });

        $.each(objs.enemy, function(index, value) {

            try {
                var enemy = document.querySelector('#' + value.id);
                enemy.style.left = value.x + 'px';
                enemy.style.top = value.y + 'px';

                enemy.classList.remove("right", "left", "top", "bottom");
                switch (value.direction) {
                    case "right": {
                        enemy.classList.add("right");
                        break;
                    }
                    case "left": {
                        enemy.classList.add("left");
                        break;
                    }
                    case "top": {
                        enemy.classList.add("top");
                        break;
                    }
                    case "bottom": {
                        enemy.classList.add("bottom");
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

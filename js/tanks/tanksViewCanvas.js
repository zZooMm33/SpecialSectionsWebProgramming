/*

Tanks view

*/
function startView() {
    var View = function() {
        // поля - объекты
        this.game = document.querySelector('#game_window');
        this.contex = this.game.getContext('2d');

        this.game.width = this.game.offsetWidth;
        this.game.height = this.game.offsetHeight;

        //звуки-музыка
        this.shotSound = audioElementShot;
        this.startGameSound = audioElementStartGameSound;
        this.hitEnemyTankSound = audioElementHitEnemyTank;

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

    };

    View.prototype.newEnemy = function (enemy){

    };

    View.prototype.deleteObject = function (object){

    };

    View.prototype.changeScore = function (score){
        document.querySelector('#scoreGame').innerHTML = "Количество очков: " + score;
    };

    View.prototype.changeLevel = function (level){
        document.querySelector('#levelGame').innerHTML = "Уровень: " + level;
    };

    View.prototype.changeLife = function (player){
        document.querySelector('#numbLife').innerHTML = "Количество жизней: " + player.life;

        // Игрок проиграл
        if (player.life == 0){
            this.contex.clearRect(0, 0, this.game.width, this.game.height);
            addScore(player.score);
            document.querySelector('#getScore').style.display = "inline-block";
            alert("Game Over");
        }
    };
    View.prototype.render = function (objs) {

        this.contex.clearRect(0, 0, this.game.width, this.game.height);

        tanksView.drawTank(objs.player.x , objs.player.y , objs.player.width, objs.player.height, "player", objs.player.direction);

        $.each(objs.bullet, function(index, value) {

            try {

                tanksView.drawCircle(value.x , value.y, value.height, 'black', value.direction);
            }
            catch (e) {
                // пуля была удалена во время отрисовки
            }
        });

        $.each(objs.enemy, function(index, value) {

            try {
                tanksView.drawTank(value.x , value.y , objs.player.width, objs.player.height, "enemy", value.direction);
            }
            catch (e) {

            }
        });
    };

    View.prototype.drawTank = function (x, y, w, h, type, direction){
        var texture = document.getElementById("tanks-textures");

        if (type.indexOf("player") !== -1){
            switch (direction) {
                case "right": {
                    this.contex.drawImage(texture, 2, 76, 14, 14, x, y, w, h);
                    break;
                }
                case "bottom": {
                    this.contex.drawImage(texture, 2 + 14 + 3, 76, 14, 14, x, y, w, h);
                    break;
                }
                case "top": {
                    this.contex.drawImage(texture, 2 + 14 + 3 + 14 + 3, 76, 14, 14, x, y, w, h);
                    break;
                }
                case "left": {
                    this.contex.drawImage(texture, 2 + 14 + 3 + 14 + 3 + 14 + 3, 76, 14, 14, x, y, w, h);
                    break;
                }
            }
        }
        else{
            switch (direction) {
                case "right": {
                    this.contex.drawImage(texture, 78, 38, 14, 14, x, y, w, h);
                    break;
                }
                case "bottom": {
                    this.contex.drawImage(texture, 78 + 14 + 2, 38, 14, 14, x, y, w, h);
                    break;
                }
                case "top": {
                    this.contex.drawImage(texture, 78 + 14 + 2 + 14 + 2, 39, 14, 14, x, y, w, h);
                    break;
                }
                case "left": {
                    this.contex.drawImage(texture, 78 + 14 + 2 + 14 + 2 + 14 + 2, 38, 14, 14, x, y, w, h);
                    break;
                }
            }
        }
    };

    View.prototype.drawCircle = function (x, y, r, color, direction){

        this.contex.beginPath();

        switch (direction) {
            case "right": {
                this.contex.arc(x + 6, y + 2,  r, 0, 2*Math.PI, false);
                break;
            }
            case "left": {
                this.contex.arc(x + 1, y + 1, r, 0, 2*Math.PI, false);
                break;
            }
            case "top": {
                this.contex.arc(x + 3, y, r, 0, 2*Math.PI, false);
                break;
            }
            case "bottom": {
                this.contex.arc(x + 4, y + 9, r, 0, 2*Math.PI, false);
                break;
            }
        }

        this.contex.fillStyle = color;
        this.contex.fill();
        this.contex.lineWidth = 1;
        this.contex.strokeStyle = color;
        this.contex.stroke();
    };

    tanksView = new View();
}

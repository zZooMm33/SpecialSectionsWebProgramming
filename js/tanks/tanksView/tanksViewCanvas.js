/*

Tanks view

*/
function startView() {
    var View = function() {
        //создаем игровове поле
        var game_window = document.querySelector('#game_window');

        var game = document.createElement("canvas");
        game.setAttribute("class", "game");

        game_window.appendChild(game);

        // поля - объекты
        this.game = document.querySelector('.game');
        this.contex = this.game.getContext('2d');

        this.game.width = this.game.offsetWidth;
        this.game.height = this.game.offsetHeight;

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

    };

    View.prototype.newEnemy = function (enemy){

    };

    View.prototype.deleteObject = function (object){

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
            this.contex.clearRect(0, 0, this.game.width, this.game.height);
            alert("Game Over");
        }
    };
    View.prototype.render = function (objs) {

        this.contex.clearRect(0, 0, this.game.width, this.game.height);

        tanksView.drawTank(objs.player.x , objs.player.y , 40, 40, "green", objs.player.direction);

        $.each(objs.bullet, function(index, value) {

            try {

                tanksView.drawCircle(value.x , value.y, 2.5, 'black', value.direction);
            }
            catch (e) {
                // пуля была удалена во время отрисовки
            }
        });


        this.contex.fillStyle = "red";
        $.each(objs.enemy, function(index, value) {

            try {
                tanksView.drawTank(value.x , value.y , 40, 40, "red", value.direction);
            }
            catch (e) {

            }
        });
    };

    View.prototype.drawTank = function (x, y, w, h, color, direction){
        this.contex.fillStyle = color;

        this.contex.fillRect(x, y, w, h);

        this.contex.beginPath();
        this.contex.lineWidth = 2;
        this.contex.strokeStyle = 'black';

        switch (direction) {
            case "right": {
                this.contex.moveTo(x + w, y + h / 2);
                this.contex.lineTo(x + w / 2, y +  h/ 2);
                break;
            }
            case "left": {
                this.contex.moveTo(x, y + h / 2);
                this.contex.lineTo(x + w / 2, y +  h/ 2);
                break;
            }
            case "top": {
                this.contex.moveTo(x + w / 2, y);
                this.contex.lineTo(x + w / 2, y +  h/ 2);
                break;
            }
            case "bottom": {
                this.contex.moveTo(x + w / 2, y + h);
                this.contex.lineTo(x + w / 2, y +  h/ 2);
                break;
            }
        }

        this.contex.stroke();
    };

    View.prototype.drawCircle = function (x, y, r, color, direction){

        this.contex.beginPath();

        switch (direction) {
            case "right": {
                this.contex.arc(x + 5, y + 2,  r, 0, 2*Math.PI, false);
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
                this.contex.arc(x + 3, y + 9, r, 0, 2*Math.PI, false);
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

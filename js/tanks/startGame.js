
var tanksModel = null;
var tanksView= null;
var tanksController= null;

function startGame() {
    if (tanksModel != null) {
        alert("Перезагрузите страницу");
        return;
    }

    document.querySelector('#getScore').style.display = "none";
    document.querySelector('#startGame').style.display = "none";
    document.querySelector('#game-size').style.display = "none";

    document.querySelector('#numbLife').innerHTML = "Количество жизней: 3";
    document.querySelector('#scoreGame').innerHTML = "Score: 0";

    var size;
    if (document.querySelector("#sizeUsual").checked) {
        size = "usual";
    }
    else {
        size = "big";

        var gameWindow = document.getElementById("game_window");
        gameWindow.style.height = 600+"px";
        gameWindow.style.width = 600+"px";
    }

    startView();
    startModel(size);
    startController();
}

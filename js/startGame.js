
var tanksModel = null;
var tanksView= null;
var tanksController= null;

function startGame() {
    if (tanksModel != null) {
        alert("Перезагрузите страницу");
        return;
    }

    document.querySelector('#startGame').style.display = "none";

    document.querySelector('.player').style.display = "block";
    document.querySelector('#numbLife').innerHTML = "Количество жизней: 3";
    document.querySelector('#scoreGame').innerHTML = "Score: 0";

    startView();
    startModel();
    startController();
}

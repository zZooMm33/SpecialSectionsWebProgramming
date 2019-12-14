// Имя переменной в local storage
const SCORE = "score";

// Макс количество рекордов
const MAX_SCORE = 10;

function getScore() {
    var score = localStorage.getItem(SCORE);

    if (score==null){
        alert("Рекордов нет !");
    }
    else{
        score = score.split(",");
        var scoreStr = "";
        for (var i = 0; i < score.length; i++){
            scoreStr += (i + 1) + ") " + score[i] + "\n";
        }
        alert(scoreStr);
    }

}
function addScore(newScore) {
    var score = localStorage.getItem(SCORE);
    if (score==null){
        localStorage.setItem(SCORE, [newScore]);
    }
    else {
        score = score.split(",");
        score.push(newScore);

        // Сортируем
        score.sort(function(a, b) {
            if (parseInt(a) < parseInt(b)) {
                return 1;
            }
            if (parseInt(a) > parseInt(b)) {
                return -1;
            }
            return 0;
        });

        // удаляем лишние
        for (;score.length > MAX_SCORE;){
            score = remove(score, MAX_SCORE);
        }

        localStorage.removeItem(SCORE);
        localStorage.setItem(SCORE, score);
    }

}
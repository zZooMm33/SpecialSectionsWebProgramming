const SCORE = "score";

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
        score.sort();
        localStorage.removeItem(SCORE);
        localStorage.setItem(SCORE, score);
    }

}
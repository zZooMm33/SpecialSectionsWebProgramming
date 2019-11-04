function volume(value) {
    if (currentPlay.type.indexOf("audio") !== -1) {
        document.getElementById("audio").volume += value;
        document.getElementById("volume").value =  document.getElementById("audio").volume;
    } else {
        document.getElementById("video").volume += value;
        document.getElementById("volume").value =  document.getElementById("video").volume;
    }
}

function setVolume(value) {
    if (currentPlay.type.indexOf("audio") !== -1) {
        document.getElementById("audio").volume = parseFloat(value);
    } else {
        document.getElementById("video").volume = parseFloat(value);
    }
}

function rewind(value) {
    if (currentPlay.type.indexOf("audio") !== -1) {
        document.getElementById("audio").currentTime += value;


    } else {
        document.getElementById("video").currentTime +=value;
    }
}

function play() {
    if (currentPlay.type.indexOf("audio") !== -1) {
        document.getElementById("audio").play();


    } else {
        document.getElementById('video').play();
    }
}

function pause() {
    if (currentPlay.type.indexOf("audio") !== -1) {
        document.getElementById("audio").pause();


    } else {
        document.getElementById('video').pause();
    }
}


function playNext() {
    var table = document.getElementById("playlist-table");
    var playNext = false;

    // 1 потому что шапка табл
    if (table.getElementsByTagName("tr").length === 1){
        hide("success");
        document.getElementById("error").innerHTML="Playlist пуст !";
        show("error");
        return;
    }

    for (var i = 0, row; row = table.rows[i]; i++) {

        if (playNext){
            playElement(row.cells[0].innerHTML,row.cells[1].innerHTML);
            return;
        }

        if (row.cells[0].innerHTML.indexOf(currentPlay.src) !== -1){
            playNext = true;
        }
    }

    hide("divAudio");
    hide("divVideo");
    hide('divControls');

    currentPlay.src = "";
    currentPlay.type = "";

    document.getElementById("audio").src = "";
    document.getElementById('video').src = "";

    document.getElementById("error").innerHTML="Playlist закончился !";
    show("error");
}

function playPrev() {
    var prevRow = null;
    var table = document.getElementById("playlist-table");

    // 1 потому что шапка табл
    if (table.getElementsByTagName("tr").length === 1){
        hide("success");
        document.getElementById("error").innerHTML="Playlist пуст !";
        show("error");
        return;
    }

    for (var i = 0, row; row = table.rows[i]; i++) {


        if (row.cells[0].innerHTML.indexOf(currentPlay.src) !== -1){
            // первая строка
            if (i === 1){
                return;
            }
            else{
                playElement(prevRow.cells[0].innerHTML, prevRow.cells[1].innerHTML);
            }
        }

        prevRow = row;
    }
}

function hotkeys(event) {

    if(currentPlay.src === "") return;

    var x = event.keyCode;

    //p
    if (x === 80) {
        play();
    }
    //s
    else if (x === 83) {
        pause();
    }
    //l
    else if (x === 37) {
        rewind(-10);
    }
    //r
    else if (x === 39) {
        rewind(10);
    }
    //up - 38 / +
    else if (x === 187) {
        volume(0.1);
    }
    //d - 40/ - 189
    else if (x === 189) {
        volume(-0.1);
    }
}
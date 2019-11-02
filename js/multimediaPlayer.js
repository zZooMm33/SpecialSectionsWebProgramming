
// Фонрматы для добавления файла через строку
const AUDIO_FORMAT = ["mp3", "wav"];
const VIDEO_FORMAT = ["mkv", "mp4"];

function play() {
    var table = document.getElementById("playlist-table");

    // 1 потому что шапка табл
    if (table.getElementsByTagName("tr").length === 1){
        hide("success");
        document.getElementById("error").innerHTML="Playlist пуст !";
        show("error");
        return;
    }

    playElement(table.rows[1].cells[0].innerHTML,table.rows[1].cells[1].innerHTML);
}

function checkFormatFile(inputType, id) {

    hide("error");
    hide("success");

    if (inputType === "file"){
        var file = document.getElementById(id).files[0], parts;

        if (file != null) parts = file.name.split('.');
        else {
            document.getElementById("error").innerHTML="Файл не выбран !";
            show("error");
            return;
        }

        if (parts.length > 1){

            var type = file.type; //тип
            if (type.indexOf("audio") !== -1 || type.indexOf("video") !== -1){

                var src =URL.createObjectURL(file);
                //var src = document.getElementById(id).value;
                var id = uuidv4();

                if (type.indexOf("avi") !== -1) {
                    document.getElementById("error").innerHTML="Неверный формат файла !";
                    show("error");
                    return;
                }

                // добавить в плэйлист + в MultimediaPlayer
                addRowInTable("playlist-table", src, type, id);

                document.getElementById("success").innerHTML="Файл успешно добавлен !";
                show("success");
            }
            else{
                document.getElementById("error").innerHTML="Неверный формат файла !";
                show("error");
            }
        }
        else{
            document.getElementById("error").innerHTML="Файл не выбран !";
            show("error");
        }
    }
    else {

        var src = document.getElementById(id).value;
        var ext = ( parts = src.split("/").pop().split(".") ).length > 1 ? parts.pop() : "";
        var type = "";
        var id = uuidv4();

        if (ext===""){
            document.getElementById("error").innerHTML="Не корректный путь к файлу !";
            show("error");
        }
        else {
            $.each(AUDIO_FORMAT, function(index, value) {
                if (value === ext){
                    // добавить в плэйлист + в MultimediaPlayer
                    type = "audio/" + ext;
                    addRowInTable("playlist-table", src, type, id);

                    document.getElementById("success").innerHTML="Файл успешно добавлен !";
                    show("success");
                    return 0;
                }
            });

            $.each(VIDEO_FORMAT, function(index, value) {
                if (value === ext){
                    // добавить в плэйлист + в MultimediaPlayer
                    type = "video/" + ext;
                    addRowInTable("playlist-table", src, type, id);

                    document.getElementById("success").innerHTML="Файл успешно добавлен !";
                    show("success");
                    return 0;
                }
            });

            if(type === ""){
                document.getElementById("error").innerHTML="Неверный формат файла !";
                show("error");
            }
        }
    }
}

function playElement(src, type) {
    if (type.indexOf("audio") !== -1) {
        document.getElementById("audio").src = src;

        hide("divVideo");
        show("divAudio");
    } else {
        var video = document.getElementById('video');
        video.src = src;
        video.load();

        hide("divAudio");
        show("divVideo");
    }
}

function playNext(element) {
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

        if (row.cells[0].innerHTML.indexOf(element.src) !== -1){
            playNext = true;
            element.src = "";
        }
    }

    hide("divAudio");
    hide("divVideo");

    document.getElementById("audio").src = "";
    document.getElementById('video').src = "";
    document.getElementById("error").innerHTML="Playlist закончился !";
    show("error");
}
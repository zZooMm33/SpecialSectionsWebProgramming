window.onload = function() {
    hide("error");
    hide("success");
    hide("divOpenFile");
    hide("divPlaylist");
    hide("divAudio");
    hide("divVideo");
    hide('divControls');

    window.addEventListener("keyup", hotkeys, false);
};

document.getElementById("audio").onended = function(){
    playNext();
};

document.getElementById("video").onended = function(){
    playNext();
};

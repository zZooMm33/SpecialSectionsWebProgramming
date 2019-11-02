window.onload = function() {
    hide("error");
    hide("success");
    hide("divOpenFile");
    hide("divPlaylist");
    hide("divAudio");
    hide("divVideo");
    hide('divControls');
};

document.getElementById("audio").onended = function(){
    playNext(this);
};

document.getElementById("video").onended = function(){
    playNext(this);
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new AudioContext();
var gainNode = null;

function play( snd ) {


    var request = new XMLHttpRequest();
    request.open( "GET", snd, true );
    request.responseType = "arraybuffer";
    request.onload = function () {
        var audioData = request.response;

        audioCtx.decodeAudioData(
            audioData,
            function ( buffer ) {
                var smp = audioCtx.createBufferSource();
                smp.buffer = buffer;
                //создание объекта GainNode и его привязка
                if (gainNode == null) {gainNode = audioCtx.createGain ? audioCtx.createGain() : audioCtx.createGainNode();}
                smp.connect( gainNode );
                gainNode.connect( audioCtx.destination );
                gainNode.gain.value = document.getElementById("volume").value;
                smp.start( 0 );
            },
            function ( e ) {
                alert( "Error with decoding audio data" + e.err );
            }
        );
    };
    request.send();
}

function setVolume(value) {
    if (gainNode != null){
        gainNode.gain.value = parseFloat(value);
    }
}
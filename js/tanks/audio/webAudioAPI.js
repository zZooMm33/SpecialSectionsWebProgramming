var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

// get the audio element
var audioElement = document.querySelector('#startGameSound');

// pass it into the audio context
var trackAudio = audioContext.createMediaElementSource(audioElement);

const pannerOptions = { pan: 0 };
var panner = new StereoPannerNode(audioContext, pannerOptions);

var gainNode = audioContext.createGain();

trackAudio.connect(audioContext.destination);


function setVolume(value) {
    document.getElementById("startGameSound").volume = parseFloat(value);
}

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
    panner.pan.value = this.value;
}, false);

const volumeControl = document.querySelector('#gain');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);

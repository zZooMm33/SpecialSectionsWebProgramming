var audioElementShot = null;
var audioElementStartGameSound = null;
var audioElementHitEnemyTank = null;

var trackAudioShot = null;
var trackAudioStartGameSound = null;
var trackAudioHitEnemyTank = null;

var panner = null;
var gainNode = null;

window.onload = function() {
    //window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //var audioContext = new AudioContext;

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();

    audioElementShot = document.querySelector('#shot');
    audioElementStartGameSound = document.querySelector('#startGameSound');
    audioElementHitEnemyTank = document.querySelector('#hitEnemyTank');

    trackAudioShot = audioContext.createMediaElementSource(audioElementShot);
    trackAudioStartGameSound = audioContext.createMediaElementSource(audioElementStartGameSound);
    trackAudioHitEnemyTank = audioContext.createMediaElementSource(audioElementHitEnemyTank);

    const pannerOptions = { pan: 0 };
    panner = new StereoPannerNode(audioContext, pannerOptions);

    gainNode = audioContext.createGain();

    //trackAudioShot.connect(gainNode).connect(panner).connect(audioContext.destination);
    trackAudioStartGameSound.connect(audioContext.destination);
    //trackAudioHitEnemyTank.connect(gainNode).connect(panner).connect(audioContext.destination);

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    audioElementStartGameSound.play();

}

// const pannerControl = document.querySelector('#panner');
//
// pannerControl.addEventListener('input', function() {
//     panner.pan.value = this.value;
// }, false);

const volumeControl = document.querySelector('#gain');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);

function setVolume(value) {
    audioElementShot.volume = parseFloat(value);
    audioElementStartGameSound.volume = parseFloat(value);
    audioElementHitEnemyTank.volume = parseFloat(value);
}

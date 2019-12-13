var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var audioElementShot = document.querySelector('.audioShot');
var audioElementStartGameSound = document.querySelector('.startGameSound');
var audioElementHitEnemyTank = document.querySelector('.itEnemyTank');

var trackAudioShot = audioContext.createMediaElementSource(audioElementShot);
var trackAudioStartGameSound = audioContext.createMediaElementSource(audioElementStartGameSound);
var trackAudioHitEnemyTank = audioContext.createMediaElementSource(audioElementHitEnemyTank);

const pannerOptions = { pan: 0 };
var panner = new StereoPannerNode(audioContext, pannerOptions);

var gainNode = audioContext.createGain();

trackAudioShot.connect(gainNode).connect(panner).connect(audioContext.destination);
trackAudioStartGameSound.connect(gainNode).connect(panner).connect(audioContext.destination);
trackAudioHitEnemyTank.connect(gainNode).connect(panner).connect(audioContext.destination);

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
    panner.pan.value = this.value;
}, false);

const volumeControl = document.querySelector('#gain');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);


function setVolume(value) {
    audioElementShot.volume = parseFloat(value);
    audioElementStartGameSound.volume = parseFloat(value);
    audioElementHitEnemyTank.volume = parseFloat(value);
}

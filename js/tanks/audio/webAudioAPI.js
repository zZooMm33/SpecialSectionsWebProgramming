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
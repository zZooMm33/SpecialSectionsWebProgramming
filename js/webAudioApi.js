var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

// get the audio element
var audioElement = document.querySelector('#audio');
var videoElement = document.querySelector('#video');

// pass it into the audio context
var trackAudio = audioContext.createMediaElementSource(audioElement);
var trackVideo = audioContext.createMediaElementSource(videoElement);

const pannerOptions = { pan: 0 };
var panner = new StereoPannerNode(audioContext, pannerOptions);

var gainNode = audioContext.createGain();

trackAudio.connect(gainNode).connect(panner).connect(audioContext.destination);
trackVideo.connect(gainNode).connect(panner).connect(audioContext.destination);


// select our play button
const playButton = document.querySelector('#buttonPlayPause');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause trackAudio depending on state
    if (this.dataset.playing === 'false') {

        if (currentPlay.type.indexOf("audio") !== -1) {
            audioElement.play();
            this.dataset.playing = 'true';
        } else {
            videoElement.play();
            this.dataset.playing = 'true';
        }
    }
    else if (this.dataset.playing === 'true') {
        if (currentPlay.type.indexOf("audio") !== -1) {
            audioElement.pause();
            this.dataset.playing = 'false';
        } else {
            videoElement.pause();
            this.dataset.playing = 'false';
        }


    }

}, false);

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
    panner.pan.value = this.value;
}, false);

const volumeControl = document.querySelector('#gain');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);



var bufferSize = 4096;
var effectPinkingFilter = (function() {
    var b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            b0 = 0.99886 * b0 + input[i] * 0.0555179;
            b1 = 0.99332 * b1 + input[i] * 0.0750759;
            b2 = 0.96900 * b2 + input[i] * 0.1538520;
            b3 = 0.86650 * b3 + input[i] * 0.3104856;
            b4 = 0.55000 * b4 + input[i] * 0.5329522;
            b5 = -0.7616 * b5 - input[i] * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + input[i] * 0.5362;
            output[i] *= 0.11; // (roughly) compensate for gain
            b6 = input[i] * 0.115926;
        }
    };
    return node;
})();


// select our play button
const playEffectPinkingFilter = document.querySelector('#effectPinkingFilter');
playEffectPinkingFilter.addEventListener('click', function() {
    trackAudio.connect(effectPinkingFilter).connect(gainNode).connect(panner).connect(audioContext.destination);
}, false);

var effectMoogFilter= (function() {
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    var in1, in2, in3, in4, out1, out2, out3, out4;
    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
    node.cutoff = 0.065; // between 0.0 and 1.0
    node.resonance = 3.99; // between 0.0 and 4.0
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
        var f = node.cutoff * 1.16;
        var fb = node.resonance * (1.0 - 0.15 * f * f);
        for (var i = 0; i < bufferSize; i++) {
            input[i] -= out4 * fb;
            input[i] *= 0.35013 * (f*f)*(f*f);
            out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
            in1 = input[i];
            out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
            in2 = out1;
            out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
            in3 = out2;
            out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
            in4 = out3;
            output[i] = out4;
        }
    }
    return node;
})();


// select our play button
const playEffectMoogFilter = document.querySelector('#effectMoogFilter');
playEffectMoogFilter.addEventListener('click', function() {
    trackAudio.disconnect();
    trackAudio.connect(effectMoogFilter).connect(gainNode).connect(panner).connect(audioContext.destination);
}, false);

var effectBitcrusher = (function() {
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    node.bits = 4; // between 1 and 16
    node.normfreq = 0.1; // between 0.0 and 1.0
    var step = Math.pow(1/2, node.bits);
    var phaser = 0;
    var last = 0;
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            phaser += node.normfreq;
            if (phaser >= 1.0) {
                phaser -= 1.0;
                last = step * Math.floor(input[i] / step + 0.5);
            }
            output[i] = last;
        }
    };
    return node;
})();

const playEffectBitcrusher = document.querySelector('#effectBitcrusher');
playEffectBitcrusher.addEventListener('click', function() {
    trackAudio.disconnect();
    trackAudio.connect(effectBitcrusher).connect(gainNode).connect(panner).connect(audioContext.destination);
}, false);

var effectOff = (function() {
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
    };

    return node;
})();

const effectOffButton = document.querySelector('#effectOff');
effectOffButton.addEventListener('click', function() {
    trackAudio.disconnect();
    trackAudio.connect(gainNode).connect(panner).connect(audioContext.destination);
}, false);
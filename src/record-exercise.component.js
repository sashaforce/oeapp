(function() {
  'use strict';

angular.module('OeApp').component('recordExerciseComponent', {
  templateUrl: 'src/templates/record-exercise.template.html',
  controller: 'RecordExerciseController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('RecordExerciseController', RecordExerciseController);

RecordExerciseController.$inject = ['AudioDataService'];
function RecordExerciseController (AudioDataService) {

  var ctrl = this;

  var audioRecorder = null;

  ctrl.isRecording = false;
  ctrl.recordButtonText = "Record";
  ctrl.sampleAudioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

  console.log("Initializing Audio");
  var sampleBuffer = null;
  var context;
  try {
    // Fix prefixing for blink & webkit-based browsers
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
  initAudio(); // TODO rename to reflect this is about the recorder

  var audioContext = new AudioContext();

  const audio = document.querySelector('audio');
  const recordButton = document.querySelector('#record-button');

  // ctrl.playSample = function () {
  //   console.log("playSample() START");
  //   audio.play();
  // }


  ctrl.playRecording = function () {
    console.log("Play Recording");
    context.resume(); // in case Chrome has suspended the context
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = sampleBuffer;              // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
  }

  ctrl.toggleRecord = function () { // TODO: change to state machine
    if (ctrl.isRecording) {
      // stop recording
      audioRecorder.stop();
      audioRecorder.getBuffers(gotBuffers);
      // update UI
      ctrl.isRecording = false;
      ctrl.recordButtonText = "Record";
    } else {
      // start recording
      if (!audioRecorder) {
        console.log("Recorder not ready");
        // TODO: disable record button until recorder is ready
        return;
      }
      audioRecorder.clear();
      audioRecorder.record();
      // update UI
      ctrl.isRecording = true;
      ctrl.recordButtonText = "Stop";
    }
  }

  // TODO: Should all this audio stuff be provided by a service?
  function initAudio() {
    console.log("initAudio() START");
    if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia(
      {
        "audio": {
          "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
          },
        "optional": []
        },
      }, gotStream, function(e) {
        alert('Error getting audio');
        console.log(e);
    });
  }

  function gotStream(stream) {
    console.log("gotStream() START");
    var inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    var audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(inputPoint);

    audioRecorder = new Recorder( inputPoint );
  }

  function gotBuffers( buffers ) {
    // the ONLY time gotBuffers is called is right after a new recording is completed -
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
  }

  function doneEncoding( blob ) {
    //Recorder.setupDownload( blob, "myRecording.wav" );
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    audio.src = url; // for sample player component, loaded from existing mp3, now loading from fresh recording
    loadSound(url);
  }

  function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        console.log("context.decodeAudioData()");
        sampleBuffer = buffer;
      }, function(){console.log("ERROR");}); // TODO: Handle this properly
    }
    request.send();
  }
}

}());

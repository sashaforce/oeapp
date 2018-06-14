(function() {
  'use strict';

angular.module('OeApp').component('recordExerciseComponent', {
  templateUrl: 'src/templates/record-exercise.template.html',
  controller: 'RecordExerciseController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('RecordExerciseController', RecordExerciseController);

RecordExerciseController.$inject = [];
function RecordExerciseController () {

  var ctrl = this;

  var audioRecorder = null;

  ctrl.isRecording = false;
  ctrl.recordButtonText = "Record";

  console.log("Initializing Audio");
  initAudio();

  var audioContext = new AudioContext();

  const audio = document.querySelector('audio');
  const recordButton = document.querySelector('#record-button');

  ctrl.toggleRecord = function () {
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
        audioRecorder.clear();
        audioRecorder.record();
      }
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
    Recorder.setupDownload( blob, "myRecording.wav" );
  }
}

}());

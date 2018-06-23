(function() {
  'use strict';

  angular.module('OeApp').component('recordPlaybackComponent', {
    templateUrl: 'src/templates/record-playback.template.html',
    controller: 'RecordPlaybackController as ctrl',
    bindings: {
      enableContinue: '&enableContinue'
    }
  })
  .controller('RecordPlaybackController', RecordPlaybackController);

  RecordPlaybackController.$inject = ['ImageService', '$scope'];
  function RecordPlaybackController(ImageService, $scope) {
    var ctrl = this;

    // init image urls
    ctrl.micImage = ImageService.getUrl('microphone-button');
    ctrl.activeMicImage = ImageService.getUrl('microphone-button-active');
    ctrl.speakerImage = ImageService.getUrl('speaker-button-lg');
    ctrl.activeSpeakerImage = ImageService.getUrl('speaker-button-active');

    // init state
    ctrl.state = 'READY';

    var listenCount = 0; // incremented each time user listens to their recording

    // init audio
    var audioRecorder = null;
    var sampleBuffer = null;
    var source = null;
    var context;
    try {
      // Fix prefixing for blink & webkit-based browsers
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
    initAudioRecorder();

    var audioContext = new AudioContext();

    function changeState (toState) {
      console.log("Change State from", ctrl.state, "to", toState);
      // set new state
      ctrl.state = toState;

      // ok to continue if user has recorded themselves and listened to the recording at least once
      ctrl.enableContinue({enable:(ctrl.state === 'DONE') && (listenCount>0)});
    }

    ctrl.startRecording = function () {
      changeState('RECORDING');
      if (!audioRecorder) {
        console.log("Recorder not ready");
        // TODO: disable record button until recorder is ready
        return;
      }
      audioRecorder.clear();
      audioRecorder.record();
    }

    ctrl.stopRecording = function () {
      changeState('DONE');
      audioRecorder.stop();
      audioRecorder.getBuffers(gotBuffers);
    }

    ctrl.startPlayback = function () {
      changeState('LISTENING');

      console.log("Play Recording");
      context.resume(); // in case Chrome has suspended the context
      source = context.createBufferSource(); // creates a sound source
      source.buffer = sampleBuffer;              // tell the source which sound to play
      source.onended = function () {changeState('DONE'); $scope.$digest()};
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now
      console.log("increment listenCount");
      listenCount++;
    }

    ctrl.stopPlayback = function () {
      changeState('DONE');
      source.stop();
      // TODO also change state on end of playback
    }

    ctrl.tryAgain = function () {
      changeState('READY');
    }

    function initAudioRecorder() {
      console.log("initAudioRecorder() START");
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
          alert('Error getting audio'); // TODO: handle this better
          console.log(e);
      });
    };

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
      console.log("gotBuffers() START:", buffers);
      audioRecorder.exportWAV( doneEncoding );
    }

    function doneEncoding( blob ) {
      //Recorder.setupDownload( blob, "myRecording.wav" );
      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      loadSound(url);
    };

    function loadSound(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
          console.log("context.decodeAudioData(); buffer =", buffer);
          sampleBuffer = buffer;
        }, function(){console.log("ERROR");}); // TODO: Handle this properly
      }
      request.send();
    }

    ctrl.$onDestroy = function () {
      console.log("record-playback DESTROY");
      context.close();
      audioContext.close();
    }

  };



}());

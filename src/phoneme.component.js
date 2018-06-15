(function() {
  'use strict';

  angular.module('OeApp').component('phonemeComponent', {
    templateUrl: 'src/templates/phoneme.template.html',
    controller: 'PhonemeController as ctrl',
    bindings: {
      exercise: '<'
    }
  })
  .controller('PhonemeController', PhonemeController);

  PhonemeController.$inject = ['ImageService', 'AudioDataService'];
  function PhonemeController(ImageService, AudioDataService) {
    var ctrl = this;

    ctrl.listenButtonUrl = ImageService.getUrl("speaker-button-sm");
    ctrl.imageUrl = ImageService.getUrl(ctrl.exercise.imageId);
    ctrl.audioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

    // initialize audio
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
    loadSound(ctrl.audioUrl);

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

    ctrl.playExample = function () {
      console.log("Play sample word");
      context.resume(); // in case Chrome has suspended the context
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = sampleBuffer;              // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now
    }
  };
}());

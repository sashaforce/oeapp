(function() {
  'use strict';

  angular.module('OeApp').component('samplePlayerComponent', {
    templateUrl: 'src/templates/sample-player.template.html',
    controller: 'SamplePlayerController as ctrl',
    bindings: {
      url: '<',
      oeWord: '<',
      meWord: '<' // TODO: Standardize naming oeWord/meWord
    }
  })
  .controller('SamplePlayerController', SamplePlayerController);

  SamplePlayerController.$inject = [];
  function SamplePlayerController() {
    var ctrl = this;
    console.log("SamplePlayerController() START", ctrl);

    var sampleBuffer = null;
    var context;

    // initialize audio
    ctrl.$onChanges = function (changesObj) {
      console.log("ctrl.$onChanges()", changesObj);
      try {
        // Fix prefixing for blink & webkit-based browsers
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
      }
      catch(e) {
        alert('Web Audio API is not supported in this browser');
      }
      loadSound(ctrl.url);
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

    ctrl.playExample = function () {
      console.log("Play sample word");
      context.resume(); // in case Chrome has suspended the context
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = sampleBuffer;              // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now
    }
  }

}());

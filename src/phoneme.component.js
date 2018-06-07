(function() {
  'use strict';

  angular.module('OeApp').component('phonemeComponent', {
    templateUrl: '/src/templates/phoneme.template.html',
    controller: 'PhonemeController as ctrl',
    bindings: {
      exercise: '<'
    }
  }).controller('PhonemeController', PhonemeController);

  PhonemeController.$inject = ['ImageService', 'AudioDataService'];
  function PhonemeController(ImageService, AudioDataService) {
    var ctrl = this;

    ctrl.listenButtonUrl = ImageService.getUrl("speaker-button-sm");
    ctrl.imageUrl = ImageService.getUrl(ctrl.exercise.imageId);
    ctrl.audioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

    var audioElement = document.getElementById('sampleAudio');
    console.log("audioElement:", audioElement);

    ctrl.playExample = function () {
      console.log("Play sample word");
      var audioElement = document.getElementById('sampleAudio');
      console.log("audioElement:", audioElement);
      audioElement.play();

      // var x = document.createElement("AUDIO");
      // x.setAttribute("src","/audio/ael_Sasha.m4a");
      // document.body.appendChild(x);
      // x.play();
      // var audio = new Audio('/audio/ael_Sasha.m4a');
      // audio.play();
    }
  };
}());

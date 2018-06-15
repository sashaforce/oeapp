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

  };
}());

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

  PhonemeController.$inject = ['ImageService', 'AudioDataService', '$scope'];
  function PhonemeController(ImageService, AudioDataService, $scope) {
    var ctrl = this;

    ctrl.$onChanges = function (changesObj) {
      ctrl.listenButtonUrl = ImageService.getUrl("speaker-button-sm");
      ctrl.imageUrl = ImageService.getUrl(ctrl.exercise.imageId);
      ctrl.audioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);
    }

  };
}());

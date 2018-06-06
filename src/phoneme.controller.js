(function() {
  'use strict';

angular.module('OeApp').controller('PhonemeController', PhonemeController);

PhonemeController.$inject = ['ImageService'];
function PhonemeController(ImageService) {
  var ctrl = this;

  ctrl.listenButtonUrl = ImageService.getUrl("speaker-button-sm");
  ctrl.imageUrl = ImageService.getUrl(ctrl.exercise.imageId);
};

}());

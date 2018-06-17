(function() {
  'use strict';

  angular.module('OeApp').component('recordPlaybackComponent', {
    templateUrl: 'src/templates/record-playback.template.html',
    controller: 'RecordPlaybackController as ctrl'
  })
  .controller('RecordPlaybackController', RecordPlaybackController);

  RecordPlaybackController.$inject = ['ImageService'];
  function RecordPlaybackController(ImageService) {
    var ctrl = this;

    // init image urls
    ctrl.micImage = ImageService.getUrl('microphone-button');
    ctrl.activeMicImage = ImageService.getUrl('microphone-button-active');
    ctrl.speakerImage = ImageService.getUrl('speaker-button-lg');
    ctrl.activeSpeakerImage = ImageService.getUrl('speaker-button-active');

    // init state
    ctrl.state = 'READY';

    ctrl.changeState = function (toState) {
      // set new state
      ctrl.state = toState;
    }

  };

}());

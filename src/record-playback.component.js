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
    var speakerImage = ImageService.getUrl('speaker-button-lg');
    var micImage = ImageService.getUrl('microphone-button');
    var activeMicImage = ImageService.getUrl('microphone-button-active');
    var activeSpeakerImage = ImageService.getUrl('speaker-button-active');
    // init state
    ctrl.state = 'READY';
    ctrl.buttonImage = micImage;

    ctrl.changeState = function (toState) {
      // set new state
      ctrl.state = calculateNewState(toState); // TODO does this work if null?
      // update UI
      if (ctrl.state === 'READY'){
        ctrl.buttonImage = micImage;
      } else if (ctrl.state === 'RECORDING') {
        ctrl.buttonImage = activeMicImage;
      } else if (ctrl.state === 'DONE') {
        ctrl.buttonImage = speakerImage;
      } else if (ctrl.state === 'LISTENING') {
        ctrl.buttonImage = activeSpeakerImage;
      }
    }

    function calculateNewState(toState) {
      if (toState) {
        return toState;
      }
      if (ctrl.state === 'READY') {
        return 'RECORDING';
      }
      if (ctrl.state === 'RECORDING') {
        return 'DONE';
      }
      if (ctrl.state === 'DONE') {
        return 'LISTENING';
      }
      if (ctrl.state === 'LISTENING') {
        return 'DONE';
      }
      console.log("calculateNewState() ERROR Unexpected state:", toState); // TODO: null OK?
      return 'READY';
    }

  };

}());

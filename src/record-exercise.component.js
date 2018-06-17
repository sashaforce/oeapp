(function() {
  'use strict';

angular.module('OeApp').component('recordExerciseComponent', {
  templateUrl: 'src/templates/record-exercise.template.html',
  controller: 'RecordExerciseController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('RecordExerciseController', RecordExerciseController);

RecordExerciseController.$inject = ['AudioDataService'];
function RecordExerciseController (AudioDataService) {

  var ctrl = this;

  ctrl.sampleAudioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

}

}());

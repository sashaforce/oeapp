(function() {
  'use strict';

angular.module('OeApp').component('recordExerciseComponent', {
  templateUrl: 'src/templates/record-exercise.template.html',
  controller: 'RecordExerciseController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('RecordExerciseController', RecordExerciseController);

RecordExerciseController.$inject = ['AudioDataService', '$scope'];
function RecordExerciseController (AudioDataService, $scope) {

  var ctrl = this;
  ctrl.sampleAudioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

  // continue should be disabled until we expressly enable it
  $scope.$emit("lesson:enableContinue", false);

  ctrl.enableContinue = function (enable) {
    console.log("enableContinue()", enable);
    $scope.$emit("lesson:enableContinue", {okToContine:enable});
  }
}

}());

(function() {
  'use strict';

angular.module('OeApp').controller('ExerciseController', ExerciseController);

ExerciseController.$inject = ['exerciseData'];
function ExerciseController(exerciseData){
  var ctrl = this;

  ctrl.exercise = exerciseData;
  console.log("exerciseData: ", ctrl.exercise);
  ctrl.id = exerciseData.id;
  ctrl.type = exerciseData.type;

  ctrl.enableContinue = function (enable) {
    ctrl.okToContinue = enable;
  }
}

}());

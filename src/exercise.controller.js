(function() {
  'use strict';

angular.module('OeApp').controller('ExerciseController', ExerciseController);

ExerciseController.$inject = ['exerciseData'];
function ExerciseController(exerciseData){
  var ctrl = this;

  ctrl.id = exerciseData.id;
  ctrl.type = exerciseData.type;
}

}());

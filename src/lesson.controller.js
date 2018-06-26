(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['exercises', '$state'];
function LessonController(exercises, $state) {
  var ctrl = this;
  console.log(ctrl);

  ctrl.currentExerciseIndex = 0;
  ctrl.totalExercises = exercises.length;

  ctrl.getCurrentExercise = function () {
    return exercises[ctrl.currentExerciseIndex];
  }

  ctrl.doContinue = function () {
    var nextIndex = ctrl.currentExerciseIndex + 1;
    if (nextIndex < exercises.length) {
      ctrl.currentExerciseIndex = nextIndex;
    } else {
      $state.go("lessonComplete");
    }
  }
}

}());

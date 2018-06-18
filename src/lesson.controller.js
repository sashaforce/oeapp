(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['lessonData', '$state', '$scope'];
function LessonController(lessonData, $state, $scope) {
  var ctrl = this;

  console.log("Initializing currentExerciseIndex");
  var currentExerciseIndex = 0;
  // BUG: reloading the page resets the index, but doesn't change the current page
  // IDEA: get current exercise from exercise component, instead of maintaining an index
  ctrl.lessonComplete = false;

  ctrl.id = lessonData.id;
  ctrl.name = lessonData.name;

  ctrl.continueDisabled = false;

  $scope.$on('lesson:enableContinue', function (event, data) {
    console.log("received event", event, "data", data);
    ctrl.continueDisabled = !(data.okToContine);
  })

  ctrl.continue = function () {
    console.log("Current index: ", currentExerciseIndex);
    if (ctrl.lessonComplete) {
      // go home
      console.log("Go home");
      $state.go("home");
    } else if (currentExerciseIndex < (lessonData.exercises.length - 1)) {
      // move to next exercise
      console.log("Next exercise");
      $state.go("lesson.exercise", {
        lessonId: lessonData.id,
        exerciseId: lessonData.exercises[++currentExerciseIndex]
      });
    } else {
      // move to "lesson complete"
      console.log("Lesson Complete");
      ctrl.lessonComplete = true;
      $state.go("lesson.complete");
    }
  }
}

}());

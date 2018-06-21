(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['lessonData', '$state', '$scope', '$timeout'];
function LessonController(lessonData, $state, $scope, $timeout) {
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
    // timeout = hack to make sure digest happens (https://stackoverflow.com/a/18996042/865961)
    $timeout(function(){ctrl.continueDisabled = !(data.okToContinue)});
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

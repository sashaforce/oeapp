(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['lessonData', '$state'];
function LessonController(lessonData, $state) {
  var ctrl = this;

  console.log("Initializing currentExerciseIndex");
  var currentExerciseIndex = 0;
  // BUG: reloading the page resets the index, but doesn't change the current page
  ctrl.lessonComplete = false;

  ctrl.id = lessonData.id;
  ctrl.name = lessonData.name;

  ctrl.continue = function () {
    console.log("Current index: ", currentExerciseIndex);
    if (ctrl.lessonComplete) {
      // TODO: go home
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
      // TODO: move to "lesson complete"
      console.log("Lesson Complete");
      ctrl.lessonComplete = true;
      $state.go("lesson.complete");
    }
    // TODO check for end of exercises, go to end screen (or home for now)
  }
}

}());

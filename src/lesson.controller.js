(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['lessonData', '$state', '$scope', '$timeout'];
function LessonController(lessonData, $state, $scope, $timeout) {
  var ctrl = this;

  console.log("Initializing currentExerciseIndex");
  ctrl.currentExerciseIndex = 0;
  ctrl.totalExercises = lessonData.exercises.length;
  // BUG: reloading the page resets the index, but doesn't change the current page
  // IDEA: get current exercise from exercise component, instead of maintaining an index
  ctrl.lessonComplete = false;

  ctrl.id = lessonData.id;
  ctrl.name = lessonData.name;

  // default state: check button disabled
  disableCheck();

  $scope.$on('lesson:disableCheck', function (event, data) {
    console.log("received event", event, "data", data);
    // timeout = hack to make sure digest happens (https://stackoverflow.com/a/18996042/865961)
    $timeout(disableCheck);
  });

  $scope.$on('lesson:enableCheck', function (event, data) {
    console.log("received event", event, "data", data);
    $timeout(enableCheck);
  });

  $scope.$on('lesson:enableContinue', function (event, data) {
    console.log("received event", event, "data", data);
    $timeout(enableContinue);
  });

  $scope.$on('lesson:disableContinue', function (event, data) {
    console.log("received event", event, "data", data);
    $timeout(disableContinue);
  });

  function disableCheck() {
    console.log("disableCheck()");
    ctrl.buttonText = "Check";
    ctrl.buttonDisabled = true;
  }

  function enableCheck() {
    console.log("enableCheck()");
    ctrl.buttonText = "Check";
    ctrl.buttonDisabled = false;

  }

  function enableContinue() {
    console.log("enableContinue()");
    ctrl.buttonText = "Continue";
    ctrl.buttonDisabled = false;
  }

  function disableContinue() {
    console.log("enableContinue()");
    ctrl.buttonText = "Continue";
    ctrl.buttonDisabled = true;
  }

  ctrl.next = function () {
    if (ctrl.buttonText === "Continue") { // TODO: fix this hack!!!
      // continue to next exercise
      doContinue();
    } else {
      // tell exercise to check if correct
      $scope.$broadcast("lesson:check");
    }
  }

  function doContinue() {
    console.log("Current index: ", ctrl.currentExerciseIndex);
    if (ctrl.lessonComplete) {
      // go home
      console.log("Go home");
      $state.go("home");
    } else if (ctrl.currentExerciseIndex < (lessonData.exercises.length - 1)) {
      // move to next exercise
      console.log("Next exercise");
      disableCheck();
      $state.go("lesson.exercise", {
        lessonId: lessonData.id,
        exerciseId: lessonData.exercises[++ctrl.currentExerciseIndex]
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

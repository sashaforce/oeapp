(function() {
  'use strict';

angular.module('OeApp')
.component('exerciseComponent', {
  templateUrl: 'src/templates/exercise.template.html',
  controller: 'ExerciseController as ctrl',
  bindings: {
    exercise: '<',
    doContinue: '&'
  }
})
.controller('ExerciseController', ExerciseController);

ExerciseController.$inject = ['LessonDataService', '$scope'];
function ExerciseController(LessonDataService, $scope){
  var ctrl = this;
  console.log(ctrl);

  var State = Object.freeze({
    NEW: 0, // user hasn't made any changes, or has changed it back to original state
    DIRTY: 1, // user has made changes, but not yet correct
    CORRECT: 2, // user has made changes, answer is correct
    FEEDBACK: 3, // user has clicked "check", getting feedback (correct/incorrect)
    NOFEEDBACK: 4 // no feedback required - we jump straight to showing "continue" (e.g. for info-only slides)
  });

  var isCorrect;
  var state;

  ctrl.$onChanges = function (changesObj) {
    console.log("$onChanges()", changesObj);
    // exercise has changed - initialize everything

    isCorrect = false; // set to true when user clicks "check" on correct answer
    ctrl.message = ""; // optional message included in user feedback

    // initialize state
    if (LessonDataService.isInfoOnly(ctrl.exercise.type)) {
      state = State.NOFEEDBACK;
    } else {
      state = State.NEW; // QUESTION: Will we need to explicitly watch state?
    }
  }

  ctrl.checkDisabled = function () {
    return (state === State.NEW);
  }

  ctrl.checkVisible = function () {
    return (state === State.NEW) || (state === State.DIRTY) || (state == State.CORRECT);
  }

  ctrl.continueDisabled = function () {
    return false;
  }

  ctrl.continueVisible = function () {
    return (state === State.FEEDBACK) || (state === State.NOFEEDBACK);
  }

  ctrl.onUserAction = function (dirty, correct, message) {
    // called when user takes some action in the exercise.
    // dirty = true if result is that answer is changed from new
    // dirty = false if answer is in same state as new
    console.log("onUserAction()", dirty, correct, message);
    if (correct) {
      $scope.$apply(function () {state = State.CORRECT;});
    } else { // not correct
      if (dirty) {
        $scope.$apply(function () {state = State.DIRTY;});
      } else {
        $scope.$apply(function () {state = State.NEW;});  // TODO Test this case
      }
    }
    ctrl.message = message;
  }

  ctrl.doCheck = function () {
    isCorrect = (state === State.CORRECT);
    // $scope.$apply(function () {
      state = State.FEEDBACK;
    //});
  }

  ctrl.doneExercise = function () {
    console.log("doneExercise()");
    ctrl.doContinue(); // call continue in parent (lesson)
  }




}

}());

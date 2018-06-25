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
// TODO: Do we really need this component? Can we not put a div with all the exercise types right into the lesson component? It seems like this component is tightly coupled with the specific exercises (providing check/continue buttons), and yet infringeing on responsibilities that make sense to be in the lesson (movement from exercise to exercise, keeping track of progress)

ExerciseController.$inject = ['LessonDataService'];
function ExerciseController(LessonDataService){
  var ctrl = this;
  console.log(ctrl);

  var State = Object.freeze({
    NEW: 0,
    DIRTY: 1,
    FEEDBACK: 2,
    NOFEEDBACK: 3
  })

  // initialize state
  var state;
  if (LessonDataService.isInfoOnly(ctrl.exercise.type)) {
    state = State.NOFEEDBACK;
  } else {
    state = State.NEW; // QUESTION: Will we need to explicitly watch state?
  }

  ctrl.checkDisabled = function () {
    return (state === State.NEW);
  }

  ctrl.checkVisible = function () {
    return (state === State.NEW) || (state === State.DIRTY);
  }

  ctrl.continueDisabled = function () {
    return false;
  }

  ctrl.continueVisible = function () {
    return (state === State.FEEDBACK) || (state === State.NOFEEDBACK);
  }

  ctrl.onUserAction = function (dirty) {
    // called when user takes some action in the exercise.
    // dirty = true if result is that answer is changed from new
    // dirty = false if answer is in same state as new
    if (dirty) {
      state = State.DIRTY;
    } else {
      state = State.NEW;
    }
  }

  ctrl.doneExercise = function () {
    console.log("doneExercise()");
    ctrl.doContinue(); // call continue in parent (lesson)
  }


}

}());

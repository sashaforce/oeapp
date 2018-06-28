(function() {
  'use strict';

  angular.module('OeApp').component('missingWordComponent', {
    templateUrl: 'src/templates/missing-word.template.html',
    controller: 'MissingWord as ctrl',
    bindings: {
      exercise: '<',
      userAction: '&'
    }
  }).controller('MissingWord', MissingWord);

  MissingWord.$inject = [];
  function MissingWord() {

    var ctrl = this;

    function updateExerciseComponent() {
      var correct = isCorrect();
      var message = "";
      if (correct) {
        message = ctrl.exercise.messageRight;
      } else {
        message = ctrl.exercise.messageWrong;
      }
      ctrl.userAction({
        dirty: true,
        correct: correct,
        message: message
      });
    }

    function isCorrect() {
      return (ctrl.answer === ctrl.exercise.answer);
    }

    ctrl.onClick = function () {
      console.log("onClick()", ctrl.answer);
      updateExerciseComponent();
    }

  }

}());

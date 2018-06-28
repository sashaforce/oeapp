(function() {
  'use strict';

  angular.module('OeApp')
  .component('feedbackComponent', {
    templateUrl: 'src/templates/feedback.template.html',
    controller: 'FeedbackController as ctrl',
    bindings: {
      isCorrect: '<',
      message: '<'
    }
  })
  .controller('FeedbackController', FeedbackController);

  FeedbackController.$inject = [];
  function FeedbackController(){

    var ctrl = this;
    console.log(ctrl);

    var element = document.getElementById('feedback');

    ctrl.$onChanges = function () {
      if (ctrl.isCorrect) {
        element.classList.add("correct");
      } else {
        element.classList.add("incorrect");
      }
    }
  }

}());

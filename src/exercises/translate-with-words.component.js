(function() {
  'use strict';

  angular.module('OeApp').component('translateWithWordsComponent', {
    templateUrl: 'src/templates/translate-with-words.template.html',
    controller: 'TranslateWithWords as ctrl',
    bindings: {
      exercise: '<',
      userAction: '&'
    }
  }).controller('TranslateWithWords', TranslateWithWords);

  TranslateWithWords.$inject = ['$scope','AudioDataService'];
  function TranslateWithWords($scope, AudioDataService) {
    var ctrl = this;

    ctrl.$onChanges = function (changesObj) {
      var tmpWords = ctrl.exercise.words;
      tmpWords.sort(function(a, b){return 0.5 - Math.random()});
      ctrl.words = tmpWords;
    }

    ctrl.clickWord = function (event){
      console.log("clickWord(event): ", event);

      // If parent is corral, add to translation
      if (event.target.parentElement.id == 'word-corral') {
        document.getElementById('translation').appendChild(event.target);
      } else { // Otherwise, return to corral
        document.getElementById('word-corral').appendChild(event.target);
      }

      updateExerciseComponent();
    }

    function updateExerciseComponent() {
      var correct = isCorrect();
      var message = "";
      if (correct) {
        message = ctrl.exercise.messageRight;
      } else {
        message = ctrl.exercise.messageWrong;
      }
      ctrl.userAction({
        dirty: true, // TODO: dirty=false if restored to original state
        correct: correct,
        message: message
      });
    }

    function isCorrect() {
      // iterate over children of translation and construct user's answer
      var translationElements = document.getElementById('translation').children;
      var userAnswer = "";
      for (var i = 0; i < translationElements.length; i++) {
        if (i > 0) {
          userAnswer += " ";
        }
        userAnswer += translationElements[i].innerText;
      }
      return (userAnswer === ctrl.exercise.answer);
    }

    function handleCorrect() {
      alert("Correct!");
      $scope.$emit("lesson:enableContinue");
    }

    function handleIncorrect() {
      alert("Wrong :(");
      $scope.$emit("lesson:enableContinue");
    }
  } // TranslateWithWords

}());

(function() {
  'use strict';

  angular.module('OeApp').component('translateWithWordsComponent', {
    templateUrl: 'src/templates/translate-with-words.template.html',
    controller: 'TranslateWithWords as ctrl',
    bindings: {
      exercise: '<'
    }
  }).controller('TranslateWithWords', TranslateWithWords);

  TranslateWithWords.$inject = ['$scope','AudioDataService'];
  function TranslateWithWords($scope, AudioDataService) {
    var ctrl = this;

    var tmpWords = ctrl.exercise.words;
    tmpWords.sort(function(a, b){return 0.5 - Math.random()});
    ctrl.words = tmpWords;

    ctrl.clickWord = function (event){
      console.log("clickWord(event): ", event);

      // If parent is corral, add to translation
      if (event.target.parentElement.id == 'word-corral') {
        document.getElementById('translation').appendChild(event.target);
      } else { // Otherwise, return to corral
        document.getElementById('word-corral').appendChild(event.target);
      }

      $scope.$emit("lesson:enableCheck");
    }

    $scope.$on('lesson:check', function (event, data) {
      console.log("received event", event, "data", data);
      checkCorrect();
    });

    function checkCorrect() {
      // iterate over children of translation and construct user's answer
      var translationElements = document.getElementById('translation').children;
      var userAnswer = "";
      for (var i = 0; i < translationElements.length; i++) {
        if (i > 0) {
          userAnswer += " ";
        }
        userAnswer += translationElements[i].innerText;
      }
      if (userAnswer === ctrl.exercise.answer) {
        handleCorrect();
      } else {
        handleIncorrect();
      }
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

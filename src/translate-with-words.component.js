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

    // TODO: use audio component for phrase

    var tmpWords = ctrl.exercise.words;
    tmpWords.sort(function(a, b){return 0.5 - Math.random()});
    ctrl.words = tmpWords;

    ctrl.audioUrl = AudioDataService.getUrl(ctrl.exercise.audioId);

    // continue should be disabled until we expressly enable it
    $scope.$emit("lesson:enableContinue", {okToContinue: false});

    ctrl.clickWord = function (event){
      console.log("clickWord(event): ", event);

      // If parent is corral, add to translation
      if (event.target.parentElement.id == 'word-corral') {
        document.getElementById('translation').appendChild(event.target);
      } else { // Otherwise, return to corral
        document.getElementById('word-corral').appendChild(event.target);
      }

      enableContinue(isCorrect());
    }

    function enableContinue(enable) {
      console.log("enableContinue()", enable);
      $scope.$emit("lesson:enableContinue", {okToContinue: enable});
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
  } // TranslateWithWords

}());

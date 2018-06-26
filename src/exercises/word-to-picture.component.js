(function() {
  'use strict';

angular.module('OeApp').component('wordToPictureComponent', {
  templateUrl: 'src/templates/word-to-picture.template.html',
  controller: 'WordToPictureController as ctrl',
  bindings: {
    exercise: '<',
    userAction: '&'
  }
}).controller('WordToPictureController', WordToPictureController);

WordToPictureController.$inject = ['$scope', 'ImageService'];
function WordToPictureController ($scope, ImageService) {

  var ctrl = this;

  // create picture collection for display & randomize
  var tmpQuestions = []; //tmp arrays, so view doesn't update until we're done
  var tmpAnswers = [];
  for (var i=0; i < ctrl.exercise.questions.length; i++) {
    var question = {
      id: ctrl.exercise.questions[i].imageId,
      imageUrl: ImageService.getUrl(ctrl.exercise.questions[i].imageId)
    }
    tmpQuestions.push(question);

    var answer = {
      id: ctrl.exercise.questions[i].imageId,
      text: ctrl.exercise.questions[i].answer
    }
    tmpAnswers.push(answer);
  }
  tmpQuestions.sort(function(a, b){return 0.5 - Math.random()});
  tmpAnswers.sort(function(a, b){return 0.5 - Math.random()});
  ctrl.questions = tmpQuestions;
  ctrl.answers = tmpAnswers; // TODO: allow for extra answers

  // ctrl.enableContinue = function (enable) { // TODO: should this be attached to ctrl?
  //   console.log("enableContinue()", enable);
  //   $scope.$emit("lesson:enableContinue", {okToContinue: enable});
  // }

  // function isComplete() {
  //   // check if all pictures have words
  //   for (var i = 0; i < ctrl.questions.length; i++) {
  //     // get word drop for question
  //     var wordDrop = document.getElementById("drop-" + ctrl.questions[i].id);
  //     // get answer collection
  //     var answers = wordDrop.getElementsByClassName('draggable-word');
  //     // there should only be one answer
  //     if (answers.length > 1) {
  //       console.log("ERROR: question " + ctrl.questions[i].id + " contains more than one answer:", answers);
  //       return;
  //     }
  //     // if no answer for this question, then set is not complete
  //     if (answers.length < 1) {
  //       return false;
  //     }
  //   }
  //   // if we get this far, then all the questions had answers
  //   return true;
  // }

  function isCorrect() {
    // check if all answers are correct
    for (var i = 0; i < ctrl.questions.length; i++) {
      console.log("Check is correct:", ctrl.questions[i].id);
      // get word drop for question
      var wordDrop = document.getElementById("drop-" + ctrl.questions[i].id);
      // get answer collection
      var answers = wordDrop.getElementsByClassName('draggable-word');
      // there should only be one answer
      if (answers.length > 1) {
        console.log("ERROR: question " + ctrl.questions[i].id + " contains more than one answer:", answers);
        return;
      }
      // if no answer for this question, then set is not correct
      if (answers.length < 1) {
        console.log("no answer found for ", ctrl.questions[i].id);
        return false;
      }
      // compare answer to correct answer
      var answerElement = answers[0];
      if (answerElement.getAttribute('wordId') !== ctrl.questions[i].id) {
        return false;
      }
    }
    // if we get this far, then all the questions were correct
    console.log("All questions correct.");
    return true;
  }

  // $scope.$on('lesson:check', function (event, data) {
  //   console.log("received event", event, "data", data);
  //   if (isCorrect()) {
  //     alert("Correct!")
  //   } else {
  //     alert("Wrong.")
  //   }
  //   $scope.$emit("lesson:enableContinue");
  // });

  // attach drag & drop methods to $scope for access via angular.element(this).scope()

  $scope.drag = function (event) {
    console.log("drag()", event);
    event.dataTransfer.setData("text", event.target.id);
  }

  $scope.drop = function(event) {
    console.log("drop()", event);
    // drop the word
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    console.log("drop() data:", data);
    var draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);

    //ctrl.enableContinue((isComplete() && isCorrect()));
    //$scope.$emit("lesson:enableCheck");
    ctrl.userAction({dirty:true}); // TODO: dirty=false if restored to original state

  }

  $scope.allowDrop = function (event) {
    if ((event.target.classList.contains("word-drop") && event.target.children.length == 0)
        || event.target.id === "word-corral") {
      event.preventDefault();
    }
  }
}

}());

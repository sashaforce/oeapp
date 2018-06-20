(function() {
  'use strict';

angular.module('OeApp').component('wordToPictureComponent', {
  templateUrl: 'src/templates/word-to-picture.template.html',
  controller: 'WordToPictureController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('WordToPictureController', WordToPictureController);

WordToPictureController.$inject = ['$scope', 'ImageService'];
function WordToPictureController ($scope, ImageService) {

  var ctrl = this;

  ctrl.pictures = [];
  for (var i=0; i < ctrl.exercise.pictures.length; i++) {
    var picture = {
      url: ImageService.getUrl(ctrl.exercise.pictures[i])
    }
    ctrl.pictures.push(picture);
  }
  ctrl.words = ctrl.exercise.words; // TODO: randomize


  // continue should be disabled until we expressly enable it
  // $scope.$emit("lesson:enableContinue", false);

  ctrl.enableContinue = function (enable) {
    console.log("enableContinue()", enable);
    $scope.$emit("lesson:enableContinue", {okToContine:enable});
  }

  // attach drag & drop methods to $scope for access via angular.element(this).scope()

  // TODO: recognize correct/incorrect
  // TODO: allow continue when appropriate

  $scope.drag = function (event) {
    console.log("drag()", event);
    event.dataTransfer.setData("text", event.target.id);
  }

  $scope.drop = function(event) {
    console.log("drop()", event);
    // drop the word
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }

  $scope.allowDrop = function (event) {
    console.log("allowDrop()");
    if ((event.target.classList.contains("word-drop") && event.target.children.length == 0)
        || event.target.id === "word-corral") {
      event.preventDefault();
    }
  }
}

}());

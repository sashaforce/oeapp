(function() {
  'use strict';

angular.module('OeApp').component('wordToPictureComponent', {
  templateUrl: 'src/templates/word-to-picture.template.html',
  controller: 'WordToPictureController as ctrl',
  bindings: {
    exercise: '<'
  }
}).controller('WordToPictureController', WordToPictureController);

WordToPictureController.$inject = ['$scope'];
function WordToPictureController ($scope) {

  var ctrl = this;

  // continue should be disabled until we expressly enable it
  $scope.$emit("lesson:enableContinue", false);

  ctrl.enableContinue = function (enable) {
    console.log("enableContinue()", enable);
    $scope.$emit("lesson:enableContinue", {okToContine:enable});
  }
}

}());

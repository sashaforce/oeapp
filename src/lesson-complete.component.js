(function() {
  'use strict';

angular.module('OeApp').component('lessonCompleteComponent', {
  templateUrl: "src/templates/lesson-complete.template.html",
  controller: "LessonCompleteController as ctrl"
}).controller('LessonCompleteController', LessonCompleteController);

LessonCompleteController.$inject=['$state'];
function LessonCompleteController($state) {
  var ctrl = this;

  ctrl.done = function () {
    $state.go("home");
  }
}

}());

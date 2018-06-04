(function() {
  'use strict';

angular.module("OeApp").controller("LessonController", LessonController);

LessonController.$inject = ['lessonData'];
function LessonController(lessonData) {
  var ctrl = this;

  ctrl.id = lessonData.id;
  ctrl.name = lessonData.name;
}

}());

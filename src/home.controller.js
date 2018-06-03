(function() {
  'use strict';

angular.module('OeApp').controller('HomeController', HomeController);

HomeController.$inject=['LessonDataService', 'lessonArray'];
function HomeController(LessonDataService, lessonArray){
  var ctrl = this;

  console.log("lessonArray: ", lessonArray);
  ctrl.lessons = lessonArray;
};

}());

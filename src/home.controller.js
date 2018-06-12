(function() {
  'use strict';

angular.module('OeApp').controller('HomeController', HomeController);

HomeController.$inject=['LessonDataService', 'ImageService', 'lessonArray'];
function HomeController(LessonDataService, ImageService, lessonArray){
  var ctrl = this;

  console.log("lessonArray: ", lessonArray);
  for (var i = 0; i < lessonArray.length; i++) {
    // We're changing the lessonArray here, not good form, but not sure how
    // else to do this.
    var lesson = lessonArray[i];
    lesson.imageUrl = ImageService.getUrl(lesson.imageId);
  }
  ctrl.lessons = lessonArray;

};

}());

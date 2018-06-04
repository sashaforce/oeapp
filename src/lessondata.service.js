(function() {
  'use strict';

angular.module('Data').service('LessonDataService', LessonDataService);

LessonDataService.$inject=[];
function LessonDataService(){
  var svc = this;

  var lessons = [];
  lessons.push({
    id: "winter-comes",
    name: "Winter Cume\u00F0",
    imageUrl: "/images/winter-button.png",
    cards: [1, 2, 3]
  });
  lessons.push(      {
    id: "natural-phenomena",
    name:"Natural Phenomena",
    imageUrl: "/images/trees-button.png",
    cards: [4, 5, 6]
  })

  svc.getLessons = function () {

    //console.log("BEGIN svc.getLessons()");
    // var d = $q.defer();
    // d.resolve([{name:"Winter Cumeth"},{name:"Natural Phenomena"}]);
    // console.log("END svc.getLessons()");
    // return d.promise;

    return lessons;
  };

  svc.getLesson = function (id) {
    console.log("Getting lesson for id: ", id);
    console.log("Lessons: ", lessons);
    for (var x=0; x < lessons.length; x++) {
      var lesson = lessons[x];
      console.log("Examining lesson ", lesson.id);
      if (lesson.id === id) {
        console.log("Returning lesson for ", id);
        return lesson;
      }
    }
    console.log("Returning null");
    return null;
  };
};

}());

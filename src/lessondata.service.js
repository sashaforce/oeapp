(function() {
  'use strict';

angular.module('Data').service('LessonDataService', LessonDataService);

LessonDataService.$inject=[];
function LessonDataService(){
  var svc = this;

  svc.getLessons = function () {

    //console.log("BEGIN svc.getLessons()");
    // var d = $q.defer();
    // d.resolve([{name:"Winter Cumeth"},{name:"Natural Phenomena"}]);
    // console.log("END svc.getLessons()");
    // return d.promise;

    return [
      {
        id: 1,
        name: "Winter Cume\u00F0", // TODO how to handle special characters?
        imageUrl: "/images/winter-button.png",
        cards: [1, 2, 3]
      },
      {
        id: 2,
        name:"Natural Phenomena",
        imageUrl: "/images/trees-button.png", // IDEA: if image doesn't exist, svc returns a default
        cards: [4, 5, 6]
      }
    ];
  };
};

}());

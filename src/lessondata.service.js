(function() {
  'use strict';

angular.module('data').service('LessonDataService', LessonDataService);

LessonDataService.$inject=['$q'];
function LessonDataService($q){
  var svc = this;

  svc.getLessons = function () {

    //console.log("BEGIN svc.getLessons()");
    // var d = $q.defer();
    // d.resolve([{name:"Winter Cumeth"},{name:"Natural Phenomena"}]);
    // console.log("END svc.getLessons()");
    // return d.promise;

    return [{name:"Winter Cumeth"},{name:"Natural Phenomena"}];
  };
};

}());

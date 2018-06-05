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
    exercises: ['aesc-example', 'eth-example', 'i-example']
  });
  lessons.push({
    id: "natural-phenomena",
    name:"Natural Phenomena",
    imageUrl: "/images/trees-button.png",
    exercises: ['i-example', 'aesc-example', 'eth-example']
  });

  var exercises = [];
  exercises.push({
    id: "aesc-example",
    type: "PHONEME",
    description: "'\u00E6' is called \u00E6sc ('ash'). It sounds like the 'a' in cat.",
    character: "\u00E6",
    pronunciation: "/\u00E6/",
    sampleWordOE: "\u00E6l",
    sampleWordModE: "eel",
    audioId: "ael",
    imageId: "eel"
  });
  exercises.push({
    id: "eth-example",
    type: "PHONEME",
    description: "'\u00F0' is called 'eth'. It is pronounced like 'th' in Modern English.",
    character: "\u00F0",
    pronunciation: "/\u03B8/ /\u00F0/",
    sampleWordOE: "mo\u00F0or",
    sampleWordModE: "mother",
    audioId: "mothor",
    imageId: "mother"
  });
  exercises.push({
    id: "i-example",
    type: "PHONEME",
    description: "'i' is pronounced 'ee', as in feet.",
    character: "i",
    pronunciation: "/i/",
    sampleWordOE: "lind",
    sampleWordModE: "shield",
    audioId: "lind",
    imageId: "shield"
  });

  svc.getLessons = function () {

    //console.log("BEGIN svc.getLessons()");
    // var d = $q.defer();
    // d.resolve([{name:"Winter Cumeth"},{name:"Natural Phenomena"}]);
    // console.log("END svc.getLessons()");
    // return d.promise;

    return lessons;
  };

  svc.getLesson = function (id) {
    for (var x=0; x < lessons.length; x++) {
      var lesson = lessons[x];
      if (lesson.id === id) {
        return lesson;
      }
    }
    return null;
  };

  svc.getExercise = function (id) { //TODO before writing a third one... generalize
    for (var x=0; x < exercises.length; x++) {
      var exercise = exercises[x];
      if (exercise.id === id) {
        return exercise;
      }
    }
    return null;
  };

}; // LessonDataService

}());

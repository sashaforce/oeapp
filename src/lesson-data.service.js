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
    imageId: "winter-button",
    exercises: ['aesc-example', 'eth-example', 'i-example']
  });
  lessons.push({
    id: "natural-phenomena",
    name:"Natural Phenomena",
    imageId: "trees-button",
    exercises: ['day-night']
  });

  var exercises = [];
  exercises.push({
    id: "aesc-example",
    type: "PHONEME",
    description: "'\u00E6' is called \u00E6sc ('ash'). It sounds like the 'a' in cat.",
    letter: "\u00E6",
    phoneticSymbol: "/\u00E6/",
    sampleWordOE: "\u00E6l",
    sampleWordModE: "eel",
    audioId: "ael",
    imageId: "eel"
  });
  exercises.push({
    id: "eth-example",
    type: "PHONEME",
    description: "'\u00F0' is called 'eth'. It is pronounced like 'th' in Modern English.",
    letter: "\u00F0",
    phoneticSymbol: "/\u03B8/ /\u00F0/",
    sampleWordOE: "mo\u00F0or",
    sampleWordModE: "mother",
    audioId: "mothor",
    imageId: "mother"
  });
  exercises.push({
    id: "i-example",
    type: "PHONEME",
    description: "'i' is pronounced 'ee', as in feet.",
    letter: "i",
    phoneticSymbol: "/i/",
    sampleWordOE: "lind",
    sampleWordModE: "shield",
    audioId: "lind",
    imageId: "shield"
  });
  exercises.push({
    id: "hwaet-record",
    type: "RECORD",
    oeWord: "Hw\u00E6t!",
    modeWord: "Hey!",
    audioId: "hwaet",
  });
  exercises.push({
    id: "day-night",
    type: "WORD-TO-PICTURE",
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

  svc.getExercise = function (id) {
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

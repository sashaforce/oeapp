(function() {
  'use strict';

angular.module('Data').service('LessonDataService', LessonDataService);

LessonDataService.$inject=[];
function LessonDataService(){
  var svc = this;

  var lessons = [];
  lessons.push({
    id: "test",
    name:"TEST",
    imageId: "questionmark-button",
    exercises: ['missing-word-example', 'translate-winter', 'day-night', 'i-example', 'aesc-example']
  });
  lessons.push({
    id: "winter-comes",
    name: "Winter Cume\u00F0",
    imageId: "winter-button",
    exercises: ['aesc-example', 'hwaet-record', 'i-example', 'translate-winter']
  });
  lessons.push({
    id: "natural-phenomena",
    name:"Natural Phenomena",
    imageId: "trees-button",
    exercises: ['day-night', 'raven-eel-dog']
  });

  var exercises = [];

  exercises.push({
    id: 'missing-word-example',
    type: 'MISSING-WORD',
    part1: "The quick brown",
    part2: "jumped over the lazy dogs.",
    words: ['cat', 'fox', 'mouse'],
    answer: "fox",
    messageWrong: "Hint: not a game of cat & mouse"
  });

  exercises.push({
    id: 'translate-winter',
    type: 'TRANSLATE-WORDS',
    sourceLanguage: "Modern English",
    targetLanguage: "Old English",
    phrase: "Hey! Winter is coming.",
    words: ["Hwaet!", "Winter", "cume\u00F0", "ist", "Hark!"],
    answer: "Hwaet! Winter cume\u00F0",
    audioId: "winter-comes"
  });
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
  // exercises.push({
  //   id: "eth-example",
  //   type: "PHONEME",
  //   description: "'\u00F0' is called 'eth'. It is pronounced like 'th' in Modern English.",
  //   letter: "\u00F0",
  //   phoneticSymbol: "/\u03B8/ /\u00F0/",
  //   sampleWordOE: "mo\u00F0or",
  //   sampleWordModE: "mother",
  //   audioId: "mothor",
  //   imageId: "mother"
  // });
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
    questions: [{
      imageId: 'day',
      answer: 'd\u00E6g'
    },{
      imageId: 'night',
      answer: 'niht'
    }],
    messageWrong: "Hint: The Old English word for 'night' is 'niht'."
  });
  exercises.push({
    id: "raven-eel-dog",
    type: "WORD-TO-PICTURE",
    questions: [{
      imageId: 'raven',
      answer: 'hr\u00E6fn'
    },{
      imageId: 'eel',
      answer: '\u00E6l'
    },{
      imageId: 'dog',
      answer: 'hund'
    }]
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
    console.log("getExercise()", id);
    for (var x=0; x < exercises.length; x++) {
      var exercise = exercises[x];
      if (exercise.id === id) {
        return exercise;
      }
    }
    return null;
  };

  svc.getExercisesForLesson = function (id) {
    console.log("getExercisesForLesson()", id);
    var lesson = svc.getLesson(id);
    var exercises = [];
    for (var x=0; x < lesson.exercises.length; x++) {
      var exerciseId = lesson.exercises[x];
      exercises.push(svc.getExercise(exerciseId));
    }
    console.log("return exercises", exercises);
    return exercises;
  }

  svc.isInfoOnly = function (exerciseType) {
    return (exerciseType === "PHONEME");
  }

}; // LessonDataService

}());

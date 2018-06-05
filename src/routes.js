(function() {
  'use strict';

angular.module('OeApp').config(RoutesConfig);

RoutesConfig.$inject=['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html',
    controller: 'HomeController as ctrl',
    resolve: {
      lessonArray:['LessonDataService', function(LessonDataService){
        return LessonDataService.getLessons();
      }]
    }
  })
  .state('lesson', {
    url: '/lesson/{lessonId}',
    templateUrl: '/src/templates/lesson.template.html',
    controller: 'LessonController as ctrl',
    abstract: true,
    // redirectTo: (trans) => {
    //   // getAsync tells the resolve to load
    //   let resolvePromise = trans.injector().getAsync('lessonData');
    //   console.log("resolvePromise:", resolvePromise);
    //   let exerciseId = resolvePromise.then(resolveData => resolveData.exercises[0]);
    //   console.log("exerciseId:", exerciseId);
    //   let lessonId = resolvePromise.then(resolveData => resolveData.id);
    //   console.log("lessonId:", lessonId);
    //   return {
    //     state: 'lesson.exercise',
    //     params: {
    //       lessonId: lessonId,
    //       exerciseId: exerciseId
    //     }
    //   }
    // },
    // redirectTo: (trans) => {
    //   console.log("trans.params():", trans.params());
    //   return {
    //     state: 'lesson.exercise',
    //     params: {
    //       exerciseId:'aesc-example',
    //       lessonId:'winter-comes'
    //     }
    //   }
    // },
    resolve: {
      lessonData: ['$stateParams', 'LessonDataService',
        function($stateParams, LessonDataService) {
          return LessonDataService.getLesson($stateParams.lessonId);
        }
      ]
    }
  })
  .state('lesson.exercise', {
    url: '/exercise/{exerciseId}',
    templateUrl: '/src/templates/exercise.template.html',
    controller: 'ExerciseController as ctrl',
    resolve: {
      exerciseData: ['$stateParams', 'LessonDataService',
        function($stateParams, LessonDataService){
          return LessonDataService.getExercise($stateParams.exerciseId);
        }]
    }
  })
  .state('lesson.complete', {
    url: '/complete',
    component: 'lessonCompleteComponent'
  });

  $urlRouterProvider.otherwise('/');

}

}());

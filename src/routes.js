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
  // TODO: Consider pre-fetching all the exercise data as well, if we can't get the whole lesson, we shouldn't transition to the lesson state
  .state('lesson', {
    url: '/lesson/{lessonId}',
    templateUrl: 'src/templates/lesson.template.html',
    controller: 'LessonController as ctrl',
    // abstract: true,
    resolve: {
      lessonData: ['$stateParams', 'LessonDataService',
        function($stateParams, LessonDataService) {
          return LessonDataService.getLesson($stateParams.lessonId);
        }
      ],
      exercises: ['$stateParams', 'LessonDataService',
        function($stateParams, LessonDataService) {
          return LessonDataService.getExercisesForLesson($stateParams.lessonId);
        }
      ]
    }
  })
  // .state('lesson.exercise', {
  //   url: '/exercise/{exerciseId}',
  //   //templateUrl: 'src/templates/exercise.template.html',
  //   component: 'exerciseComponent',
  //   resolve: {
  //     exerciseData: ['$stateParams', 'LessonDataService',
  //       function($stateParams, LessonDataService){
  //         return LessonDataService.getExercise($stateParams.exerciseId);
  //       }]
  //   }
  // })
  .state('lessonComplete', {
    url: '/complete',
    component: 'lessonCompleteComponent'
  });

  $urlRouterProvider.otherwise('/');

}

}());

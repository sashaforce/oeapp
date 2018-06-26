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
    templateUrl: 'src/templates/lesson.template.html',
    controller: 'LessonController as ctrl',
    // abstract: true,
    resolve: {
      exercises: ['$stateParams', 'LessonDataService',
        function($stateParams, LessonDataService) {
          return LessonDataService.getExercisesForLesson($stateParams.lessonId);
        }
      ]
    }
  })
  .state('lessonComplete', {
    url: '/complete',
    component: 'lessonCompleteComponent'
  });

  $urlRouterProvider.otherwise('/');

}

}());

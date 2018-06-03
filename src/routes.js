(function() {
  'use strict';

angular.module('OeApp').config(RoutesConfig);

RoutesConfig.$inject=['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.html',
    controller: 'HomeController as ctrl',
    resolve: {
      lessonArray:['LessonDataService', function(LessonDataService){
        return LessonDataService.getLessons();
      }]
    }
  });

  $urlRouterProvider.otherwise('/');
}

}());

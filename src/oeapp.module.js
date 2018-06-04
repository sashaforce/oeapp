(function() {
  'use strict';

angular.module('OeApp', ['ui.router', 'Data'])
.run(function($trace) {
  $trace.enable('TRANSITION');
});

}());

(function() {
  'use strict';

  angular.module('OeApp').component('phonemeComponent', {
    templateUrl: '/src/templates/phoneme.template.html',
    bindings: {
      exercise: '<'
    }
  })
}());

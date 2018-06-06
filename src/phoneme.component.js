(function() {
  'use strict';

  angular.module('OeApp').component('phonemeComponent', {
    templateUrl: '/src/templates/phoneme.template.html',
    controller: 'PhonemeController as ctrl',
    bindings: {
      exercise: '<'
    }
  })
}());

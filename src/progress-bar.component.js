(function() {
  'use strict';

  angular.module('OeApp').component('progressBarComponent', {
    templateUrl: 'src/templates/progress-bar.template.html',
    controller: 'ProgressBar as ctrl',
    bindings: {
      totalExercises: '<', // TODO: attribute binding? Won't change...
      currentExercise: '<'
    }
  }).controller('ProgressBar', ProgressBar);

  ProgressBar.$inject=['$scope'];
  function ProgressBar($scope) {
    var ctrl = this;
    console.log(ctrl);

    setBarWidth();

    function setBarWidth() {
      var percentProgress = Math.floor(ctrl.currentExercise/ctrl.totalExercises*100);
      ctrl.barWidth = percentProgress + "%";
    }

    ctrl.$onChanges = function (changesObj) {
      console.log(changesObj);
      // if ("currentExercise" in changesObj) {
      // As long as the only possible incoming changes are total & current exercise, we will always want to update this
      setBarWidth();
      // }
    }
  }

}());

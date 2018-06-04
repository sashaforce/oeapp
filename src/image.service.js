(function() {
  'use strict';

angular.module('Data').service('ImageService');

ImageService.$inject = [];
function ImageService(){
  var svc = this;

  // TODO If needed, have an array for special cases. Otherwise
  // TODO URL = "/images/<id>.png" or "/images/<id>-disabled.png";

  svc.getUrl = function (id, enabled) {
     if (enabled === undefined) {
       enabled = true;
     }
     if (enabled) {
       return `/images/${id}.png`;
     } else {
       return `/images/${id}-disabled.png`;
     }
  }
}

}());

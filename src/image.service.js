(function() {
  'use strict';

angular.module('Data').service('ImageService', ImageService);

ImageService.$inject = [];
function ImageService(){
  var svc = this;

  // Array for special cases. Otherwise URL = "/images/<id>.png" or "/images/<id>-disabled.png";
  // TODO: move to db
  var imageArray = [];
  imageArray.push({
    id: 'speaker-button-sm',
    url: '/images/speaker-button-sm.gif'
  });

  svc.getUrl = function (id, enabled) {

    console.log("ImageService.getUrl for id:", id);
    //set defaults
     if (enabled === undefined) {
       enabled = true;
     }

     // check exceptions list
     for (var i=0; i < imageArray.length; i++) {
       var image = imageArray[i];
       if (image.id === id) {
         return image.url;
       }
     }

     // apply enabled/disabled flag
     if (enabled) {
       return `/images/${id}.png`;
     } else {
       return `/images/${id}-disabled.png`;
     }
  }
}

}());

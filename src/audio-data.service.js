(function() {
  'use strict';

angular.module('Data').service('AudioDataService', AudioDataService);

AudioDataService.$inject = [];
function AudioDataService(){
  var svc = this;

  // Array for special cases. Otherwise URL = "/audio/<id>.mp3"
  // TODO: move to db
  var fileArray = [];

  svc.getUrl = function (id) {

    console.log("AudioDataService.getUrl for id:", id);

     // check exceptions list
     for (var i=0; i < fileArray.length; i++) {
       var f = fileArray[i];
       if (f.id === id) {
         return f.url;
       }
     }

    return `audio/${id}.mp3`;
  }
}

}());

import './general';

window.addEventListener('WebComponentsReady', function(e) {
  // imports are loaded and elements have been registered
  console.log('Components are ready');
});

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    console.log(startPos.coords.latitude);
    console.log(startPos.coords.longitude);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

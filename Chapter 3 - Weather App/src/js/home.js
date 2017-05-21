import './general';

window.addEventListener('WebComponentsReady', function(e) {
  // imports are loaded and elements have been registered
  console.log('Components are ready');
});

window.onload = function() {
  getLocation();
};

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  console.log(position.coords.latitude, position.coords.longitude);
}
function errorPosition(error) {
  console.log(error, 'unable to get position');
}

var skycons = new Skycons({"color": "black"});

skycons.add("coverIcon", Skycons.CLEAR_DAY);

skycons.add("dayIcon", Skycons.CLEAR_DAY);

skycons.play();

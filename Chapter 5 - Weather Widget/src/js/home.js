import './general';

import Weather from './CustomElements/weather';

window.addEventListener('WebComponentsReady', function(e) {
  window.customElements.define('x-weather', Weather);
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

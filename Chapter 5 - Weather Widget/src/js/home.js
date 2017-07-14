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
      console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const $weather = `<x-weather lat="${latitude}" long="${longitude}"><x-weather>`;

  const $largeContainer = document.querySelector('.large-container');
  const $mediumContainer = document.querySelector('.medium-container');
  const $smallContainer = document.querySelector('.small-container');

  $largeContainer.innerHTML($weather);
  $mediumContainer.innerHTML($weather);
  $smallContainer.innerHTML($weather);
}

function errorPosition(error) {
  console.log(error, 'unable to get location');
}

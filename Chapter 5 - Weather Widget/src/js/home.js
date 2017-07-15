import './general';

import Weather from './CustomElements/weather';

window.addEventListener('WebComponentsReady', () => {
  window.customElements.define('x-weather', Weather);
});

window.onload = () => {
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

  const createWeatherElement = className => {
    const $latitude = document.createAttribute('lat');
    $latitude.value = latitude;
    const $longitude = document.createAttribute('long');
    $longitude.value = longitude;
    const $class = document.createAttribute('class');
    $class.value = className;

    const $weather = document.createElement('x-weather');
    $weather.setAttributeNode($latitude);
    $weather.setAttributeNode($longitude);

    return $weather;
  };

  const $largeContainer = document.querySelector('.large-container');
  const $mediumContainer = document.querySelector('.medium-container');
  const $smallContainer = document.querySelector('.small-container');

  $largeContainer.appendChild(createWeatherElement('large'));
  $mediumContainer.appendChild(createWeatherElement('medium'));
  $smallContainer.appendChild(createWeatherElement('small'));
}

function errorPosition(error) {
  console.log(error, 'unable to get location');
}

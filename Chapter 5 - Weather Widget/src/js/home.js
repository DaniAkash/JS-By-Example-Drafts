import './general';

import Weather from './CustomElements/weather';

window.addEventListener('WebComponentsReady', function(e) {
  window.customElements.define('x-weather', Weather);
});

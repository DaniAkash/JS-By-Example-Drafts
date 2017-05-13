import './general';
import ImageCard from './CustomElements/ImageCard';

// Feature detect
// if (!(window.customElements && document.body.attachShadow)) {
//   document.querySelector('fancy-tabs').innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements v1.</b>";
// }
// let selected_ = null;

// See https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel

window.addEventListener('WebComponentsReady', function() {
  window.customElements.define('x-imagecard', ImageCard);
});

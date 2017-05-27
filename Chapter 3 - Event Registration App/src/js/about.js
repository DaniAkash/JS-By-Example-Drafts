import './general';

let marker;

export function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 59.325, lng: 18.070}
  });

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 59.327, lng: 18.067}
  });

  marker.addListener('click', () => {
    infowindow.open(map,marker);
  });

  const infowindow = new google.maps.InfoWindow({
      content: "<h3>Event Location</h3><p>Event Address with all the contact details</p>"
  });

  infowindow.open(map,marker);
}

window.addEventListener("load", () => {
  const $script = document.createElement('script');
  $script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&callback=bundle.initMap`;
  document.querySelector('body').appendChild($script);
});

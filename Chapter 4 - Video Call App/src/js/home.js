import './general';
// import './lib/simplewebrtc-latest-v2';

class Home {

}

let webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: '',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: true,
    detectSpeakingEvents: true,
    autoAdjustMic: false
});

let roomName;
let $createRoomButton = document.querySelector('#createRoom');
let $roomNameInput = document.querySelector('#roomName');
$createRoomButton.onclick = () => {
  roomName = $roomNameInput.value.toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
  if(roomName) {
    webrtc.createRoom(roomName, (err, name) => {
      if(!err) {
        let newUrl = location.pathname + '?' + roomName;
        history.replaceState({foo: 'bar'}, null, newUrl);
      }
    });
  }
};

webrtc.on('readyToCall', function () {
    const room = location.search && location.search.split('?')[1];
    // you can name it anything
    console.warn(room);
    if (room) webrtc.joinRoom(room);
});

webrtc.on('videoAdded', ($video, peer) => {
  const $remotes = document.querySelector('.remote-videos');

  const $container = document.createElement('div');
  $container.className = 'remote-video';
  $container.id = 'container_' + webrtc.getDomId(peer);
  $container.appendChild($video);

  $video.className = 'remote-video-player';
  // resize the video on click
  $video.onclick = function () {
      console.warn('clicked video', webrtc.getDomId(peer));
      $container.style.width = $video.videoWidth + 'px';
      $container.style.height = $video.videoHeight + 'px';
  };

  // show the remote volume
  const $vol = document.createElement('meter');
  $vol.id = 'volume_' + peer.id;
  $vol.className = 'volume';
  $vol.min = -45;
  $vol.max = -20;
  $vol.low = -40;
  $vol.high = -25;
  $container.appendChild($vol);

  $remotes.appendChild($container);
});

const $buttonArea = document.querySelector('.room-text');
const $copy = document.querySelector('.copy');
const $copied = document.querySelector('.copied');

$buttonArea.addEventListener('mouseenter', () => {
  $copy.classList.remove('hidden');
});

$copy.addEventListener('click', () => {
  $copy.classList.add('hidden');
  $copied.classList.remove('hidden');
});

$copied.addEventListener('click', () => {
  $copied.classList.remove('hidden');
});

$buttonArea.addEventListener('mouseout', (event) => {
  var e = event.toElement || event.relatedTarget;
  if(e) {
    if (e.parentNode == $buttonArea || e == $buttonArea) {
      return;
    }
  }
  $copy.classList.add('hidden');
  $copied.classList.add('hidden');
});

function showVolume(el, volume) {
    if (!el) return;
    if (volume < -45) volume = -45; // -45 to -20 is
    if (volume > -20) volume = -20; // a good range
    el.value = volume;
}

// local volume has changed
webrtc.on('volumeChange', function (volume, treshold) {
    showVolume(document.getElementById('localVolume'), volume);
});
// remote volume has changed
webrtc.on('remoteVolumeChange', function (peer, volume) {
    showVolume(document.getElementById('volume_' + peer.id), volume);
});

import './general';

import SimpleWebRTC from 'simplewebrtc/out/simplewebrtc-with-adapter.bundle.js';

const webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: '',
  // immediately ask for camera access
  autoRequestMedia: true,
  debug: false,
  detectSpeakingEvents: true,
  autoAdjustMic: false
});


class Home {

  set room(room) {
    webrtc.joinRoom(room);
    this.roomName = room;
    this.roomCreated(room);
  }

  get room() {
    return this.roomName;
  }

  constructor() {
    this.roomName = '';

    this.$createRoomSection = document.querySelector('#createRoomSection');
    this.$createRoomButton = document.querySelector('#createRoom');
    this.$roomNameInput = document.querySelector('#roomNameInput');

    this.$infoSection = document.querySelector('#infoSection');
    this.$roomName = document.querySelector('#roomNameText');
    this.$roomUrl = document.querySelector('#roomUrl');
    this.$buttonArea = document.querySelector('.room-text');
    this.$copy = document.querySelector('.copy');
    this.$copied = document.querySelector('.copied');

    this.$remotes = document.querySelector('.video-area');
    this.$localVideo = document.querySelector('#localVideo');

    this.addEventListeners();
    this.registerClicks();
  }

  addEventListeners() {

    this.$buttonArea.addEventListener('mouseenter', () => {
      this.$copy.classList.remove('hidden');
    });

    this.$buttonArea.addEventListener('mouseout', (event) => {
      var e = event.toElement || event.relatedTarget;
      if(e) {
        if (e.parentNode == this.$buttonArea || e == this.$buttonArea) {
          return;
        }
      }
      this.$copy.classList.add('hidden');
      this.$copied.classList.add('hidden');
    });

    this.$copy.addEventListener('click', () => {
      this.$copy.classList.add('hidden');
      this.$copied.classList.remove('hidden');
    });

    this.$copied.addEventListener('click', () => {
      this.$copied.classList.remove('hidden');
    });

    this.$localVideo.onclick = () => {
      this.clearSelected();
      this.$localVideo.parentElement.classList.add('container-selected');
      this.$localVideo.classList.add('video-selected');
    };

  }

  registerClicks() {

    /**
     * Create Room
     */
    this.$createRoomButton.onclick = () => {
      this.roomName = this.$roomNameInput.value.toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
      if(this.roomName) {
        webrtc.createRoom(this.roomName, (err, name) => {
          if(!err) {
            console.error(this.$infoSection, this.$createRoomSection);
            const newUrl = location.pathname + '?' + name;
            history.replaceState({}, null, newUrl);
            this.roomCreated(name);
          }
        });
      }
    };

    /**
     * Copy Room URL
     */
    this.$copy.onclick = () => {
      copyUrl();
    };

    this.$copied.onclick = () => {
      copyUrl();
    };

    const copyUrl = () => {
      var range = document.createRange();
      range.selectNode(this.$roomUrl);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch(err) {
        console.error(err);
      }
      window.getSelection().removeAllRanges();
    };

  }

  roomCreated(room) {
    this.$infoSection.classList.remove('hidden');
    this.$createRoomSection.classList.add('hidden');
    this.$roomName.textContent = `Room Name: ${room}`;
    this.$roomUrl.textContent = window.location.href;
  }

  clearSelected() {
    let $selectedVideo = document.querySelector('.video-selected');
    if($selectedVideo) {
      $selectedVideo.classList.remove('video-selected');
      $selectedVideo.parentElement.classList.remove('container-selected');
    }
  }

  addRemoteVideo($video, peer) {
    const $container = document.createElement('div');
    $container.className = 'video-container';
    $container.id = 'container_' + webrtc.getDomId(peer);
    $container.appendChild($video);

    $video.className = 'video-player';

    $video.onclick = () => {
      // console.warn('clicked video', webrtc.getDomId(peer));
      this.clearSelected();
      $container.classList.add('container-selected');
      $video.classList.add('video-selected');
      // console.log($container);
      // $container.style.width = $video.videoWidth + 'px';
      // $container.style.height = $video.videoHeight + 'px';
    };

    this.$remotes.appendChild($container);
  }

  removeRemoteVideo($video, peer) {
    const $removedVideo = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'no-video-found');
    if ($removedVideo) {
      this.$remotes.removeChild($removedVideo);
    }
  }

}

const home = new Home();

webrtc.on('readyToCall', () => {
  const room = location.search && location.search.split('?')[1];
  if (room) home.room = room;
});

webrtc.on('videoAdded', ($video, peer) => home.addRemoteVideo($video, peer));

webrtc.on('videoRemoved', ($video, peer) => home.removeRemoteVideo($video, peer));

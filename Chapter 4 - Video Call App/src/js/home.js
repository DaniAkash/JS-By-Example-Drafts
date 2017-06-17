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

$('form').submit(function () {
    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
    webrtc.createRoom(val, function (err, name) {
        console.log(' create room cb', arguments);

        var newUrl = location.pathname + '?' + name;
        if (!err) {
            history.replaceState({}, null, newUrl);
            setRoom(name);
        } else {
            console.log(err);
        }
    });
    return false;
});

let roomName;
let $createRoomButton = document.querySelector('#createRoom');
let $roomNameInput = document.querySelector('#roomName');
$createRoomButton.onclick = () => {
  roomName = $roomNameInput.value.toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
  if(roomName) {
    let newUrl = location.pathname + '?' + roomName;
    history.replaceState({foo: 'bar'}, null, newUrl);
    webrtc.createRoom(roomName, function (err, name) {

    });
  }

};

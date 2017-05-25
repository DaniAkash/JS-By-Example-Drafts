const timeoutDuration = 5000;

export default function apiCall(latLong) {

  let request = new Promise((resolve, reject) => {

    let header = new Headers({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin':'*'
      // 'Content-Type': 'multipart/form-data'
    });

    let sentData={
        method: 'GET',
        mode: 'cors',
        'Access-Control-Allow-Origin':'*',
        // header: header,
        // body:opt.body || ''
    };

    fetch(`https://api.darksky.net/forecast/${API_KEY}/${latLong}`, sentData)
      .then(res => res.text())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

  let timeout = new Promise((request, reject) => {
    setTimeout(reject, timeoutDuration, `Request timed out!`);
  });

  return Promise
    .race([request, timeout])
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => err);

};

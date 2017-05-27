const timeoutDuration = 5000;

export default function apiCall(route, body = {}, method='POST') {
  const request = new Promise((resolve, reject) => {

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const requestDetails = {
      method,
      mode: 'cors',
      headers,
    };

    if(method !== 'GET') requestDetails.body = JSON.stringify(body);

    function handleErrors(response) {
      if(response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }

    fetch(`${SERVER_URL}/${route}`, requestDetails)
      .then(handleErrors)
      .then(data => resolve(data))
      .catch(err => reject(err));
    // fetch('http://localhost:3000/statistics', {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers,
    //   // body: JSON.stringify(body)
    // }).then(res=>res.json()).then(res => console.log(res))

  });

  const timeout = new Promise((request, reject) => {
    setTimeout(reject, timeoutDuration, `Request timed out!`);
  });

  return new Promise((resolve, reject) => {
    Promise.race([request, timeout])
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}

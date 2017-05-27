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
      body: JSON.stringify(body),
    };

    fetch(`${SERVER_URL}/${route}`, requestDetails)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

  const timeout = new Promise((request, reject) => {
    setTimeout(reject, timeoutDuration, {error: `Request timed out!`});
  });

  return new Promise((resolve, reject) => {
    Promise.race([request, timeout])
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}

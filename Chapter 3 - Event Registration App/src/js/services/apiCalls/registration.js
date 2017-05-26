const timeoutDuration = 5000;

export default function registration(formData) {
  const request = new Promise((resolve, reject) => {

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const requestDetails = {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(formData),
    };

    fetch(`${SERVER_URL}/registration`, requestDetails)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
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

const tokenApi = process.ENV === 'production' ? 'fixme' : 'http://localhost:4000/token';

export const postTokenApi = payload =>
  fetch(tokenApi, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Length': payload.length,
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

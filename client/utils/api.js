export const api = {
  fetch(url, params) {
    return fetch(url, { credentials: 'same-origin', ...params })
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) return json;
        else {
          return json.then(Promise.reject.bind(Promise));
        }
      });
  }
}
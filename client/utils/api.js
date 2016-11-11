export const api = {
  fetch(url, params) {
    return fetch(url, { credentials: 'same-origin', ...params }).then(response => response.json());
  }
}
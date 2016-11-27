import store from 'store';
import { AUTH_TOKEN_HEADER } from '../constants/api';

export const api = {
  fetch(url, params) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      [AUTH_TOKEN_HEADER]: store.get(AUTH_TOKEN_HEADER) || 'anonymous',
      ...params.headers,
    };

    const body = params.body ? JSON.stringify(params.body) : undefined;

    return fetch(url, { credentials: 'same-origin', ...params, headers, body })
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) return json;
        else {
          return json.then(Promise.reject.bind(Promise));
        }
      });
  }
};

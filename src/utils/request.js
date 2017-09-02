import { HOME_URL } from '../config';

function parseJSON(response) {
  return Promise.all([response, response.json()])
}

function fetchHtml(response) {
  return Promise.all([response, response.text()])
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function get(url, headers = {}) {
  if (!url.startsWith('https')) url = HOME_URL + url;
  const options = {
    method: 'GET',
    headers: headers
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function post(url, body) {
  if (!url.startsWith('https')) url = HOME_URL + url;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function requestHtml(url, headers = {}) {
  const options = {
    method: 'GET',
    headers: headers
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(fetchHtml)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

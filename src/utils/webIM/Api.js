// our "constructor"
const create = (baseURL = '') => {

  function parseJSON(response) {
    return Promise.all([response, response.json()])
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
  function post(url, body) {
    url = baseURL + url;
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

  return {
    register: (body) => post('/users', body),
    login: (body) => post('/token', body),
  }
}

// let's return back our create method as the default.
export default {
  create
}

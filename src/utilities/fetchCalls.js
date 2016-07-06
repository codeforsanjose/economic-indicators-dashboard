import fetch from 'isomorphic-fetch'

export const fetchJSONData = (url, successCallback, errorCallback) => {
  fetch(url, {
    method: 'get'
  })
  .then((res) => res.json())
  .then((data) => {
    successCallback(data)
  })
  .catch((err) => {
    if (!errorCallback) {
      console.log(err)
    } else {
      errorCallback(err)
    }
  })
}

export const fetchTextData = (url, successCallback, errorCallback) => {
  fetch(url, {
    method: 'get'
  })
  .then((res) => res.text())
  .then((data) => {
    successCallback(data)
  })
  .catch((err) => {
    if (!errorCallback) {
      console.log(err)
    } else {
      errorCallback(err)
    }
  })
}

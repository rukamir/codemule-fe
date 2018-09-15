import axios from 'axios';

const HOME_SERVER = process.env.VUE_APP_HOME_SERVER;

const instance = axios.create({
  baseURL: HOME_SERVER,
  timeout: 2000,
});
var authToken = '';
var idToken = '';

export default {
  instance,
  setAuthorizationHeader(jwt) {
    authToken = jwt;
  },
  setIdHeader(jwt) {
    idToken = jwt;
  },
  get(uri) {
    return instance.get(
      uri,
      {
        headers: {
          Authorization: authToken,
          identity: idToken,
        },
      },
    );
  },
  put(uri, body) {
    return instance.put(
      uri,
      body,
      {
        headers: {
          Authorization: authToken,
          identity: idToken,
        },
      },
    );
  },
};

import axios from 'axios';

const HOME_SERVER = process.env.VUE_APP_HOME_SERVER;

let instance = axios.create({
  baseURL: HOME_SERVER,
  timeout: 2000,
});
var authToken = "";

export default {
  instance,
  setAuthorizationHeader(jwt) {
    authToken = jwt;
  },
  get(uri) {
    // console.log(`token ${authToken} uri ${uri}`);
    // console.log(instance.defaults);
    return instance.get(uri, { headers: { Authorization: authToken } });
  },
  put(uri, body) {
    // console.log(`token ${authToken} uri ${uri}`);
    // console.log(instance.defaults);
    return instance.put(uri, body, { headers: { Authorization: authToken } });
  },
};

import axios from 'axios';

const HOME_SERVER = process.env.VUE_APP_HOME_SERVER;

let instance = axios.create({
  baseURL: HOME_SERVER,
  timeout: 2000,
});

export default {
  instance,
};

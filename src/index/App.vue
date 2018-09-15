<template>
  <div id="app">
    <h1>Index pages</h1> 
    <Login :getAuth=getAuth v-bind:loggedIn=isLoggedIn></Login>
  </div>
</template>

<script>
import Login from './components/Login';
import 'element-ui/lib/theme-chalk/display.css';

const ENDPOINT = process.env.VUE_APP_ENDPOINT;

export default {
  name: 'app',
  components: {
    Login,
  },
  data() {
    return {
      ENDPOINT,
      jwt: '',
    };
  },
  methods: {
    getAuth(auth) {
      this.jwt = auth;
      console.log(JSON.stringify(this.jwt));
      axios.setAuthorizationHeader(this.jwt.accessToken);
      axios.setIdHeader(this.jwt.idToken);
    },
  },
  computed: {
    isLoggedIn() {
      return this.jwt != '';
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

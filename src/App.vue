<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Login :getAuth="getAuth" v-bind:loggedIn=isLoggedIn></Login>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login';

const ENDPOINT = process.env.VUE_APP_ENDPOINT;

export default {
  name: 'app',
  components: {
    HelloWorld,
    Login,
  },
  data() {
    return {
      ENDPOINT,
      jwt: '',
    };
  },
  methods: {
    getAuth(token) {
      this.jwt = token;
    },
  },
  computed: {
    isLoggedIn() {
      return this.jwt != '';
    }
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
  margin-top: 60px;
}
</style>

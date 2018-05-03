<template>
  <div id="app">
    <Nav></Nav>
    <Send :getSelectedItem=getSelectedItem />
    <Login :getAuth=getAuth v-bind:loggedIn=isLoggedIn></Login>
  </div>
</template>

<script>
import Login from './components/Login';
import Nav from './components/Nav';
import Send from './components/send/Send';

const ENDPOINT = process.env.VUE_APP_ENDPOINT;

export default {
  name: 'app',
  components: {
    Login,
    Nav,
    Send,
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
    getSelectedItem(item) {
      console.log(item);
    }
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

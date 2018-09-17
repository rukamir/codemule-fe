<template>
  <div id="app">
    <NavBar :getPage=getPage />
    <Upload v-if="this.activePage == 'upload'" />
    <Send v-if="this.activePage == 'send'" :authtoken="this.jwt" :getSelectedItem=getSelectedItem />
    <Inventory v-if="this.activePage == 'inventory'" :authtoken="this.jwt" />
    <Logout :getAuth=getAuth v-bind:loggedIn=isLoggedIn />
  </div>
</template>

<script>
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import Send from './components/send/Send';
import Inventory from './components/inventory/Inventory';
import Upload from './components/upload/Upload';
import axios from './services/axios';
import 'element-ui/lib/theme-chalk/display.css';

const ENDPOINT = process.env.VUE_APP_ENDPOINT;

export default {
  name: 'app',
  components: {
    Logout,
    NavBar,
    Upload,
    Send,
    Inventory
  },
  data() {
    return {
      ENDPOINT,
      activePage: 'upload',
      jwt: '',
    };
  },
  methods: {
    getAuth(auth) {
      this.jwt = auth;
      axios.setAuthorizationHeader(this.jwt.accessToken);
      axios.setIdHeader(this.jwt.idToken);
    },
    getSelectedItem(item) {
      console.log(item);
    },
    getPage(pageIndex) {
      console.log(`page presssed ${pageIndex}`);
      let pages = [
        "upload",
        "send",
        "mailing",
        "inventory",
        "settings",
        "plans",
        "info"
      ];
      this.activePage = pages[pageIndex];
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
  margin-top: 0px;
}
</style>

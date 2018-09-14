<template>
  <div id="app">
    <h1>Index pages</h1> 
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

const ENDPOINT = process.env.VUE_APP_ENDPOINT;

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      ENDPOINT,
    };
  },
  methods: {
  },
  computed: {
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

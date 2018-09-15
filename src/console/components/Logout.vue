<template>
  <div>
    <el-button @click="signOut">Sign Out</el-button>
  </div>
</template>


<script>
import { CognitoAuth } from 'amazon-cognito-auth-js';
import cognito from '../services/cognito';

const COGNITO_REDIRECT = process.env.VUE_APP_COGNITO_REDIRECT;
const COGNITO_USERPOOL = process.env.VUE_APP_COGNITO_USERPOOL;
const COGNITO_CLIENTID = process.env.VUE_APP_COGNITO_CLIENTID;
const COGNITO_APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;

export default {
  name: "Logout",
  props: [
    'getAuth',
    'loggedIn'
  ],
  data() {
    return {};
  },
  methods: {
    signOut() {
      cognito.signout();
      console.log('signout');
    }
  },
  created() {
    cognito.setSuccessAndFail(
      (result) => {
        console.log('setting auth', result);
        this.getAuth({
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.refreshToken,
        });
      },
      (err) => {
        console.log('this was an error', err);
      })
    cognito.login();
  },
  mounted() {
    console.log('mounted!');
    cognito.cognitoWebResponse();
  },
};
</script>


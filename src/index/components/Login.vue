<template>
  <div>
    <h2>Login froms</h2>
    <el-button v-if=!this.loggedIn type="primary" @click="onSubmit">Sign In</el-button>
    <el-button v-else @click="signOut">Sign Out</el-button>
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
    name: 'Login',
    props: ['getAuth',
            'loggedIn'],
    data() {
      return {
      }
    },
    methods: {
      onSubmit() {
        cognito.login();
        console.log('submit');
      },
      signOut() {
        cognito.signout();
        console.log('signout');
      }
    },
    created() {
      console.log('created')
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
    },
    mounted() {
        console.log('mounted!');
        cognito.cognitoWebResponse();

    },
};
</script>

<style>
</style>
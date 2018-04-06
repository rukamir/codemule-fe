<template>
  <div>
    <h2>Login froms</h2>
    <el-button v-if=!this.loggedIn type="primary" @click="onSubmit">Sign In</el-button>
    <el-button v-else @click="signOut">Sign Out</el-button>
  </div>
</template>

<script>
import { CognitoAuth } from 'amazon-cognito-auth-js';

const COGNITO_REDIRECT = process.env.VUE_APP_COGNITO_REDIRECT;
const COGNITO_USERPOOL = process.env.VUE_APP_COGNITO_USERPOOL;
const COGNITO_CLIENTID = process.env.VUE_APP_COGNITO_CLIENTID;
const COGNITO_APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;

var authData = {
  ClientId : COGNITO_CLIENTID, // Your client id here
  AppWebDomain : COGNITO_APP_DOMAIN,
  TokenScopesArray : ['openid'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
  RedirectUriSignIn : COGNITO_REDIRECT,
  RedirectUriSignOut : COGNITO_REDIRECT,
  // IdentityProvider : '<TODO: add identity provider you want to specify>', // e.g. 'Facebook',
  UserPoolId : COGNITO_USERPOOL, // Your user pool id here
  AdvancedSecurityDataCollectionFlag : false, // e.g. true
};

export default {
    name: 'Login',
    props: ['getAuth',
            'loggedIn'],
    data() {
      // debugger;
      console.log("at data about to make auth");
      var auth = new CognitoAuth(authData);
      auth.userhandler = {
        onSuccess: (result) => {
          console.log(result);
          this.getAuth(result.idToken.jwtToken);
        },
        onFailure: function(err) {
          alert("Error!");
        }
      };
      return {
        auth,
      }
    },
    methods: {
      onSubmit() {
        this.auth.getSession();
        console.log('submit!');
      },
      signOut() {
        this.auth.signOut();
        console.log('signout');
      }
    },
    mounted: function(){
      var curUrl = window.location.href;
      this.auth.parseCognitoWebResponse(curUrl);
    },
};
</script>

<style>
</style>
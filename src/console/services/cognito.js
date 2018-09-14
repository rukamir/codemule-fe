import { CognitoAuth } from 'amazon-cognito-auth-js';
import { CognitoIdentityServiceProvider, CognitoIdentityCredentials } from 'aws-sdk';

const COGNITO_REDIRECT = process.env.VUE_APP_COGNITO_REDIRECT;
const COGNITO_USERPOOL = process.env.VUE_APP_COGNITO_USERPOOL;
const COGNITO_CLIENTID = process.env.VUE_APP_COGNITO_CLIENTID;
const COGNITO_APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;

const authData = {
  ClientId: COGNITO_CLIENTID, // Your client id here
  AppWebDomain: COGNITO_APP_DOMAIN,
  TokenScopesArray: ['openid'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
  RedirectUriSignIn: COGNITO_REDIRECT,
  RedirectUriSignOut: COGNITO_REDIRECT,
  // IdentityProvider: '<TODO: add identity provider you want to specify>', // e.g. 'Facebook',
  UserPoolId: COGNITO_USERPOOL, // Your user pool id here
  AdvancedSecurityDataCollectionFlag: false, // e.g. true
};

export default {
  auth: new CognitoAuth(authData),
  cognitoISP: new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2',
    credentials: new CognitoIdentityCredentials({ IdentityPoolId: COGNITO_USERPOOL }),
  }),

  setSuccessAndFail(success, fail) {
    this.auth.userhandler = {
      onSuccess: success,
      onFailure: fail,
    };
    this.auth.useCodeGrantFlow();
  },

  login() {
    this.auth.getSession();
    console.log('submit!');
  },
  cognitoWebResponse() {
    const curUrl = window.location.href;
    console.log(this.auth.parseCognitoWebResponse(curUrl));
  },
  signout() {
    this.auth.signOut();
    console.log('signout');
  },
  refreshToken(token) {
    console.log(this.cognitoISP);
    this.cognitoISP.initiateAuth(
      {
        AuthFlow: 'REFRESH_TOKEN',
        ClientId: COGNITO_CLIENTID,
        AuthParameters: {
          REFRESH_TOKEN: token,
        },
      },
      (err, data) => {
        console.log('data', data);
        console.log('error', err);
        if (!err) {
          const {
            AccessToken,
            IdToken,
            RefreshToken,
          } = data.AuthenticationResult;

          console.log('refreshed', data.AuthenticationResult);

          return {
            accessToken: AccessToken,
            idToken: IdToken,
            refreshToken: RefreshToken,
          };
        }

        return err;
      },
    );
  },
};

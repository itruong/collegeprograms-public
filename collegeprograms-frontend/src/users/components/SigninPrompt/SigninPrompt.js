/*global authUi, firebaseui, firebase*/

import React from 'react';
import { 
  Grid,
  Paper,
  Typography
} from '@material-ui/core';

class SigninPrompt extends React.Component{
  componentDidMount = () => {
    authUi.start('#firebaseui-auth-container', this.getUiConfig());
  }

  /**
   * @return {!Object} The FirebaseUI config.
   */
  getUiConfig = () => {
    return {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccessWithAuthResult': (authResult, redirectUrl) => {
          if (authResult.user) {
            // this.handleSignedInUser();
          }
          if (authResult.additionalUserInfo) {
            if (authResult.additionalUserInfo.isNewUser) {
              console.log("new user");
            }
          }
        }
      },
      'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
      'signInFlow': 'popup',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      'tosUrl': '<your-tos-url>',
      //Privacy Policy url/callback.
      'privacePolicyUrl': function() {
        window.location.assign('<your-privacy-policy-url>');
      },
    };
  }

  render() {
    return <div id="firebaseui-auth-container"></div>
  }
};

export default SigninPrompt;
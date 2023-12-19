import { Amplify } from 'aws-amplify';
import * as dotenv from 'dotenv';

dotenv.config();

export default function () {

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.user_pool_id,
        userPoolClientId: process.env.user_pool_web_client_id,
        identityPoolId: process.env.identity_pool_id,
        /*signUpVerificationMethod: 'code',
        loginWith: {
          oauth: {
            domain: 'https://amplify-auth-sample.auth.ap-northeast-1.amazoncognito.com',
            scopes: [
              'aws.cognito.signin.user.admin'
            ],
            responseType: 'code'
          }
        }*/
      }
    }
  });
};

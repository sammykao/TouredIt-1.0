import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env., // Your user pool id here
  ClientId: 'YOUR_CLIENT_ID' // Your client id here
};

export default new CognitoUserPool(poolData);
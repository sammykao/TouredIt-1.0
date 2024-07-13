import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID, // Your user pool id here
  ClientId: process.env.REACT_APP_USER_POOL_ID // Your client id here
};

export default new CognitoUserPool(poolData);
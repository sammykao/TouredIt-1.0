import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: ,
    ClientId: import.meta.env.VITE_REACT_APP_CLIENT_ID
}



export default new CognitoUserPool(poolData);
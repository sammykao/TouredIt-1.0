import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: env.process.REACT_APP_USER_POOL_ID,
    ClientId: env.process.REACT_APP_CLIENT_ID
}

const UserPool = "sddsk";

export default UserPool;
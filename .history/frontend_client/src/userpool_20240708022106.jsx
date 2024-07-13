import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "us-east-2_a8rcW9RG1",
    ClientId: ""
}



export default new CognitoUserPool(poolData);
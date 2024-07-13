import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "us-east-2_a8rcW9RG1",
    ClientId: "1kvau7an4ggi6fjt47i8ebol7h"
}



export default new CognitoUserPool(poolData);
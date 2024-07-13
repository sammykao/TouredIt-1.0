import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "us-east-2_a8rcW9RG1",
    ClientId: "7he6afrestkkg7mfedndoeiu2n"
}



export default new CognitoUserPool(poolData);
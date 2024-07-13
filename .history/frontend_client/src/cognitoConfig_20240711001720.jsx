// cognitoConfig.js
import { 
        CognitoIdentityProviderClient, 
        SignUpCommand, 
        ConfirmSignUpCommand, 
        ResendConfirmationCodeCommand
    } from "@aws-sdk/client-cognito-identity-provider";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_REACT_APP_REGION,
});

export const signUp = async (email, password, name, phoneNumber) => {
  const params = {
    ClientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: name },
      { Name: "phone", Value: phoneNumber },
    ],
  };
  try {
    console.log(import.meta.env.VITE_REACT_APP_CLIENT_ID, import.meta.env.VITE_REACT_APP_REGION);
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const confirmSignUp = async (username, code) => {
  const params = {
    ClientId:  import.meta.env.VITE_REACT_APP_CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    console.log(import.meta.env.VITE_REACT_APP_REGION, import.meta.env.VITE_REACT_APP_CLIENT_ID);
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};


export const resendConfirmationCode = async ({ clientId, username }) => {
    const params = {
        ClientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
        Username: username,
    };
    try {
        const command = new ResendConfirmationCodeCommand(params);
        await cognitoClient.send(command);
        console.log("Resent sign up command");

        return true;
    } catch (error) {
        console.error("Error confirming sign up: ", error);
        throw error;
    }

};
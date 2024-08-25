// cognitoConfig.js
import { 
        CognitoIdentityProviderClient, 
        SignUpCommand, 
        ConfirmSignUpCommand,
        InitiateAuthCommand,
        ResendConfirmationCodeCommand,
        DeleteUserCommand,
        GetUserCommand,
        ForgotPasswordCommand,
    } from "@aws-sdk/client-cognito-identity-provider";
import config from "./config.json";
export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signUp = async (email, password, name, phoneNumber) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
    ],
    CustomAttributes: [
      { Name: "name", Value: name },
      { Name: "phone", Value: phoneNumber },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const confirmSignUp = async (username, code) => {
  const params = {
    ClientId:  config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};


export const resendConfirmationCode = async ({ username }) => {
    const params = {
        ClientId: config.clientId,
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

export const signIn = async (username, password) => {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: config.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
    try {
      const command = new InitiateAuthCommand(params);
      const { AuthenticationResult } = await cognitoClient.send(command);
      if (AuthenticationResult) {
        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
        sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
        sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
        sessionStorage.setItem("username", username || '');
        return AuthenticationResult;
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      throw error;
    }
};


export const deleteUser = async () => {
    const accessToken = sessionStorage.accessToken;
    const params = {
        ClientId: config.clientId,
        AccessToken: accessToken,
    };
    try {
        const command = new DeleteUserCommand(params);

        await cognitoClient.send(command);
        console.log("User Deleted");
        return true;
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

export const getUser = async () => {
  const accessToken = sessionStorage.accessToken;
  const params = {
      ClientId: config.clientId,
      AccessToken: accessToken,
  };
  try {
      const command = new GetUserCommand(params);

      const response = await cognitoClient.send(command);
      
      
      return response.UserAttributes;
  } catch (error) {
      console.error("Error Getting User: ", error);
      throw error;
  }

};


export const sendResetCode = async (username) => {
  const params = {
      ClientId: config.clientId,
      Username: username,
  };
  try {
      const command = new ForgotPasswordCommand(params);
      await cognitoClient.send(command);
      console.log("Sent Resend Code");

      return true;
  } catch (error) {
      console.error("Error confirming sign up: ", error);
      throw error;
  }
}

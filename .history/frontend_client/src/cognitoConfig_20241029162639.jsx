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
        ConfirmForgotPasswordCommand
    } from "@aws-sdk/client-cognito-identity-provider";
import CryptoJS from "crypto-js"; // Import CryptoJS for encryption
import config from "./config.json";


export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});
VITE_KEY_ENCRYPT
// Helper functions for encryption and decryption
const encrypt = (text) => CryptoJS.AES.encrypt(text, import.meta.env.VITE_ENCRYPT_KEY).toString();
const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_ENCRYPT_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// SignUp function with encryption
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

// ConfirmSignUp with encryption
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

// ResendConfirmationCode function
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

// SignIn function with encryption for tokens
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
        // Encrypt and store tokens
        localStorage.setItem("idToken", encrypt(AuthenticationResult.IdToken || ''));
        localStorage.setItem("accessToken", encrypt(AuthenticationResult.AccessToken || ''));
        localStorage.setItem("refreshToken", encrypt(AuthenticationResult.RefreshToken || ''));
        localStorage.setItem("username", encrypt(username || ''));
        return AuthenticationResult;
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      throw error;
    }
};

// deleteUser with encrypted access token retrieval
export const deleteUser = async () => {
    const accessToken = decrypt(localStorage.getItem("accessToken"));
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

// getUser with encrypted access token retrieval
export const getUser = async () => {
  const accessToken = decrypt(localStorage.getItem("accessToken"));
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

// sendResetCode function
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
      console.log("Error sending code: ", error);
      throw error;
  }
}

// ChangePassword function
export const ChangePassword = async (username, password, ConfirmationCode) => {
  const params = {
      ClientId: config.clientId,
      Username: username,
      Password: password,
      ConfirmationCode: ConfirmationCode
  };

  try {
      const command = new ConfirmForgotPasswordCommand(params);
      await cognitoClient.send(command);
      console.log("Changed Password");
      return true;
  } catch (error) {
      console.error("Error changing password", error);
      throw error;
  }
}

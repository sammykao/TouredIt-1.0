import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axios from '../utils/axios';
import { PATH_AUTH } from '../routes/paths';
import { cognitoConfig } from '../config';

export const UserPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
});

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};
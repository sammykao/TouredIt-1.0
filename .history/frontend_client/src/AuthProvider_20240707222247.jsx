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

const handlers = {
    AUTHENTICATE: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
        },
        LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    method: 'cognito',
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve()
  });
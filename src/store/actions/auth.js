import * as actionTypes from './actionTypes';
import axios            from 'axios';

const waitAuth = () => {
    return {type: actionTypes.WAIT_AUTH};
};

const authSuccess = (tokenId, userId) => {
    return {
        type:   actionTypes.AUTH_SUCCESS, 
        token:  tokenId,
        userId: userId
    };
};

const authError = (errorMessage) => {
    return {
        type:         actionTypes.AUTH_ERROR, 
        errorMessage: errorMessage
    };
};

const logoutOnTimeout = (tokenExpirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, tokenExpirationTime * 1000);
    }
}

export const logout = () => {
    return {type: actionTypes.LOGOUT, token: null, userId: null};
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(waitAuth());
        let authData = {
            email:             email,
            password:          password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAygoFv_pOHWLG8Hc-sHuvMpPiBNAcD5KU";

        if(!isSignUp)
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAygoFv_pOHWLG8Hc-sHuvMpPiBNAcD5KU";

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(logoutOnTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authError(error.response.data.error.message))
            });
    };
};
import * as actionTypes from './actionTypes';
import axios            from 'axios';

const waitAuth = () => {
    return {type: actionTypes.WAIT_AUTH};
};

const authSuccess = (tokenId, userId) => {
    return {
        type:       actionTypes.AUTH_SUCCESS, 
        token:      tokenId,
        userId:     userId
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
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");

    return {type: actionTypes.LOGOUT};
};

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

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(logoutOnTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authError(error.response.data.error.message))
            });
    };
};

export const setRedirectPath = (path) => {
    return {type: actionTypes.SET_REDIRECT_PATH, path};
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token) 
            dispatch(logout());
        else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(logoutOnTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else 
                dispatch(logout());
        }
    }
}
import * as actionTypes from '../actions/actionTypes';
import {updateObject}     from '../utility';

const initialState = {
    token:        null,
    userId:       null,
    errorMessage: null,
    loading:      false,
    isLoggedIn:   false,
    redirectPath: "/"
}

const waitAuth = state => updateObject(state, {errorMessage: null, loading: true});

const authSuccess = (state, action) => {
    const authSuccessStateUpdates = {
        token:        action.token,
        userId:       action.userId,
        errorMessage: null,
        loading:      false,
        isLoggedIn:   true
    }
    return updateObject(state, authSuccessStateUpdates);
}

const authError = (state, action) => {
    return updateObject(state, {errorMessage: action.errorMessage, loading: false});
}

const logout = (state, action) => {
    const logoutUpdates = {
        token:      null,
        userId:     null,
        isLoggedIn: false
    }
    return updateObject(state, logoutUpdates);
}

const setRedirectPath = (state, action) => {
    return updateObject(state, {redirectPath: action.path});
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.WAIT_AUTH):         return waitAuth(state);
        case(actionTypes.AUTH_SUCCESS):      return authSuccess(state, action);
        case(actionTypes.AUTH_ERROR):        return authError(state, action);    
        case(actionTypes.LOGOUT):            return logout(state, action);
        case(actionTypes.SET_REDIRECT_PATH): return setRedirectPath(state, action);
        default:                             return state;
    }
}

export default authReducer;
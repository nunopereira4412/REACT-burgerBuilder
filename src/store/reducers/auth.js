import * as actionTypes from '../actions/actionTypes';
import {updateObject}     from '../utility';

const initialState = {
    token:        null,
    userId:       null,
    errorMessage: null,
    loading:      false
}

const waitAuth = state => updateObject(state, {errorMessage: null, loading: true});

const authSuccess = (state, action) => {
    const authSuccessStateUpdates = {
        token: action.token,
        userId: action.userId,
        errorMessage: null,
        loading: false
    }
    return updateObject(state, authSuccessStateUpdates);
}

const authError = (state, action) => {
    return updateObject(state, {errorMessage: action.errorMessage, loading: false});
}

const logout = (state, action) => {
    const logoutUpdates = {
        token: action.token,
        userId: action.userId
    }
    return updateObject(state, logoutUpdates);
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.WAIT_AUTH):    return waitAuth(state);
        case(actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
        case(actionTypes.AUTH_ERROR):   return authError(state, action);    
        case(actionTypes.LOGOUT):       return logout(state, action);
        default:                        return state;
    }
}

export default authReducer;
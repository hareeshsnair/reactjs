import { authConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch( action.type ) {
        case authConstants.LOGIN_REQUEST: 
        return {
            loggingIn: true,
            user: action.user,
        };
        case authConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user,
        };
        case authConstants.LOGIN_FAILURE:
        return {
            loggedIn: false,
            user: action.error,
        };
        case authConstants.LOGOUT: return {};
        default: return state;
    
    }
}

export function logout(state = initialState, action) {
    switch( action.type ) {
        case authConstants.LOGOUT_SUCCESS: 
        return {
            logout:true
        };
        case authConstants.LOGOUT_FAILURE: 
        return {
            logout:false,
            error: action.error,
        };
        default: return state;
    
    }
}
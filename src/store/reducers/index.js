import { combineReducers } from 'redux';
import { authentication, logout } from './authReducer';

const rootReducer = combineReducers({
    auth:authentication,
});

export default rootReducer;
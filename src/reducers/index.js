import { combineReducers } from 'redux';
import { authentication, logout } from './authReducer';

const rootReducer = combineReducers({
    authentication,
    logout
});

export default rootReducer;
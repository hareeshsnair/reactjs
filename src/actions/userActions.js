import { authConstants } from '../constants';
import { authService } from '../services';

export const userActions = {
    login,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        authService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } };
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } };
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } };
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}
import { authHeader, config } from '../helpers';

export const authService = {
    login,
    logout,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ 'email':username, password })
    };

    return fetch(config.apiUrl + 'api/login', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            if(user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/* Uncomment this later
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/user', requestOptions).then(handleResponse, handleError);
} */

function handleResponse(response) {
    return new Promise((resolve, reject) => {        
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}
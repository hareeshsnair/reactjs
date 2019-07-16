import { authHeader, config } from '../helpers';
import axios from 'axios'

export const authService = {
    login,
    logout,
};

function login(username, password) {
    
    const requestOptions = {
        headers: { 'Content-Type' : 'application/json' },
    };
    const params = {
        "username": username, 
        "password": password
    }
    return axios.post(`${config.apiUrl}v1/login`, params, requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            if(user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
        .catch(function (response) {
            return Promise.reject(response);
        });
}

function logout() {
    const requestOptions = {
        /** This appends the authorization header with other headers in the request. */
        headers: { 'Content-Type' : 'application/json', ...authHeader() }
    };
    return axios.get(`${config.apiUrl}v1/logout`, requestOptions)
                .then(handleResponse, handleError)
                .then(user => {
                    // remove user from local storage to log user out
                    localStorage.removeItem('user');
                    return user;
                })
                .catch(function (response) {
                    return Promise.reject(response);
                });
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {  
        /** If HTTP status is ok */      
        if (response.status === 200) {
            /** If the custom status added in the API is success. This will change based on the API response structure. */
            if(response.data.status === 200) {
                /** return json if it was returned in the response */
                var contentType = response.headers["content-type"];
                if (contentType && contentType.includes("application/json")) {
                    /** Returns the data in the API. This depends upon the API return structure. */
                    resolve(response.data)
                } else {
                    resolve();
                }
            }
            else { 
                /** Returns the custom message added in the API. This depends upon the API return structure. */
                reject(response.data.message)
            }
            
        } else {
            /** Return error message from response body. */
            reject(response)
        }
    });
}

function handleError(error) {
    /** Logout the user and remove the token from the local storage if the HTTP status is UNAUTHORIZED. */
    if(error.response && error.response.status === 401) {
        localStorage.removeItem('user');
    }

    /** Return the error message from the HTTP error response. */
    if(error.response) {
        return Promise.reject(error && error.response.statusText);
    }
    return Promise.reject(error && error.message);
}
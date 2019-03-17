export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if( user && user.success.token) {
        return { 'Authorization': 'Bearer '+ user.success.token };
    }
    else {
        return {};
    }
}
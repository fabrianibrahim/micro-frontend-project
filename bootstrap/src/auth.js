import { xhrJson } from './xhr';

const TOKEN_KEY = 'bootstrap_auth_token'

let isUserLoggedIn = false;

function setToken(token) {
    if (!token) {
        window.localStorage.removeItem(TOKEN_KEY)
        return;
    }
    window.localStorage.setItem(TOKEN_KEY, token);
    isUserLoggedIn = true;
}

function getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
}

function validateToken() {
    const token = getToken();
    if (!token) {
        return Promise.resolve(false);
    }

    return xhrJson({
        url: 'https://buildingmfe.maxgallo.io/api/validate',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(() => isUserLoggedIn = true)
        .catch(() => isUserLoggedIn = false)
}

export {
    setToken,
    getToken,
    validateToken,
    isUserLoggedIn,
}

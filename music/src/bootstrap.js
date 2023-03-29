function getAuthToken() {
    if (!window.bootstrap) {
        console.log('Bootstrap is not available in page');
        return;
    }

    return window.bootstrap.auth.getToken();
}

function signOutAndGoToWelcome() {
    if (!window.bootstrap) {
        console.log('Bootstrap is not available in page');
        return;
    }

    window.bootstrap.auth.setToken();
    window.bootstrap.router.navigateTo('/hello');
}

export { getAuthToken, signOutAndGoToWelcome }


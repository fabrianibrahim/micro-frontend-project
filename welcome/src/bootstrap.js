function goToMusicMicroFrontend() {
    if (!window.bootstrap) {
        console.log('Bootstrap is not available');
        return;
    }
    window.bootstrap.router.navigateTo('/play')
}

function getEventNames() {
    if (!window.bootstrap) {
        console.log('Bootstrap is not available');
        return {};
    }
    return window.bootstrap.eventNames;
}

function setAuthToken(token) {
    if (!window.bootstrap) {
        console.log('Bootstrap is not available');
        return {};
    }
    return window.bootstrap.auth.setToken(token);
}

export {
    goToMusicMicroFrontend,
    getEventNames,
    setAuthToken,
}

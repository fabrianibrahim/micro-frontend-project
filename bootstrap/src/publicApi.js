function createPublicApi({ navigateTo, eventNames, setToken, getToken }) {
    window.bootstrap = {
        router: {
            navigateTo
        },
        auth: {
            setToken,
            getToken,
        },
        eventNames
    };
}

export { createPublicApi };

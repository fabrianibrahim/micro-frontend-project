function createPublicApi({ navigateTo, auth, eventNames }) {
    window.bootstrap = {
        router: {
            navigateTo
        },
        auth,
        eventNames
    };
}

export { createPublicApi };

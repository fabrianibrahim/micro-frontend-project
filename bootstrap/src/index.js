import { navigateTo } from "./router";
import { createPublicApi } from "./publicApi";
import { eventNames } from "./events";
import { setToken, getToken, validateToken } from './auth';

createPublicApi({
    navigateTo,
    eventNames,
    setToken,
    getToken,
});

validateToken().then(
    () => navigateTo(window.location.pathname)
);

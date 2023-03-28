import { navigateTo } from "./router";
import { createPublicApi } from "./publicApi";
import { eventNames } from "./events";
import auth from "./auth";

createPublicApi({
    navigateTo,
    auth,
    eventNames
});

validateToken().then(
    () => navigateTo(window.location.pathname)
);

